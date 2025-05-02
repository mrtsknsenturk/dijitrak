import React, { useState } from "react";
import { FadeIn, FloatingAnimation } from "@/components/ui/motion";
import FreelancerModal from "./FreelancerModal";
import ProjectModal from "./ProjectModal";
import { motion } from "framer-motion";

export default function CTASection() {
  const [showFreelancerModal, setShowFreelancerModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  return (
    <section id="work" className="py-24 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-primary/10"
        animate={{ 
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Ready to <span className="gradient-text">transform</span> your digital presence?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg">
              Take the first step towards digital excellence. Choose how you'd like to collaborate with us.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Freelancer Application */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="glassmorphism rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                onClick={() => setShowFreelancerModal(true)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Join Our Team</h3>
                </div>
                <p className="text-white/70 mb-4">Collaborate with us as a freelancer and work on exciting projects.</p>
                <div className="flex items-center space-x-2 text-sm text-white/50">
                  <span>🇺🇸</span>
                  <span>🇪🇸</span>
                  <span>🇫🇷</span>
                  <span>🇩🇪</span>
                  <span>🇮🇹</span>
                  <span className="text-xs">+10 more</span>
                </div>
              </motion.div>
              
              {/* Project Request */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="glassmorphism rounded-xl p-6 border border-white/10 hover:border-secondary/50 transition-all duration-300 cursor-pointer"
                onClick={() => setShowProjectModal(true)}
                onMouseEnter={() => setProgressWidth(75)}
                onMouseLeave={() => setProgressWidth(0)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4 group-hover:bg-secondary/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Start Your Project</h3>
                </div>
                <p className="text-white/70 mb-4">Tell us about your project and get a custom solution.</p>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-secondary to-primary h-full"
                    animate={{ width: `${progressWidth}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </FadeIn>
          
          <div className="relative lg:flex hidden justify-center">
            <FloatingAnimation>
              <div className="w-96 h-96 glassmorphism rounded-2xl p-8 relative">
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute w-40 h-40 rounded-full bg-secondary/20 blur-xl -top-10 -left-10"></div>
                  <div className="absolute w-40 h-40 rounded-full bg-primary/20 blur-xl -bottom-10 -right-10"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <div className="mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center">Accelerate Your Growth</h3>
                  <p className="text-white/70 text-center">Partner with us and take your business to new heights.</p>
                  
                  <div className="mt-8 flex space-x-3">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div className="w-3 h-3 rounded-full bg-white/30"></div>
                    <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  </div>
                </div>
              </div>
            </FloatingAnimation>
          </div>
        </div>
      </div>

      <FreelancerModal 
        isOpen={showFreelancerModal} 
        onClose={() => setShowFreelancerModal(false)} 
      />
      
      <ProjectModal 
        isOpen={showProjectModal} 
        onClose={() => setShowProjectModal(false)} 
      />
    </section>
  );
}
