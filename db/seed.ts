import { db } from "./index";
import * as schema from "@shared/schema";
import bcrypt from "bcryptjs";

async function seed() {
  try {
    console.log("Starting database seed...");

    // Check if admin user exists
    const existingAdmin = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, "admin"),
    });

    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await bcrypt.hash("adminpassword", 10);
      await db.insert(schema.users).values({
        username: "admin",
        password: hashedPassword,
        isAdmin: true,
      });
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }

    // Seed some sample freelancer applications
    const existingApplicationsCount = await db
      .select({ count: db.fn.count(schema.freelancerApplications.id).as("value") })
      .from(schema.freelancerApplications);

    if (Number(existingApplicationsCount[0].count.value) === 0) {
      await db.insert(schema.freelancerApplications).values([
        {
          name: "John Smith",
          email: "john.smith@example.com",
          specialty: "web-dev",
          experience: "5",
          portfolioUrl: "https://johnsmith.dev",
          languages: ["en", "es", "fr"],
          status: "pending",
        },
        {
          name: "Sarah Johnson",
          email: "sarah.j@example.com",
          specialty: "ui-ux",
          experience: "7",
          portfolioUrl: "https://sarahjohnson.design",
          languages: ["en", "de"],
          status: "pending",
        },
        {
          name: "Miguel Rodriguez",
          email: "miguel@example.com",
          specialty: "mobile-dev",
          experience: "4",
          portfolioUrl: "https://miguel-dev.io",
          languages: ["en", "es"],
          status: "pending",
        },
      ]);
      console.log("Sample freelancer applications created");
    } else {
      console.log("Freelancer applications already exist");
    }

    // Seed some sample project requests
    const existingRequestsCount = await db
      .select({ count: db.fn.count(schema.projectRequests.id).as("value") })
      .from(schema.projectRequests);

    if (Number(existingRequestsCount[0].count.value) === 0) {
      await db.insert(schema.projectRequests).values([
        {
          projectName: "E-commerce Platform",
          projectType: "web-app",
          timeline: "standard",
          budget: "medium",
          description:
            "We need a comprehensive e-commerce platform with product management, inventory control, and payment processing.",
          clientName: "Alex Chen",
          clientEmail: "alex.chen@example.com",
          phone: "+1 555-123-4567",
          status: "new",
        },
        {
          projectName: "Restaurant Mobile App",
          projectType: "mobile-app",
          timeline: "urgent",
          budget: "small",
          description:
            "A mobile app for our restaurant chain that allows customers to order food, make reservations, and join our loyalty program.",
          clientName: "Maria Garcia",
          clientEmail: "maria.g@example.com",
          phone: "+1 555-987-6543",
          status: "new",
        },
        {
          projectName: "Corporate Rebranding",
          projectType: "branding",
          timeline: "flexible",
          budget: "large",
          description:
            "Complete rebranding including new logo, visual identity, website redesign, and marketing materials.",
          clientName: "James Wilson",
          clientEmail: "j.wilson@example.com",
          phone: "+1 555-567-8901",
          status: "new",
        },
      ]);
      console.log("Sample project requests created");
    } else {
      console.log("Project requests already exist");
    }

    console.log("Database seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
