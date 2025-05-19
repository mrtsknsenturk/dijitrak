import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {useLanguage} from "@/lib/LanguageContext.tsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface FreelancerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FreelancerModal({ isOpen, onClose }: FreelancerModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "",
    experience: "",
    portfolioUrl: "",
    coverLetter: "",
    languages: ["en"]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, specialty: value }));
  };

  const handleLanguageToggle = (lang: string) => {
    setFormData(prev => {
      const languages = [...prev.languages];

      if (languages.includes(lang)) {
        return { ...prev, languages: languages.filter(l => l !== lang) };
      } else {
        return { ...prev, languages: [...languages, lang] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/freelancer-applications", formData);

      toast({
        title: t("freelancer-success-title"),
        description: t("freelancer-success-description"),
      });

      onClose();
    } catch (error) {
      toast({
        title: t("freelancer-error-title"),
        description: t("freelancer-error-description"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  // Language options
  const languages = [
    { code: "en", flag: "🇺🇸", name: "English" },
    { code: "es", flag: "🇪🇸", name: "Spanish" },
    { code: "fr", flag: "🇫🇷", name: "French" },
    { code: "de", flag: "🇩🇪", name: "German" },
    { code: "it", flag: "🇮🇹", name: "Italian" }
  ];
  const { t } = useLanguage()
  return (
      <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <motion.div
                  className="fixed inset-0 bg-background/70 backdrop-blur-md"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={backdropVariants}
                  onClick={onClose}
              />

              <motion.div
                  className="glassmorphism rounded-xl p-8 max-w-md w-full mx-4 relative z-10"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={modalVariants}
                  transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition duration-300"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t("freelancer-title")}</h3>
                  <p className="text-white/70">{t("freelancer-description")}</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="name" className="text-white/70 text-sm font-medium mb-1">{t("freelancer-field-name")}</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-muted border border-white/10 text-white focus:border-primary"
                        placeholder={t("freelancer-placeholder-name")}
                        required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white/70 text-sm font-medium mb-1">{t("freelancer-field-email")}</Label>
                    <Input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-muted border border-white/10 text-white focus:border-primary"
                        placeholder={t("freelancer-placeholder-email")}
                        required
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialty" className="text-white/70 text-sm font-medium mb-1">{t("freelancer-field-specialty")}</Label>
                    <Select
                        onValueChange={handleSelectChange}
                        value={formData.specialty}
                    >
                      <SelectTrigger className="bg-muted border border-white/10 text-white focus:border-primary">
                        <SelectValue placeholder={t("freelancer-placeholder-specialty")} />
                      </SelectTrigger>
                      <SelectContent className="glassmorphism border border-white/10">
                        <SelectItem value="web-dev">{t("freelancer-specialty-web-dev")}</SelectItem>
                        <SelectItem value="mobile-dev">{t("freelancer-specialty-mobile-dev")}</SelectItem>
                        <SelectItem value="ui-ux">{t("freelancer-specialty-ui-ux")}</SelectItem>
                        <SelectItem value="digital-marketing">{t("freelancer-specialty-digital-marketing")}</SelectItem>
                        <SelectItem value="content-creation">{t("freelancer-specialty-content-creation")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-white/70 text-sm font-medium mb-1">{t("freelancer-field-experience")}</Label>
                    <Input
                        type="number"
                        id="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        min="0"
                        max="50"
                        className="bg-muted border border-white/10 text-white focus:border-primary"
                        placeholder="3"
                        required
                    />
                  </div>

                  <div>
                    <Label htmlFor="portfolioUrl" className="text-white/70 text-sm font-medium mb-1">{t("freelancer-field-portfolioUrl")}</Label>
                    <Input
                        type="url"
                        id="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleChange}
                        className="bg-muted border border-white/10 text-white focus:border-primary"
                        placeholder={t("freelancer-placeholder-portfolioUrl")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="coverLetter" className="text-white/70 text-sm font-medium mb-1">{t("freelancer-field-coverLetter")}</Label>
                    <Textarea
                        id="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        rows={4}
                        className="bg-muted border border-white/10 text-white focus:border-primary"
                        placeholder={t("freelancer-placeholder-coverLetter")}
                        required
                    />
                  </div>

                  <div>
                    <Label className="text-white/70 text-sm font-medium mb-2 block">{t("freelancer-field-languages")}</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {languages.map((lang) => (
                          <button
                              key={lang.code}
                              type="button"
                              onClick={() => handleLanguageToggle(lang.code)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                                  formData.languages.includes(lang.code)
                                      ? "bg-primary text-background"
                                      : "bg-muted text-white/70 hover:bg-muted/70"
                              }`}
                              title={lang.name}
                          >
                            {lang.flag}
                          </button>
                      ))}
                    </div>
                  </div>

                  <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary bg-gradient-to-r from-primary to-secondary py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    {isSubmitting ? t("freelancer-button-submitting") : t("freelancer-button-submit")}
                  </Button>
                </form>
              </motion.div>
            </div>
        )}
      </AnimatePresence>
  );
}
