import React from "react";
import { FadeIn } from "@/components/ui/motion";
import { Link } from "wouter";
import { Twitter, Instagram, Linkedin, Github, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
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
                <span className="gradient-text">Quantum</span>
                <span>Edge</span>
              </div>
              <p className="text-white/70 mb-6 max-w-xs">
                Transforming businesses through innovative digital solutions. Your partner in digital excellence.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/50 hover:text-primary transition duration-300">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/50 hover:text-primary transition duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/50 hover:text-primary transition duration-300">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/50 hover:text-primary transition duration-300">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#home" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("home");
                    }}
                    className="text-white/70 hover:text-primary transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#services" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="text-white/70 hover:text-primary transition duration-300"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a 
                    href="#work" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("work");
                    }}
                    className="text-white/70 hover:text-primary transition duration-300"
                  >
                    Our Work
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("about");
                    }}
                    className="text-white/70 hover:text-primary transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("contact");
                    }} 
                    className="text-white/70 hover:text-primary transition duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="text-white/70 hover:text-primary transition duration-300"
                  >
                    Web Development
                  </a>
                </li>
                <li>
                  <a 
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="text-white/70 hover:text-primary transition duration-300"
                  >
                    Mobile Apps
                  </a>
                </li>
                <li>
                  <a 
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="text-white/70 hover:text-primary transition duration-300"
                  >
                    UI/UX Design
                  </a>
                </li>
                <li>
                  <a 
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="text-white/70 hover:text-primary transition duration-300"
                  >
                    E-commerce
                  </a>
                </li>
                <li>
                  <a 
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="text-white/70 hover:text-primary transition duration-300"
                  >
                    Digital Marketing
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-white/70">123 Innovation Dr, Tech City, CA 98765</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-white/70">info@quantumedge.com</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-white/70">+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">© 2023 Quantum Edge. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/50 hover:text-primary text-sm transition duration-300">Privacy Policy</a>
              <a href="#" className="text-white/50 hover:text-primary text-sm transition duration-300">Terms of Service</a>
              <a href="#" className="text-white/50 hover:text-primary text-sm transition duration-300">Cookies</a>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
