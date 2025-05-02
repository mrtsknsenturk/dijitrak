import React, { useState, useEffect } from "react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/motion";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { PortfolioProject } from "@shared/schema";

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const { data: portfolioProjects, isLoading, error } = useQuery<PortfolioProject[]>({
    queryKey: ["/api/portfolio-projects"],
    queryFn: async () => {
      const response = await fetch("/api/portfolio-projects");
      if (!response.ok) {
        throw new Error("Failed to fetch portfolio projects");
      }
      return response.json();
    }
  });
  
  const filters = [
    { name: "All", value: "all" },
    { name: "Web App", value: "web-app" },
    { name: "Mobile App", value: "mobile-app" },
    { name: "Healthcare", value: "healthcare" }
  ];
  
  const filteredProjects = portfolioProjects 
    ? (activeFilter === "all" 
        ? portfolioProjects 
        : portfolioProjects.filter(project => project.category === activeFilter))
    : [];

  return (
    <section id="portfolio" className="py-24 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-secondary/5 blur-3xl top-1/4 left-1/3"></div>
        <div className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl bottom-1/4 right-1/3"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-white/70">
            Explore our most recent work and see how we've helped businesses achieve their digital goals.
          </p>
        </FadeIn>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              variant={activeFilter === filter.value ? "default" : "outline"}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeFilter === filter.value 
                  ? "bg-gradient-to-r from-primary to-secondary text-background" 
                  : "border border-white/10 hover:border-primary/50"
              }`}
            >
              {filter.name}
            </Button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-white/70 py-8">
            <p>Failed to load portfolio projects. Please try again later.</p>
          </div>
        ) : (
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </FadeInStagger>
        )}
      </div>
    </section>
  );
}

function PortfolioCard({ project }: { project: PortfolioProject }) {
  // Find main image or use first image
  const mainImage = project.images.find(img => img.isMain)?.url || 
                   (project.images.length > 0 ? project.images[0].url : '');
  
  return (
    <FadeInItem>
      <Link href={`/project/${project.slug}`}>
        <motion.div 
          className="glassmorphism rounded-xl overflow-hidden group cursor-pointer"
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-56 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
            
            {mainImage && (
              <motion.img 
                src={mainImage} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700"
                whileHover={{ scale: 1.1 }}
              />
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm text-white/90 line-clamp-2">{project.description}</p>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: tag.color || '#3B82F6', color: 'white' }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Link>
    </FadeInItem>
  );
}