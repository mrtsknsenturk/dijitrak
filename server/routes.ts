import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import pgSession from "connect-pg-simple";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { pool } from "@db";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

// Configure session storage
const PostgresStore = pgSession(session);

// Middleware to ensure user is authenticated
const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

// Middleware to ensure user is an admin
const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user && (req.user as any).isAdmin) {
    return next();
  }
  res.status(403).json({ message: "Forbidden" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up sessions
  app.use(
    session({
      store: new PostgresStore({
        pool,
        tableName: "session",
        createTableIfMissing: true // Otomatik olarak tablo oluşturacak
      }),
      secret: process.env.SESSION_SECRET || "quantum-edge-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === "production",
      },
    })
  );

  // Initialize Passport and restore authentication state from session
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure Passport
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        const isValid = await storage.verifyPassword(password, user.password);
        if (!isValid) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Authentication API Routes
  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message || "Authentication failed" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // Return user data without sensitive information
        const safeUser = {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin
        };
        return res.json(safeUser);
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/check", ensureAuthenticated, (req, res) => {
    res.json({ isAuthenticated: true, user: req.user });
  });

  // Freelancer Application API Routes
  app.post("/api/freelancer-applications", async (req, res, next) => {
    try {
      const application = await storage.createFreelancerApplication(req.body);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: formattedError.details 
        });
      }
      next(error);
    }
  });

  app.get("/api/freelancer-applications", ensureAdmin, async (req, res, next) => {
    try {
      const applications = await storage.getAllFreelancerApplications();
      res.json(applications);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/freelancer-applications/:id", ensureAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const application = await storage.getFreelancerApplicationById(id);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      res.json(application);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/freelancer-applications/:id/status", ensureAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Status is required" });
      }

      const application = await storage.updateFreelancerApplicationStatus(id, status);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      res.json(application);
    } catch (error) {
      next(error);
    }
  });

  // Project Request API Routes
  app.post("/api/project-requests", async (req, res, next) => {
    try {
      const request = await storage.createProjectRequest(req.body);
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: formattedError.details 
        });
      }
      next(error);
    }
  });

  app.get("/api/project-requests", ensureAdmin, async (req, res, next) => {
    try {
      const requests = await storage.getAllProjectRequests();
      res.json(requests);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/project-requests/:id", ensureAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const request = await storage.getProjectRequestById(id);
      if (!request) {
        return res.status(404).json({ message: "Project request not found" });
      }

      res.json(request);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/project-requests/:id/status", ensureAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Status is required" });
      }

      const request = await storage.updateProjectRequestStatus(id, status);
      if (!request) {
        return res.status(404).json({ message: "Project request not found" });
      }

      res.json(request);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
