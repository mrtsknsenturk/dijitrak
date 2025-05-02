import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import { useLanguage } from "@/lib/LanguageContext";

interface ProcessStep {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ProcessTimeline() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const steps: ProcessStep[] = [
    {
      id: "discovery",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: t("process_discovery_title"),
      description: t("process_discovery_desc"),
    },
    {
      id: "planning",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: t("process_planning_title"),
      description: t("process_planning_desc"),
    },
    {
      id: "design",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: t("process_design_title"),
      description: t("process_design_desc"),
    },
    {
      id: "development",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: t("process_development_title"),
      description: t("process_development_desc"),
    },
    {
      id: "testing",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: t("process_testing_title"),
      description: t("process_testing_desc"),
    },
    {
      id: "launch",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: t("process_launch_title"),
      description: t("process_launch_desc"),
    },
    {
      id: "support",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: t("process_support_title"),
      description: t("process_support_desc"),
    },
  ];

  const toggleStep = (id: string) => {
    if (activeStep === id) {
      setActiveStep(null);
    } else {
      setActiveStep(id);
    }
  };

  return (
    <section className="py-24 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl -top-48 -left-48 opacity-50"></div>
        <div className="absolute w-96 h-96 rounded-full bg-secondary/5 blur-3xl -bottom-48 -right-48 opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("process_title")} <span className="gradient-text">{t("process_title_highlight")}</span>
          </h2>
          <p className="text-white/70">
            {t("process_subtitle")}
          </p>
        </FadeIn>
        
        <div className="max-w-4xl mx-auto">
          <FadeInStagger className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/40 z-0"></div>
            
            {steps.map((step, index) => (
              <FadeIn key={step.id} className="mb-8 last:mb-0">
                <div className="relative z-10 flex items-start">
                  {/* Step circle */}
                  <motion.div 
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 
                    ${activeStep === step.id ? 'border-primary bg-primary/20' : 'border-white/20 bg-muted'}`}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-primary">
                      {step.icon}
                    </div>
                  </motion.div>
                  
                  {/* Step content */}
                  <div className="ml-6 flex-1">
                    <motion.button
                      className={`w-full text-left flex items-center justify-between p-4 rounded-lg glassmorphism border
                      ${activeStep === step.id ? 'border-primary/30' : 'border-white/10'}`}
                      onClick={() => toggleStep(step.id)}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center">
                        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-primary/20 text-primary mr-3">
                          {index + 1}
                        </span>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <ChevronRight 
                        className={`h-5 w-5 text-white/50 transition-transform duration-300 ${activeStep === step.id ? 'rotate-90' : ''}`} 
                      />
                    </motion.button>
                    
                    {/* Expanded content */}
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: activeStep === step.id ? 'auto' : 0,
                        opacity: activeStep === step.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 glassmorphism border border-white/10 mt-3 rounded-lg">
                        <p className="text-white/70">{step.description}</p>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              <p className="text-sm text-white/70">
                                {t(`process_${step.id}_point${item}`)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}