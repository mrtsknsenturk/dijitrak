import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import PortfolioSection from "@/components/PortfolioSection";
import StatsSection from "@/components/StatsSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import TechStack from "@/components/TechStack";
import PriceCalculator from "@/components/PriceCalculator";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const { locale, t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>Quantum Edge | {locale === "en" ? "Digital Innovation Agency" : "Dijital İnovasyon Ajansı"}</title>
        <meta 
          name="description" 
          content={locale === "en" 
            ? "We build digital experiences that transform businesses. Our team of experts creates cutting-edge digital solutions that help businesses stay ahead." 
            : "İşletmeleri dönüştüren dijital deneyimler oluşturuyoruz. Uzman ekibimiz, işletmelerin öne çıkmasına yardımcı olan yenilikçi dijital çözümler yaratır."} 
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <html lang={locale} />
      </Helmet>
      <div className="min-h-screen bg-background text-white flex flex-col">
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <ProcessTimeline />
          <TechStack />
          <PortfolioSection />
          <StatsSection />
          <TestimonialSection />
          <PriceCalculator />
          <CTASection />
          <ContactSection />
        </main>
        <LanguageSwitcher />
        <Footer />
      </div>
    </>
  );
}
