import { db } from "@db";
import {
  users,
  freelancerApplications,
  projectRequests,
  portfolioProjects,
  contactMessages,
  priceCalculatorRequests,
  insertUserSchema,
  insertFreelancerApplicationSchema,
  insertProjectRequestSchema,
  insertPortfolioProjectSchema,
  insertContactMessageSchema,
  insertPriceCalculatorRequestSchema,
  User,
  FreelancerApplication,
  ProjectRequest,
  PortfolioProject,
  ContactMessage,
  PriceCalculatorRequest,
  InsertFreelancerApplication,
  InsertProjectRequest,
  InsertPortfolioProject,
  InsertContactMessage,
  InsertPriceCalculatorRequest
} from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const storage = {
  // User related operations
  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  },
  
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  },
  
  async createUser(data: { username: string, password: string, isAdmin?: boolean }): Promise<User> {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const [user] = await db.insert(users).values({
      username: data.username,
      password: hashedPassword,
      isAdmin: data.isAdmin || false
    }).returning();
    
    return user;
  },
  
  async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  },
  
  // Freelancer application operations
  async createFreelancerApplication(data: InsertFreelancerApplication): Promise<FreelancerApplication> {
    const validated = insertFreelancerApplicationSchema.parse(data);
    const [application] = await db.insert(freelancerApplications).values(validated).returning();
    return application;
  },
  
  async getAllFreelancerApplications(): Promise<FreelancerApplication[]> {
    return db.select().from(freelancerApplications).orderBy(freelancerApplications.createdAt);
  },
  
  async getFreelancerApplicationById(id: number): Promise<FreelancerApplication | undefined> {
    const result = await db.select().from(freelancerApplications).where(eq(freelancerApplications.id, id));
    return result[0];
  },
  
  async updateFreelancerApplicationStatus(id: number, status: string): Promise<FreelancerApplication | undefined> {
    const [updated] = await db.update(freelancerApplications)
      .set({ status })
      .where(eq(freelancerApplications.id, id))
      .returning();
    return updated;
  },
  
  // Project request operations
  async createProjectRequest(data: InsertProjectRequest): Promise<ProjectRequest> {
    const validated = insertProjectRequestSchema.parse(data);
    const [request] = await db.insert(projectRequests).values(validated).returning();
    return request;
  },
  
  async getAllProjectRequests(): Promise<ProjectRequest[]> {
    return db.select().from(projectRequests).orderBy(projectRequests.createdAt);
  },
  
  async getProjectRequestById(id: number): Promise<ProjectRequest | undefined> {
    const result = await db.select().from(projectRequests).where(eq(projectRequests.id, id));
    return result[0];
  },
  
  async updateProjectRequestStatus(id: number, status: string): Promise<ProjectRequest | undefined> {
    const [updated] = await db.update(projectRequests)
      .set({ status })
      .where(eq(projectRequests.id, id))
      .returning();
    return updated;
  },
  
  // Portfolio project operations
  async getAllPortfolioProjects(): Promise<PortfolioProject[]> {
    return db.select().from(portfolioProjects).orderBy(portfolioProjects.createdAt);
  },
  
  async getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | undefined> {
    const result = await db.select().from(portfolioProjects).where(eq(portfolioProjects.slug, slug));
    return result[0];
  },
  
  async getPortfolioProjectById(id: number): Promise<PortfolioProject | undefined> {
    const result = await db.select().from(portfolioProjects).where(eq(portfolioProjects.id, id));
    return result[0];
  },
  
  async createPortfolioProject(data: InsertPortfolioProject): Promise<PortfolioProject> {
    const validated = insertPortfolioProjectSchema.parse(data);
    const [project] = await db.insert(portfolioProjects).values(validated).returning();
    return project;
  },
  
  // Contact message operations
  async createContactMessage(data: InsertContactMessage): Promise<ContactMessage> {
    const validated = insertContactMessageSchema.parse(data);
    const [message] = await db.insert(contactMessages).values(validated).returning();
    return message;
  },
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(contactMessages.createdAt);
  },
  
  async getContactMessageById(id: number): Promise<ContactMessage | undefined> {
    const result = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return result[0];
  },
  
  async updateContactMessageStatus(id: number, status: string): Promise<ContactMessage | undefined> {
    const [updated] = await db.update(contactMessages)
      .set({ status })
      .where(eq(contactMessages.id, id))
      .returning();
    return updated;
  },
  
  // Price Calculator Request operations
  async createPriceCalculatorRequest(data: InsertPriceCalculatorRequest): Promise<PriceCalculatorRequest> {
    const validated = insertPriceCalculatorRequestSchema.parse(data);
    const [request] = await db.insert(priceCalculatorRequests).values(validated).returning();
    return request;
  },
  
  async getAllPriceCalculatorRequests(): Promise<PriceCalculatorRequest[]> {
    return db.select().from(priceCalculatorRequests).orderBy(priceCalculatorRequests.createdAt);
  },
  
  async getPriceCalculatorRequestById(id: number): Promise<PriceCalculatorRequest | undefined> {
    const result = await db.select().from(priceCalculatorRequests).where(eq(priceCalculatorRequests.id, id));
    return result[0];
  },
  
  async updatePriceCalculatorRequestStatus(id: number, status: string): Promise<PriceCalculatorRequest | undefined> {
    const [updated] = await db.update(priceCalculatorRequests)
      .set({ status })
      .where(eq(priceCalculatorRequests.id, id))
      .returning();
    return updated;
  }
};
