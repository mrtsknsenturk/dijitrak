import { db } from "./index";
import * as schema from "@shared/schema";
import bcrypt from "bcryptjs";
import { sql } from "drizzle-orm";

async function createAdminUser() {
  const existing = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, "admin"),
  });

  if (existing) {
    console.log("✅ Admin user already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("adminpassword", 10);
  await db.insert(schema.users).values({
    username: "admin",
    password: hashedPassword,
    isAdmin: true,
  });
  console.log("✅ Admin user created");
}

async function checkAndInsert<T>(
    table: any,
    values: T[],
    label: string
) {
  const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(table);

  if (result[0].count === 0) {
    await db.insert(table).values(values);
    console.log(`✅ ${label} seeded`);
  } else {
    console.log(`✅ ${label} already exist`);
  }
}

async function seed() {
  try {
    console.log("🚀 Starting database seed...");

    await createAdminUser();

    await checkAndInsert(schema.freelancerApplications, [
      {
        name: "John Smith",
        email: "john.smith@example.com",
        specialty: "web-dev",
        experience: "5",
        portfolioUrl: "https://johnsmith.dev",
        coverLetter: "I have 5 years of experience in web development and I'm passionate about creating modern, responsive websites. I specialize in React and Node.js.",
        languages: ["en", "es", "fr"],
        status: "pending",
      },
      {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        specialty: "ui-ux",
        experience: "7",
        portfolioUrl: "https://sarahjohnson.design",
        coverLetter: "As a UI/UX designer with 7 years of experience, I've worked with various clients from startups to enterprise companies to create beautiful, user-friendly interfaces.",
        languages: ["en", "de"],
        status: "pending",
      },
      {
        name: "Miguel Rodriguez",
        email: "miguel@example.com",
        specialty: "mobile-dev",
        experience: "4",
        portfolioUrl: "https://miguel-dev.io",
        coverLetter: "I'm a mobile developer with expertise in React Native and Flutter. I've published several apps on both App Store and Google Play.",
        languages: ["en", "es"],
        status: "pending",
      },
    ], "Freelancer applications");

    await checkAndInsert(schema.projectRequests, [
      {
        projectName: "E-commerce Platform",
        projectType: "web-app",
        timeline: "standard",
        budget: "medium",
        description: "We need a comprehensive e-commerce platform with product management, inventory control, and payment processing.",
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
        description: "A mobile app for our restaurant chain that allows customers to order food, make reservations, and join our loyalty program.",
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
        description: "Complete rebranding including new logo, visual identity, website redesign, and marketing materials.",
        clientName: "James Wilson",
        clientEmail: "j.wilson@example.com",
        phone: "+1 555-567-8901",
        status: "new",
      },
    ], "Project requests");

    await checkAndInsert(schema.portfolioProjects, [
      // Burada sadece örnek 1 tanesini bırakıyorum, diğerleri aynı formatta eklenebilir
      {
        slug: "quantum-ecommerce",
        title: "Quantum E-Commerce Platform",
        description: "A next-generation e-commerce platform with AI-powered product recommendations.",
        longDescription: "The Quantum E-Commerce Platform represents a paradigm shift...",
        category: "web-app",
        client: "TechMart Global",
        clientLogo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/company-icon.png",
        tags: [
          { name: "AI/ML", color: "#8B5CF6" },
          { name: "E-commerce", color: "#3B82F6" },
          { name: "Full-stack", color: "#10B981" }
        ],
        services: ["Web Development", "UI/UX Design", "AI Integration", "Payment Processing"],
        images: [
          { url: "https://images.unsplash.com/photo-1561997968-aa846c2bf255?q=80&w=1470&auto=format&fit=crop", alt: "Dashboard overview", isMain: true },
        ],
        date: "2023-06-15",
        duration: "4 months",
        technologies: ["React", "Node.js", "TensorFlow", "PostgreSQL", "AWS"],
        challenge: "TechMart Global needed to transform their outdated e-commerce platform...",
        solution: "We developed a complete e-commerce solution...",
        results: [
          "43% increase in conversion rates",
          "28% increase in average order value",
        ],
        testimonial: {
          text: "The Quantum Edge team delivered beyond our expectations.",
          author: "Emily Chen",
          position: "CTO",
          company: "TechMart Global",
          image: "https://randomuser.me/api/portraits/women/45.jpg"
        },
        nextProject: "neurolink-dashboard",
        prevProject: "fusion-finance-app"
      }
    ], "Portfolio projects");

    console.log("🎉 Database seed completed successfully");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

seed();
