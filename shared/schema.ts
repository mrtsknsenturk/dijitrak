import { pgTable, text, serial, integer, boolean, timestamp, json, varchar } from "drizzle-orm/pg-core";
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
  coverLetter: text("cover_letter").notNull(),
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
  coverLetter: true,
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

// Portfolio projects
export const portfolioProjects = pgTable("portfolio_projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  category: text("category").notNull(),
  client: text("client").notNull(),
  clientLogo: text("client_logo"),
  tags: json("tags").$type<{name: string, color?: string}[]>().default([]).notNull(),
  services: json("services").$type<string[]>().default([]).notNull(),
  images: json("images").$type<{url: string, alt: string, isMain?: boolean}[]>().default([]).notNull(),
  date: text("date").notNull(),
  duration: text("duration").notNull(),
  technologies: json("technologies").$type<string[]>().default([]).notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  results: json("results").$type<string[]>().default([]).notNull(),
  testimonial: json("testimonial").$type<{text: string, author: string, position: string, company: string, image?: string} | null>(),
  nextProject: text("next_project"),
  prevProject: text("prev_project"),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPortfolioProjectSchema = createInsertSchema(portfolioProjects).pick({
  slug: true,
  title: true,
  description: true,
  longDescription: true,
  category: true,
  client: true,
  clientLogo: true,
  tags: true,
  services: true,
  images: true,
  date: true,
  duration: true,
  technologies: true,
  challenge: true,
  solution: true,
  results: true,
  testimonial: true,
  nextProject: true,
  prevProject: true,
  url: true,
});

// Contact messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").default("unread").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertFreelancerApplication = z.infer<typeof insertFreelancerApplicationSchema>;
export type FreelancerApplication = typeof freelancerApplications.$inferSelect;

export type InsertProjectRequest = z.infer<typeof insertProjectRequestSchema>;
export type ProjectRequest = typeof projectRequests.$inferSelect;

export type InsertPortfolioProject = z.infer<typeof insertPortfolioProjectSchema>;
export type PortfolioProject = typeof portfolioProjects.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
