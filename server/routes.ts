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
  
  // Portfolio Projects API Routes
  app.get("/api/portfolio-projects", async (req, res, next) => {
    try {
      const projects = await storage.getAllPortfolioProjects();
      res.json(projects);
    } catch (error) {
      next(error);
    }
  });
  
  app.get("/api/portfolio-projects/:slug", async (req, res, next) => {
    try {
      const { slug } = req.params;
      const project = await storage.getPortfolioProjectBySlug(slug);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      next(error);
    }
  });
  
  // Contact form submission
  app.post("/api/contact", async (req, res, next) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          message: "All fields are required" 
        });
      }
      
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: "Invalid email address" 
        });
      }
      
      // Store the contact message in the database
      const contactMessage = await storage.createContactMessage({
        name,
        email,
        subject,
        message
      });
      
      res.status(201).json({
        success: true,
        message: "Contact form submitted successfully",
        data: contactMessage
      });
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
  
  // Admin contact messages API
  app.get("/api/contact-messages", ensureAuthenticated, ensureAdmin, async (req, res, next) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      next(error);
    }
  });
  
  app.get("/api/contact-messages/:id", ensureAuthenticated, ensureAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const message = await storage.getContactMessageById(id);
      if (!message) {
        return res.status(404).json({ message: "Contact message not found" });
      }
      
      res.json(message);
    } catch (error) {
      next(error);
    }
  });
  
  app.patch("/api/contact-messages/:id/status", ensureAuthenticated, ensureAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const message = await storage.updateContactMessageStatus(id, status);
      if (!message) {
        return res.status(404).json({ message: "Contact message not found" });
      }
      
      res.json(message);
    } catch (error) {
      next(error);
    }
  });
  
  // Freelancer application submission
  app.post("/api/freelancer-applications", async (req, res, next) => {
    try {
      const { name, email, specialty, experience, portfolioUrl, coverLetter, languages } = req.body;
      
      // Validate required fields
      if (!name || !email || !specialty || !experience || !coverLetter) {
        return res.status(400).json({ 
          message: "Missing required fields" 
        });
      }
      
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: "Invalid email address" 
        });
      }
      
      // Validate numeric fields
      if (isNaN(Number(experience)) || Number(experience) < 0) {
        return res.status(400).json({ 
          message: "Experience must be a positive number" 
        });
      }
      
      // Validate portfolio URL if provided
      if (portfolioUrl && !portfolioUrl.match(/^https?:\/\/.+/)) {
        return res.status(400).json({ 
          message: "Portfolio URL must be a valid URL starting with http:// or https://" 
        });
      }
      
      // Save the application to the database
      const application = await storage.createFreelancerApplication({
        name,
        email,
        specialty,
        experience,
        portfolioUrl,
        coverLetter,
        languages: Array.isArray(languages) ? languages : ['en']
      });
      
      res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        data: application
      });
    } catch (error) {
      next(error);
    }
  });
  
  // Project request submission
  app.post("/api/project-requests", async (req, res, next) => {
    try {
      const { 
        projectName, 
        projectType, 
        timeline, 
        budget, 
        description, 
        clientName, 
        clientEmail, 
        phone 
      } = req.body;
      
      // Validate required fields
      if (!projectName || !projectType || !timeline || !budget || !description || !clientName || !clientEmail) {
        return res.status(400).json({ 
          message: "Missing required fields" 
        });
      }
      
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(clientEmail)) {
        return res.status(400).json({ 
          message: "Invalid email address" 
        });
      }
      
      // Save the project request to the database
      const projectRequest = await storage.createProjectRequest({
        projectName,
        projectType,
        timeline,
        budget,
        description,
        clientName,
        clientEmail,
        phone
      });
      
      res.status(201).json({
        success: true,
        message: "Project request submitted successfully",
        data: projectRequest
      });
    } catch (error) {
      next(error);
    }
  });

  // Price Calculator Request API Routes
  app.post("/api/price-calculator-requests", async (req, res, next) => {
    try {
      const request = await storage.createPriceCalculatorRequest(req.body);
      res.status(201).json({
        success: true,
        message: "Price calculator request submitted successfully",
        data: request
      });
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

  app.get("/api/price-calculator-requests", ensureAuthenticated, ensureAdmin, async (req, res, next) => {
    try {
      const requests = await storage.getAllPriceCalculatorRequests();
      res.json(requests);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/price-calculator-requests/:id", ensureAuthenticated, ensureAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const request = await storage.getPriceCalculatorRequestById(id);
      if (!request) {
        return res.status(404).json({ message: "Price calculator request not found" });
      }
      
      res.json(request);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/price-calculator-requests/:id/status", ensureAuthenticated, ensureAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const request = await storage.updatePriceCalculatorRequestStatus(id, status);
      if (!request) {
        return res.status(404).json({ message: "Price calculator request not found" });
      }
      
      res.json(request);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
