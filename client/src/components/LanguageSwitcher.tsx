import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "tr" : "en");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Button
        onClick={toggleLanguage}
        className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 shadow-lg"
        title={locale === "en" ? "Switch to Turkish" : "İngilizce'ye geç"}
      >
        <span className="text-xl font-bold">
          {locale === "en" ? "TR" : "EN"}
        </span>
      </Button>
    </motion.div>
  );
}