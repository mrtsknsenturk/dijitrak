import { db } from "./index";
import * as schema from "@shared/schema";
import bcrypt from "bcryptjs";
import { eq, sql } from "drizzle-orm";
import { PortfolioProject } from "@shared/schema";

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
      .select({ count: sql<number>`count(*)` })
      .from(schema.freelancerApplications);

    if (existingApplicationsCount[0].count === 0) {
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
      .select({ count: sql<number>`count(*)` })
      .from(schema.projectRequests);

    if (existingRequestsCount[0].count === 0) {
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

    // Seed portfolio projects if none exist
    const existingPortfolioProjectsCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.portfolioProjects);

    if (existingPortfolioProjectsCount[0].count === 0) {
      await db.insert(schema.portfolioProjects).values([
        {
          slug: "quantum-ecommerce",
          title: "Quantum E-Commerce Platform",
          description: "A next-generation e-commerce platform with AI-powered product recommendations.",
          longDescription: "The Quantum E-Commerce Platform represents a paradigm shift in online retail experiences. Using cutting-edge AI algorithms, the platform analyzes user behavior to offer highly relevant product suggestions, increasing conversion rates by 43% and average order value by 28%.",
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
            { url: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1466&auto=format&fit=crop", alt: "Product recommendations" },
            { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop", alt: "Mobile checkout flow" }
          ],
          date: "2023-06-15",
          duration: "4 months",
          technologies: ["React", "Node.js", "TensorFlow", "PostgreSQL", "AWS"],
          challenge: "TechMart Global needed to transform their outdated e-commerce platform into a modern, AI-driven shopping experience to compete with industry giants. Their existing system suffered from poor performance, limited personalization, and a high cart abandonment rate of 76%.",
          solution: "We developed a complete e-commerce solution with real-time inventory management, personalized recommendations using machine learning, and a seamless checkout process. The platform includes a robust admin dashboard for analytics and a customer-facing mobile app optimized for conversion.",
          results: [
            "43% increase in conversion rates",
            "28% increase in average order value",
            "68% reduction in cart abandonment",
            "120% increase in mobile sales"
          ],
          testimonial: {
            text: "The Quantum Edge team delivered beyond our expectations. The new platform has revolutionized how we engage with customers and manage our business.",
            author: "Emily Chen",
            position: "CTO",
            company: "TechMart Global",
            image: "https://randomuser.me/api/portraits/women/45.jpg"
          },
          nextProject: "neurolink-dashboard",
          prevProject: "fusion-finance-app"
        },
        {
          slug: "neurolink-dashboard",
          title: "NeuroLink Health Dashboard",
          description: "An intuitive health analytics platform for medical professionals and patients.",
          longDescription: "NeuroLink transforms complex medical data into actionable insights through an intuitive dashboard interface. This platform bridges the communication gap between healthcare providers and patients, enabling better informed decisions and improved health outcomes.",
          category: "healthcare",
          client: "MediCore Health Systems",
          clientLogo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/company-icon.png",
          tags: [
            { name: "Healthcare", color: "#EC4899" },
            { name: "Data Visualization", color: "#F59E0B" },
            { name: "Web App", color: "#3B82F6" }
          ],
          services: ["Front-end Development", "Data Visualization", "UX Research", "HIPAA Compliance"],
          images: [
            { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop", alt: "Health dashboard overview", isMain: true },
            { url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470&auto=format&fit=crop", alt: "Patient analytics" },
            { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop", alt: "Mobile interface" }
          ],
          date: "2023-02-10",
          duration: "6 months",
          technologies: ["Vue.js", "D3.js", "Express", "MongoDB", "Azure"],
          challenge: "MediCore Health Systems needed a secure, HIPAA-compliant platform that could present complex medical data in an accessible way for both healthcare providers and patients. Their existing solution was fragmented across multiple systems, leading to inefficiencies and communication gaps.",
          solution: "We created a unified dashboard with role-based access controls, interactive data visualizations, and real-time alerts. The platform integrates with existing electronic health record systems while maintaining strict security protocols and offering patient-friendly explanations of medical terminology.",
          results: [
            "87% of medical staff reported improved workflow efficiency",
            "92% of patients felt more informed about their treatment plans",
            "Reduced paperwork processing time by 65%",
            "Decreased missed appointments by 34%"
          ],
          testimonial: {
            text: "NeuroLink has transformed how we communicate with patients and analyze health data. It's intuitive enough for patients while providing the depth our specialists need.",
            author: "Dr. James Williams",
            position: "Medical Director",
            company: "MediCore Health Systems",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
          },
          nextProject: "fusion-finance-app",
          prevProject: "quantum-ecommerce"
        },
        {
          slug: "fusion-finance-app",
          title: "Fusion Finance App",
          description: "A revolutionary mobile banking experience with cryptocurrency integration.",
          longDescription: "Fusion Finance redefines personal banking by seamlessly blending traditional financial services with cryptocurrency management. This mobile-first application provides users with a comprehensive view of their finances across conventional and digital assets.",
          category: "mobile-app",
          client: "NextGen Financial",
          clientLogo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/company-icon.png",
          tags: [
            { name: "Finance", color: "#10B981" },
            { name: "Blockchain", color: "#6366F1" },
            { name: "Mobile", color: "#F43F5E" }
          ],
          services: ["Mobile App Development", "UI/UX Design", "Blockchain Integration", "Security Audit"],
          images: [
            { url: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1470&auto=format&fit=crop", alt: "Finance app dashboard", isMain: true },
            { url: "https://images.unsplash.com/photo-1593510987185-1ec2256148f3?q=80&w=1472&auto=format&fit=crop", alt: "Cryptocurrency portfolio" },
            { url: "https://images.unsplash.com/photo-1613243555988-441165d963b6?q=80&w=1470&auto=format&fit=crop", alt: "Transaction history" }
          ],
          date: "2022-11-05",
          duration: "5 months",
          technologies: ["React Native", "Solidity", "Node.js", "Firebase", "Plaid API"],
          challenge: "NextGen Financial wanted to create a banking app that would appeal to both traditional customers and cryptocurrency enthusiasts. They needed a secure solution that could manage complex blockchain transactions while maintaining an intuitive user experience.",
          solution: "We developed a cross-platform mobile application with real-time exchange rates, secure wallet functionality, and traditional banking features. The app includes biometric authentication, transaction categorization, and predictive budgeting tools powered by machine learning algorithms.",
          results: [
            "200,000+ downloads in the first month",
            "Average user rating of 4.8/5 stars",
            "68% of users actively using both traditional and crypto features",
            "Featured in 'Best Finance Apps of 2023' by TechFuture Magazine"
          ],
          testimonial: {
            text: "Quantum Edge delivered exactly what we needed - a sophisticated financial tool that feels simple to use. Our customer acquisition has exceeded all projections.",
            author: "Sarah Rodriguez",
            position: "VP of Digital Innovation",
            company: "NextGen Financial",
            image: "https://randomuser.me/api/portraits/women/68.jpg"
          },
          nextProject: "quantum-ecommerce",
          prevProject: "neurolink-dashboard"
        }
      ]);
      console.log("Sample portfolio projects created");
    } else {
      console.log("Portfolio projects already exist");
    }

    console.log("Database seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
