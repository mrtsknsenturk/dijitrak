import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    timeline: "",
    budget: "",
    description: "",
    clientName: "",
    clientEmail: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/project-requests", formData);
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your project request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsSubmitted(false);
    onClose();
    setCurrentStep(1);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

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
            onClick={isSubmitted ? handleCloseSuccess : onClose}
          />

          <motion.div
            className="glassmorphism rounded-xl p-8 max-w-md w-full mx-4 relative z-10"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {!isSubmitted ? (
              <>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/50 hover:text-white transition duration-300"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Start Your Project
                  </h3>
                  <p className="text-white/70">
                    Tell us about your project requirements
                  </p>
                </div>

                <div className="flex justify-between mb-8">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-24 h-1 rounded-full transition-all duration-300 ${
                        step <= currentStep
                          ? "bg-gradient-to-r from-secondary to-primary"
                          : "bg-white/20"
                      }`}
                    ></div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Step 1 */}
                  <div
                    className={`space-y-4 ${
                      currentStep === 1 ? "block" : "hidden"
                    }`}
                  >
                    <div>
                      <Label
                        htmlFor="projectName"
                        className="text-white/70 text-sm font-medium mb-1"
                      >
                        Project Name
                      </Label>
                      <Input
                        id="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        className="bg-muted border border-white/10 text-white focus:border-secondary"
                        placeholder="My Awesome Project"
                        required
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="projectType"
                        className="text-white/70 text-sm font-medium mb-1"
                      >
                        Project Type
                      </Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) =>
                          handleSelectChange("projectType", value)
                        }
                      >
                        <SelectTrigger className="bg-muted border border-white/10 text-white focus:border-secondary">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent className="glassmorphism border border-white/10">
                          <SelectItem value="web-app">Web Application</SelectItem>
                          <SelectItem value="mobile-app">
                            Mobile Application
                          </SelectItem>
                          <SelectItem value="e-commerce">
                            E-commerce Website
                          </SelectItem>
                          <SelectItem value="branding">
                            Branding & Identity
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label
                        htmlFor="timeline"
                        className="text-white/70 text-sm font-medium mb-1"
                      >
                        Timeline
                      </Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) =>
                          handleSelectChange("timeline", value)
                        }
                      >
                        <SelectTrigger className="bg-muted border border-white/10 text-white focus:border-secondary">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent className="glassmorphism border border-white/10">
                          <SelectItem value="urgent">
                            Urgent (1-2 weeks)
                          </SelectItem>
                          <SelectItem value="standard">
                            Standard (1-2 months)
                          </SelectItem>
                          <SelectItem value="flexible">
                            Flexible (3+ months)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="w-full btn-primary bg-gradient-to-r from-secondary to-primary py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
                      >
                        Next Step
                      </Button>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div
                    className={`space-y-4 ${
                      currentStep === 2 ? "block" : "hidden"
                    }`}
                  >
                    <div>
                      <Label
                        htmlFor="budget"
                        className="text-white/70 text-sm font-medium mb-1"
                      >
                        Budget Range
                      </Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) =>
                          handleSelectChange("budget", value)
                        }
                      >
                        <SelectTrigger className="bg-muted border border-white/10 text-white focus:border-secondary">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent className="glassmorphism border border-white/10">
                          <SelectItem value="small">$1,000 - $5,000</SelectItem>
                          <SelectItem value="medium">
                            $5,000 - $15,000
                          </SelectItem>
                          <SelectItem value="large">
                            $15,000 - $50,000
                          </SelectItem>
                          <SelectItem value="enterprise">$50,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label
                        htmlFor="description"
                        className="text-white/70 text-sm font-medium mb-1"
                      >
                        Project Description
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="bg-muted border border-white/10 text-white focus:border-secondary"
                        placeholder="Describe your project in detail..."
                        required
                      />
                    </div>

                    <div className="flex pt-4 space-x-4">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="w-1/2 py-3 px-4 rounded-lg text-white font-medium border border-white/20 hover:bg-muted"
                      >
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="w-1/2 btn-primary bg-gradient-to-r from-secondary to-primary py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
                      >
                        Next Step
                      </Button>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div
                    className={`space-y-4 ${
                      currentStep === 3 ? "block" : "hidden"
                    }`}
                  >
                    <div>
                      <Label
                        htmlFor="clientName"
                        className="text-white/70 text-sm font-medium mb-1"
                      >
                        Your Name
                      </Label>
                      <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        className="bg-muted border border-white/10 text-white focus:border-secondary"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="clientEmail"
                        className="text-white/70 text-sm font-medium mb-1"
                      >
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        id="clientEmail"
                        value={formData.clientEmail}
                        onChange={handleChange}
                        className="bg-muted border border-white/10 text-white focus:border-secondary"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-white/70 text-sm font-medium mb-1"
                      >
                        Phone Number (Optional)
                      </Label>
                      <Input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-muted border border-white/10 text-white focus:border-secondary"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="flex pt-4 space-x-4">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="w-1/2 py-3 px-4 rounded-lg text-white font-medium border border-white/20 hover:bg-muted"
                      >
                        Previous
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-1/2 btn-primary bg-gradient-to-r from-secondary to-primary py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                      </Button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Request Submitted!</h3>
                <p className="text-white/70 mb-6">
                  Thanks for submitting your project request. We'll get back to you within 24-48 hours with a response.
                </p>
                <Button
                  onClick={handleCloseSuccess}
                  className="bg-gradient-to-r from-secondary to-primary py-3 px-6 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Close
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}