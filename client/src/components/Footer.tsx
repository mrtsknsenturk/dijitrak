import React from "react";
import { FadeIn } from "@/components/ui/motion";
import { useLanguage } from "@/lib/LanguageContext";
import {Twitter, Instagram, Linkedin, Github, MapPin, Mail, Phone, Facebook} from "lucide-react";

export default function Footer() {
  const { t, locale } = useLanguage();

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
      <footer id="contact" className="bg-background border-t border-white/5 py-12">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="text-2xl font-bold mb-6">
                  <span className="gradient-text">diji</span>
                  <span>trak.net</span>
                </div>
                <p className="text-white/70 mb-6 max-w-xs">
                  {t("footer.description")}
                </p>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/dijitrak/" className="text-white/50 hover:text-primary transition duration-300"><Instagram className="h-5 w-5" /></a>
                  <a href="#" className="text-white/50 hover:text-primary transition duration-300"><Facebook className="h-5 w-5" /></a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6">{t("footer.quick_links")}</h3>
                <ul className="space-y-3">
                  {[
                    { id: "home", label: t("footer.home") },
                    { id: "services", label: t("footer.services") },
                    { id: "work", label: t("footer.our_work") },
                    { id: "about", label: t("footer.about_us") },
                    { id: "contact", label: t("footer.contact") },
                  ].map((link) => (
                      <li key={link.id}>
                        <a
                            href={`#${link.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(link.id);
                            }}
                            className="text-white/70 hover:text-primary transition duration-300"
                        >
                          {link.label}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6">{t("footer.our_services")}</h3>
                <ul className="space-y-3">
                  {["web_dev", "mobile_apps", "ui_ux", "ecommerce", "marketing"].map((key) => (
                      <li key={key}>
                        <a
                            href="#services"
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection("services");
                            }}
                            className="text-white/70 hover:text-primary transition duration-300"
                        >
                          {t(`footer.${key}`)}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6">{t("footer.contact_us")}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-white/70">Dijitrak Bilişim Ofisi, İstanbul / TR</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-white/70">info@dijitrak.net</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-white/70">+90 545 671 87 46</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/50 text-sm mb-4 md:mb-0">© 2023 dijitrak.net {t("footer.rights_reserved")}</p>
              <div className="flex space-x-6">
                <a href="#" className="text-white/50 hover:text-primary text-sm transition duration-300">{t("footer.privacy_policy")}</a>
                <a href="#" className="text-white/50 hover:text-primary text-sm transition duration-300">{t("footer.terms")}</a>
                <a href="#" className="text-white/50 hover:text-primary text-sm transition duration-300">{t("footer.cookies")}</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </footer>
  );
}
