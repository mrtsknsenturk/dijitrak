"use client";

import React from "react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/motion";
import {
  Monitor, Smartphone, Palette, Code, TrendingUp,
  ShoppingCart, Cloud, Brain, Lock, Megaphone
} from "lucide-react";
import {useLanguage} from "@/lib/LanguageContext.tsx";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
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
  const { t } = useLanguage(); // çeviri hook'u

  const services = [
    {
      icon: <Monitor className="h-8 w-8 text-primary" />,
      title: t("service-1-title"),
      description: t("service-1-desc"),
    },
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: t("service-2-title"),
      description: t("service-2-desc"),
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: t("service-3-title"),
      description: t("service-3-desc"),
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: t("service-4-title"),
      description: t("service-4-desc"),
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      title: t("service-5-title"),
      description: t("service-5-desc"),
    },
    {
      icon: <Cloud className="h-8 w-8 text-primary" />,
      title: t("service-6-title"),
      description: t("service-6-desc"),
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: t("service-7-title"),
      description: t("service-7-desc"),
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: t("service-8-title"),
      description: t("service-8-desc"),
    },
    {
      icon: <Megaphone className="h-8 w-8 text-primary" />,
      title: t("service-9-title"),
      description: t("service-9-desc"),
    },
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
            <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                dangerouslySetInnerHTML={{ __html: t("services-section-title") }}
            />
            <p className="text-white/70">
              {t("services-section-subtitle")}
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
