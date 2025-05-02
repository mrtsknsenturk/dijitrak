import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedRocket() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  
  // Roket'in yol hareketini hesaplamak için
  const y = useTransform(
    scrollY,
    [0, 1000, 2000, 3000, 4000, 5000],
    ["100vh", "80vh", "60vh", "40vh", "20vh", "0vh"]
  );
  
  // Roket'in açısını hesaplamak için
  const rotate = useTransform(
    scrollY,
    [0, 1000, 2000, 3000, 4000, 5000],
    [0, -5, 0, 5, 0, -5]
  );
  
  // Ateş/füze efektini hesaplamak için
  const fireHeight = useTransform(
    scrollY,
    [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
    [10, 15, 10, 20, 15, 25, 15, 20, 10, 15, 25]
  );
  
  // Roket'in sayfadaki görünürlüğünü kontrol etmek için
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <motion.div
          className="fixed right-10 pointer-events-none z-20"
          style={{ y, rotate }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Roket SVG */}
          <div className="relative">
            <svg
              width="60"
              height="120"
              viewBox="0 0 60 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Roket gövdesi */}
              <path
                d="M30 0C13.5 0 0 40 0 60C0 80 13.5 90 30 90C46.5 90 60 80 60 60C60 40 46.5 0 30 0Z"
                fill="url(#gradient-body)"
              />
              
              {/* Pencereler */}
              <circle cx="30" cy="30" r="8" fill="#ECFDF5" />
              <circle cx="30" cy="30" r="6" fill="#059669" />
              <circle cx="30" cy="50" r="5" fill="#ECFDF5" />
              <circle cx="30" cy="50" r="3" fill="#059669" />
              <circle cx="30" cy="70" r="4" fill="#ECFDF5" />
              <circle cx="30" cy="70" r="2" fill="#059669" />
              
              {/* Kanatçıklar */}
              <path
                d="M0 60C0 60 -5 85 10 100H20C5 85 5 60 5 60H0Z"
                fill="url(#gradient-fins)"
              />
              <path
                d="M60 60C60 60 65 85 50 100H40C55 85 55 60 55 60H60Z"
                fill="url(#gradient-fins)"
              />
              
              {/* Ateş Efekti */}
              <motion.path
                d="M20 90C20 90 25 110 30 120C35 110 40 90 40 90H20Z"
                fill="url(#gradient-fire)"
                style={{ height: fireHeight }}
              />
              
              {/* Gradients */}
              <defs>
                <linearGradient id="gradient-body" x1="30" y1="0" x2="30" y2="90" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0EA5E9" />
                  <stop offset="1" stopColor="#0369A1" />
                </linearGradient>
                <linearGradient id="gradient-fins" x1="30" y1="60" x2="30" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0284C7" />
                  <stop offset="1" stopColor="#0369A1" />
                </linearGradient>
                <linearGradient id="gradient-fire" x1="30" y1="90" x2="30" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F59E0B" />
                  <stop offset="0.5" stopColor="#EF4444" />
                  <stop offset="1" stopColor="#DC2626" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Duman/Buhar efekti */}
            <motion.div
              className="absolute -bottom-5 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0.7, scale: 0.5 }}
              animate={{ opacity: 0, scale: 1.5, y: 20 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            >
              <div className="h-6 w-6 rounded-full bg-white/20"></div>
            </motion.div>
            <motion.div
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0.7, scale: 0.5 }}
              animate={{ opacity: 0, scale: 1.2, y: 15 }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <div className="h-4 w-4 rounded-full bg-white/20"></div>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0.7, scale: 0.5 }}
              animate={{ opacity: 0, scale: 1.3, y: 18 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.5 }}
            >
              <div className="h-5 w-5 rounded-full bg-white/20"></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}