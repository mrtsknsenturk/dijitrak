import React, { useState, useEffect, useCallback } from "react";
import { FadeIn } from "@/components/ui/motion";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  position: string;
  company: string;
  image: string;
}

export default function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Working with Quantum Edge completely transformed our online presence. Their team delivered a sophisticated e-commerce platform that increased our conversion rates by 45% in just three months.",
      name: "Sarah Miller",
      position: "CEO",
      company: "LuxStyle Boutique",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
    },
    {
      id: 2,
      quote: "The mobile application Quantum Edge developed for our restaurant chain revolutionized how we connect with customers. The interface is intuitive, and they delivered the project ahead of schedule.",
      name: "Michael Chen",
      position: "Marketing Director",
      company: "Urban Eats Group",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
    },
    {
      id: 3,
      quote: "Their branding expertise truly sets them apart. The comprehensive branding package they created for our tech startup has helped us establish a strong market presence and attract major investors.",
      name: "Rebecca Johnson",
      position: "Founder",
      company: "Nexus Technologies",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [autoplay, nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl -top-48 -left-48 opacity-30"></div>
        <div className="absolute w-96 h-96 rounded-full bg-secondary/5 blur-3xl -bottom-48 -right-48 opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-white/70">
            Don't just take our word for it — hear from some of our satisfied clients about their experiences working with us.
          </p>
        </FadeIn>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative h-[400px] md:h-[300px] glassmorphism rounded-2xl p-8 border border-white/10"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Quote className="h-6 w-6 text-background" />
            </div>
            
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={testimonials[current].id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 p-8 flex flex-col justify-center"
              >
                <p className="text-lg md:text-xl italic text-white/90 mb-8">
                  "{testimonials[current].quote}"
                </p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonials[current].image} 
                    alt={testimonials[current].name}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-primary/20"
                  />
                  
                  <div>
                    <h4 className="font-bold">{testimonials[current].name}</h4>
                    <p className="text-white/70 text-sm">
                      {testimonials[current].position}, {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-6 right-6 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "bg-gradient-to-r from-primary to-secondary" 
                    : "bg-white/20"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}