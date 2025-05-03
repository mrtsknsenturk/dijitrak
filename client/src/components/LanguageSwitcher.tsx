import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { locale, setLocale, t, availableLocales } = useLanguage();

  // Display texts for each language in the dropdown
  const getLanguageDisplayText = (lang: string) => {
    switch (lang) {
      case "en": return "English";
      case "tr": return "Türkçe";
      case "bg": return "Български";
      default: return lang.toUpperCase();
    }
  };

  // Get the current language's short code to display on the button
  const getLanguageShortCode = (lang: string) => {
    return lang.toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 shadow-lg"
            title={t("language.select")}
          >
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36 bg-white/10 backdrop-blur-xl border border-white/20 text-white">
          {availableLocales.map((lang) => (
            <DropdownMenuItem 
              key={lang}
              className={`flex items-center justify-between cursor-pointer hover:bg-white/20 ${locale === lang ? 'bg-white/20' : ''}`}
              onClick={() => setLocale(lang)}
            >
              <span>{getLanguageDisplayText(lang)}</span>
              {locale === lang && <Pencil className="h-3.5 w-3.5 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}