import React, { createContext, useState, useContext, useEffect } from "react";
import { translations, TranslationsData } from "./translations";

// Types
export type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
  translations: TranslationsData;
  availableLocales: string[];
};

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Available locales
const availableLocales = Object.keys(translations);

// Language Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get the stored locale from localStorage, default to 'en'
  const [locale, setLocale] = useState<string>(() => {
    if (typeof window === "undefined") return "en";
    
    const savedLocale = localStorage.getItem("preferredLanguage");
    return savedLocale && availableLocales.includes(savedLocale) ? savedLocale : "en";
  });

  // Update localStorage when locale changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", locale);
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[locale]) return key;
    
    return translations[locale][key] || translations["en"][key] || key;
  };

  // Context value
  const value = {
    locale,
    setLocale,
    t,
    translations,
    availableLocales,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// Hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  
  return context;
};