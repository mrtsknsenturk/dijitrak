import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine which section is currently in view
      const sections = ["home", "services", "work", "about", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.portfolio"), href: "#portfolio" },
    { name: t("nav.testimonials"), href: "#testimonials" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glassmorphism py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="text-2xl font-bold cursor-pointer">
                <span className="gradient-text">Diji</span>
                <span>Trak.net</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href.substring(1));
                }}
                className={cn(
                  "text-sm font-medium transition duration-300",
                  activeSection === link.href.substring(1)
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          <Button
            onClick={() => scrollToSection("contact")}
            className="btn-primary bg-muted hover:bg-muted/80 py-2 px-6 rounded-full text-sm font-medium shadow-lg transition-all duration-300"
          >
            {t("nav.getInTouch")}
          </Button>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="glassmorphism border-l border-white/10"
              >
                <div className="flex flex-col space-y-6 mt-10">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href.substring(1));
                      }}
                      className={cn(
                        "text-lg font-medium transition duration-300",
                        activeSection === link.href.substring(1)
                          ? "text-white"
                          : "text-white/80 hover:text-white"
                      )}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
