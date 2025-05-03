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

// Create context with default values to avoid undefined checks
const defaultContextValue: LanguageContextType = {
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
  translations,
  availableLocales: Object.keys(translations)
};

// Create context with the default value
const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

// Language Provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Try to get the stored locale from localStorage, default to 'en'
  const [locale, setLocale] = useState<string>(() => {
    if (typeof window === "undefined") return "en";
    
    const savedLocale = localStorage.getItem("preferredLanguage");
    return savedLocale && Object.keys(translations).includes(savedLocale) ? savedLocale : "en";
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
  const value: LanguageContextType = {
    locale,
    setLocale,
    t,
    translations,
    availableLocales: Object.keys(translations),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);