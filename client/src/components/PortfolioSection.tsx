import React, { useState } from "react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/motion";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  description: string;
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const portfolioItems: PortfolioItem[] = [
    {
      title: "E-commerce Redesign",
      category: "web-design",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
      description: "Comprehensive redesign of an e-commerce platform with improved UX and conversion optimization."
    },
    {
      title: "Banking Mobile App",
      category: "mobile-app",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFua2luZyUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D",
      description: "User-friendly mobile banking application with secure authentication and real-time transactions."
    },
    {
      title: "Tech Conference Branding",
      category: "branding",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMGNvbmZlcmVuY2V8ZW58MHx8MHx8fDA%3D",
      description: "Complete branding package for a major tech conference including logo, marketing materials, and digital assets."
    },
    {
      title: "Healthcare Dashboard",
      category: "web-design",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoY2FyZSUyMGRhc2hib2FyZHxlbnwwfHwwfHx8MA%3D",
      description: "Interactive healthcare analytics dashboard for medical professionals with data visualization."
    },
    {
      title: "Restaurant Ordering System",
      category: "mobile-app",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudCUyMGFwcHxlbnwwfHwwfHx8MA%3D",
      description: "Mobile application for restaurant ordering with real-time kitchen updates and payment processing."
    },
    {
      title: "Fashion Brand Identity",
      category: "branding",
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMGJyYW5kaW5nfGVufDB8fDB8fHww",
      description: "Complete brand identity design for an emerging fashion label with lookbook and marketing strategy."
    },
  ];
  
  const filters = [
    { name: "All", value: "all" },
    { name: "Web Design", value: "web-design" },
    { name: "Mobile Apps", value: "mobile-app" },
    { name: "Branding", value: "branding" },
  ];
  
  const filteredItems = activeFilter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

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
        
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <PortfolioCard key={index} item={item} />
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <FadeInItem>
      <motion.div 
        className="glassmorphism rounded-xl overflow-hidden group cursor-pointer"
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-56 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
          
          <motion.img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700"
            whileHover={{ scale: 1.1 }}
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-sm text-white/90 line-clamp-2">{item.description}</p>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <span className="text-sm text-white/50 uppercase tracking-wider">
            {item.category === "web-design" && "Web Design"}
            {item.category === "mobile-app" && "Mobile App"}
            {item.category === "branding" && "Branding"}
          </span>
        </div>
      </motion.div>
    </FadeInItem>
  );
}