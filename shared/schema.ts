import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table for admin authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Freelancer applications
export const freelancerApplications = pgTable("freelancer_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  specialty: text("specialty").notNull(),
  experience: text("experience").notNull(),
  portfolioUrl: text("portfolio_url"),
  languages: json("languages").default(['en']).notNull(),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFreelancerApplicationSchema = createInsertSchema(freelancerApplications).pick({
  name: true,
  email: true,
  specialty: true,
  experience: true,
  portfolioUrl: true,
  languages: true,
});

// Project requests
export const projectRequests = pgTable("project_requests", {
  id: serial("id").primaryKey(),
  projectName: text("project_name").notNull(),
  projectType: text("project_type").notNull(),
  timeline: text("timeline").notNull(),
  budget: text("budget").notNull(),
  description: text("description").notNull(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  phone: text("phone"),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProjectRequestSchema = createInsertSchema(projectRequests).pick({
  projectName: true,
  projectType: true,
  timeline: true,
  budget: true,
  description: true,
  clientName: true,
  clientEmail: true,
  phone: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertFreelancerApplication = z.infer<typeof insertFreelancerApplicationSchema>;
export type FreelancerApplication = typeof freelancerApplications.$inferSelect;

export type InsertProjectRequest = z.infer<typeof insertProjectRequestSchema>;
export type ProjectRequest = typeof projectRequests.$inferSelect;
