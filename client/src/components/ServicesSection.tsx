import React from "react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/motion";
import { 
  Monitor, Smartphone, Palette, Code, TrendingUp, 
  ShoppingCart, Cloud, Brain, Lock, Megaphone 
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <FadeInItem>
      <div className="service-card glassmorphism rounded-xl p-6 h-full">
        <div className="service-icon w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </FadeInItem>
  );
};

export default function ServicesSection() {
  const services = [
    {
      icon: <Monitor className="h-8 w-8 text-primary" />,
      title: "Web & Mobile App Development",
      description: "Custom web and mobile applications tailored to your business needs."
    },
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: "UI/UX Design",
      description: "Intuitive, user-friendly interfaces that enhance user experience."
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Custom Software Solutions",
      description: "Bespoke software solutions designed to address specific business challenges."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "SEO & Digital Marketing",
      description: "Data-driven strategies to boost your online presence and drive conversions."
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      title: "E-commerce Solutions",
      description: "Scalable, secure online stores that deliver exceptional shopping experiences."
    },
    {
      icon: <Cloud className="h-8 w-8 text-primary" />,
      title: "Cloud Infrastructure & DevOps",
      description: "Streamlined deployment and management of your cloud infrastructure."
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI Integration & Automation",
      description: "Intelligent solutions that leverage AI to optimize your business processes."
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Cybersecurity Consulting",
      description: "Protect your business with our comprehensive security solutions."
    },
    {
      icon: <Megaphone className="h-8 w-8 text-primary" />,
      title: "Branding & Creative Strategy",
      description: "Develop a distinctive brand identity that resonates with your audience."
    }
  ];

  return (
    <section id="services" className="py-24 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-64 -top-32 left-0 bg-gradient-to-b from-muted/20 to-transparent"></div>
        <div className="absolute w-64 h-64 rounded-full bg-secondary/5 blur-3xl top-1/3 right-1/4"></div>
        <div className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl bottom-1/3 left-1/4"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-white/70">
            We offer a comprehensive range of digital services to help businesses achieve their goals and stay ahead of the competition.
          </p>
        </FadeIn>
        
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
