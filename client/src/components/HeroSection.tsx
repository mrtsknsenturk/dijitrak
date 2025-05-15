import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, FloatingAnimation } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { applyParallaxEffect } from "@/lib/utils";
import {useLanguage} from "@/lib/LanguageContext.tsx";

export default function HeroSection() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (glowRef.current) {
      const rect = glowRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(15, 241, 200, 0.15) 0%, rgba(138, 63, 252, 0.07) 30%, rgba(15, 17, 24, 0) 70%)`;
    }
  };

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="hero-gradient min-h-screen flex items-center pt-24 pb-20 relative"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      <div 
        ref={glowRef}
        className="absolute inset-0 overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(15, 241, 200, 0.15) 0%, rgba(138, 63, 252, 0.07) 30%, rgba(15, 17, 24, 0) 70%)'
        }}
      >
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-secondary/10 blur-3xl"
          style={{ top: '25%', left: '25%' }}
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          style={{ bottom: '25%', right: '25%' }}
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="inline-block py-1 px-3 rounded-full bg-muted text-xs font-mono text-primary mb-6">
              {t("landing-page-title-badge")}
            </div>
            <h1
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                dangerouslySetInnerHTML={{__html: t("landing-title")}}
            />
            <p className="text-white/70 text-lg mb-8 max-w-lg">
              {t("landing-sub-title")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                  onClick={() => scrollToElement('contact')}
                  className="btn-primary bg-gradient-to-r from-primary to-secondary py-6 px-8 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {t("landing-title-btn1")}
              </Button>
              <Button
                  onClick={() => scrollToElement('work')}
                  variant="outline"
                  className="py-6 px-8 rounded-full border border-white/20 text-white font-medium hover:bg-muted transition-all duration-300"
              >
                {t("landing-title-btn2")}
              </Button>
            </div>
            <div className="mt-12 flex items-center space-x-6">
              <div className="flex -space-x-4">
                {avatars.map((avatar, index) => (
                    <img
                        key={index}
                        src={avatar}
                        alt="Client"
                        className="w-10 h-10 rounded-full border-2 border-background"
                    />
                ))}
              </div>
              <div>
                <p className="text-white/70 text-sm"> {t("client-trusted-1")} <span
                    className="text-white font-semibold">200+</span>  {t("client-trusted-2")}</p>
              </div>
            </div>
          </FadeIn>

          <div className="lg:flex justify-end hidden">
            <FloatingAnimation>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30"></div>
                <div className="relative glassmorphism rounded-2xl p-6 h-96 w-96 flex items-center justify-center overflow-hidden">
                  <div className="absolute w-full h-full top-0 left-0">
                    <div className="absolute w-40 h-40 rounded-full bg-secondary/20 blur-xl -top-10 -left-10"></div>
                    <div className="absolute w-40 h-40 rounded-full bg-primary/20 blur-xl -bottom-10 -right-10"></div>
                  </div>
                  <div className="relative z-10 text-center">
                    <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t("landing-hero-card-title")}</h3>
                    <p className="text-white/70 text-sm mb-6">{t("landing-hero-card-desc")}</p>
                    <div className="inline-flex items-center justify-center space-x-1">

                    </div>
                  </div>
                </div>
              </div>
            </FloatingAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
