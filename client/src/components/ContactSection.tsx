import React, { useState } from "react";
import { FadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MailIcon, MapPin, Phone, Send, Check } from "lucide-react";
import {useLanguage} from "@/lib/LanguageContext.tsx";
export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }
      
      setIsSuccess(true);
      
      toast({
        title: t("contact-toast-success-title"),
        description: t("contact-toast-success-description"),
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : t("contact-toast-error-title"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const { t,locale } = useLanguage(); // çeviri hook'u
  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl bottom-1/4 left-1/4 opacity-50"></div>
        <div className="absolute w-64 h-64 rounded-full bg-secondary/5 blur-3xl top-1/4 right-1/4 opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === "en"
                ? "Get In "
                : locale === "tr"
                    ? "Bizimle "
                    : "Свържете се "}
            <span className="gradient-text">
    {locale === "en"
        ? "Touch"
        : locale === "tr"
            ? "İletişime Geçin"
            : "с Нас"}
  </span>
          </h2>
          <p className="text-white/70">
            {t("contact-description")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="glassmorphism rounded-xl p-6 border border-white/10">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t("contact-location-title")}</h3>
                  <p className="text-white/70">
                    {t("contact-location-description")}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                  <MailIcon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t("contact-email-title")}</h3>
                  <p className="text-white/70">
                    {t("contact-email-description")}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t("contact-phone-title")}</h3>
                  <p className="text-white/70">
                    {t("contact-phone-description")}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glassmorphism rounded-xl p-6 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <h3 className="text-xl font-bold mb-4">{t("contact-hours-title")}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">{t("contact-hours-weekdays")}</span>
                  <span className="font-medium">{t("contact-hours-weekdays-hours")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">{t("contact-hours-saturday")}</span>
                  <span className="font-medium">{t("contact-hours-saturday-hours")}</span>
                </div>

              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="glassmorphism rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-6">{t("contact-form-title")}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white/70 mb-2 block">{t("contact-form-field-name")}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contact-form-placeholder-name")}
                      required
                      className="bg-muted border border-white/10 text-white focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white/70 mb-2 block">{t("contact-form-field-email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact-form-placeholder-email")}
                      required
                      className="bg-muted border border-white/10 text-white focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-white/70 mb-2 block">{t("contact-form-field-subject")}</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t("contact-form-placeholder-subject")}
                    required
                    className="bg-muted border border-white/10 text-white focus:border-primary"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-white/70 mb-2 block">{t("contact-form-field-message")}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact-form-placeholder-message")}
                    rows={5}
                    required
                    className="bg-muted border border-white/10 text-white focus:border-primary"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 transition-all duration-300 ${
                    isSuccess
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("contact-form-submitting")}
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center justify-center">
                      <Check className="h-5 w-5 mr-2" />
                      {t("contact-form-success")}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="h-5 w-5 mr-2" />
                      {t("contact-form-submit")}
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}