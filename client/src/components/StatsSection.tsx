import React, { useState, useEffect, useRef } from "react";
import { FadeIn } from "@/components/ui/motion";
import { motion, useInView } from "framer-motion";
import {useLanguage} from "@/lib/LanguageContext.tsx";

interface StatItemProps {
  number: number;
  label: string;
  suffix?: string;
  delay?: number;
}

function StatItem({ number, label, suffix = "", delay = 0 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // ms
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      const step = number / totalFrames;

      let currentFrame = 0;

      const timer = setTimeout(() => {
        const counter = setInterval(() => {
          currentFrame += 1;
          setCount(Math.min(Math.floor(currentFrame * step), number));

          if (currentFrame >= totalFrames) {
            clearInterval(counter);
          }
        }, frameDuration);

        return () => clearInterval(counter);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, number, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="glassmorphism rounded-xl p-6 text-center border border-white/10"
    >
      <div className="mb-2">
        <span className="text-4xl md:text-5xl font-bold gradient-text">
          {count}{suffix}
        </span>
      </div>
      <p className="text-white/70">{label}</p>
    </motion.div>
  );
}

export default function StatsSection() {
  const { t } = useLanguage(); // çeviri hook'u
  const stats = [
    { number: 200, label: t("happyClients"), suffix: "+" },
    { number: 350, label: t("projectsCompleted"), suffix: "+" },
    { number: 15, label: t("teamMembers"), suffix: "" },
    { number: 98, label: t("customerSatisfaction"), suffix: "%" },
  ];

  return (
      <section className="py-16 bg-background/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>

        <div className="container mx-auto px-6 relative z-10">
          <FadeIn className="text-center max-w-3xl mx-auto mb-12">
            <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                dangerouslySetInnerHTML={{__html: t("sectionTitle")}}
            />
            <p className="text-white/70">{t("sectionDescription")}</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <StatItem
                    key={index}
                    number={stat.number}
                    label={stat.label}
                    suffix={stat.suffix}
                    delay={index * 200}
                />
            ))}
          </div>
        </div>
      </section>
  );
}