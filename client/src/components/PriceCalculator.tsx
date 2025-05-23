import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Shield, Clock, Cpu, BrainCircuit, LineChart, Database, Code, PaintBucket, Globe, X } from "lucide-react";
import { MotionDiv, FadeIn, FadeInStagger } from "@/components/ui/motion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";



export default function PriceCalculator() {
  const { locale, t } = useLanguage();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("web");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [timeFrame, setTimeFrame] = useState("standard");
  const [complexity, setComplexity] = useState<number[]>([50]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceBreakdown, setPriceBreakdown] = useState<any>({});
  const [customFeatures, setCustomFeatures] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  interface PricingOption {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    basePrice: number;
    priceMultiplier: number;
  }

  interface TimeFrame {
    id: string;
    title: string;
    multiplier: number;
  }

// Define service options with base pricing
  const webOptions: PricingOption[] = [
    {
      id: "landing",
      title: t("webOptions-landing-title"),
      description: t("webOptions-landing-description"),
      icon: <Globe className="size-5" />,
      basePrice: 8500,
      priceMultiplier: 1,
    },
    {
      id: "business",
      title: t("webOptions-business-title"),
      description:  t("webOptions-business-description"),
      icon: <LineChart className="size-5" />,
      basePrice: 15000,
      priceMultiplier: 2.5,
    },
    {
      id: "ecommerce",
      title:  t("webOptions-ecommerce-title"),
      description:  t("webOptions-ecommerce-description"),
      icon: <ShoppingCart className="size-5" />,
      basePrice: 24000,
      priceMultiplier: 5,
    },
    {
      id: "custom",
      title:  t("webOptions-custom-title"),
      description:  t("webOptions-custom-description"),
      icon: <Code className="size-5" />,
      basePrice: 38000,
      priceMultiplier: 8,
    },
  ];

  const mobileOptions: PricingOption[] = [
    {
      id: "mvp",
      title:  t("mobileOptions-mvp-title"),
      description:  t("mobileOptions-mvp-description"),
      icon: <Rocket className="size-5" />,
      basePrice: 26000,
      priceMultiplier: 1,
    },
    {
      id: "native-ios",
      title:  t("mobileOptions-native-ios-title"),
      description:  t("mobileOptions-native-ios-description"),
      icon: <AppleIcon className="size-5" />,
      basePrice: 36000,
      priceMultiplier: 1.8,
    },
    {
      id: "native-android",
      title:  t("mobileOptions-native-android-title"),
      description:  t("mobileOptions-native-android-description"),
      icon: <SmartphoneIcon className="size-5" />,
      basePrice: 34000,
      priceMultiplier: 1.7,
    },
    {
      id: "cross-platform",
      title:  t("mobileOptions-cross-platform-title"),
      description:  t("mobileOptions-cross-platform-description"),
      icon: <Layers className="size-5" />,
      basePrice: 45000,
      priceMultiplier: 2.2,
    },
  ];

  const designOptions: PricingOption[] = [
    {
      id: "ui-design",
      title:  t("designOptions-ui-design-title"),
      description:  t("designOptions-ui-design-description"),
      icon: <PaintBucket className="size-5" />,
      basePrice: 5000,
      priceMultiplier: 1,
    },
    {
      id: "ux-research",
      title:  t("designOptions-ux-research-title"),
      description:  t("designOptions-ux-research-description"),
      icon: <BrainCircuit className="size-5" />,
      basePrice: 6500,
      priceMultiplier: 1.8,
    },
    {
      id: "branding",
      title:  t("designOptions-branding-title"),
      description:  t("designOptions-branding-description"),
      icon: <Palette className="size-5" />,
      basePrice: 5500,
      priceMultiplier: 1.5,
    },
    {
      id: "motion-graphics",
      title: t("designOptions-motion-graphics-title"),
      description:  t("designOptions-motion-graphics-description"),
      icon: <Play className="size-5" />,
      basePrice: 7000,
      priceMultiplier: 1.6,
    },
  ];

// Time frames with multipliers
  const timeFrames: TimeFrame[] = [
    { id: "standard", title: t("timeFrames-standard-title"), multiplier: 1 },
    { id: "accelerated", title: t("timeFrames-accelerated-title"), multiplier: 1.4 },
    { id: "express", title: t("timeFrames-express-title"), multiplier: 2 },
  ];

// Additional features with prices
  const additionalFeatures = [
    { id: "analytics", title: t("additionalFeatures-analytics-title"), price: 2500, icon: <LineChart className="size-4" /> },
    { id: "cms", title: t("additionalFeatures-cms-title"), price: 3500, icon: <Database className="size-4" /> },
    { id: "multilingual", title: t("additionalFeatures-multilingual-title"), price: 3000, icon: <Globe className="size-4" /> },
    { id: "seo", title: t("additionalFeatures-seo-title"), price: 2500, icon: <Search className="size-4" /> },
    { id: "security", title: t("additionalFeatures-security-title"), price: 3500, icon: <Shield className="size-4" /> },
    { id: "maintenance", title: t("additionalFeatures-maintenance-title"), price: 4000, icon: <Wrench className="size-4" /> },
  ];

// Import missing icons
  function ShoppingCart(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    );
  }

  function Rocket(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    );
  }

  function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
          <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
          <path d="M10 2c1 .5 2 2 2 5" />
        </svg>
    );
  }

  function SmartphoneIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
    );
  }

  function Layers(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
          <path d="m22 6.09-3.08 1.41" />
          <path d="m2.62 13.73 7.55 3.44a2 2 0 0 0 1.66 0l7.55-3.44" />
          <path d="m2.62 17.73 7.55 3.44a2 2 0 0 0 1.66 0l7.55-3.44" />
        </svg>
    );
  }

  function Palette(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
          <circle cx="13.5" cy="6.5" r=".5" />
          <circle cx="17.5" cy="10.5" r=".5" />
          <circle cx="8.5" cy="7.5" r=".5" />
          <circle cx="6.5" cy="12.5" r=".5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
    );
  }

  function Play(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
          <path d="m5 3 14 9-14 9V3z" />
        </svg>
    );
  }

  function Search(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
    );
  }

  function Wrench(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    );
  }
  
  // Form for user contact information
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });
  
  // Modal for collecting contact information
  const [showContactForm, setShowContactForm] = useState(false);

  // Get options based on selected tab
  const getOptions = () => {
    switch (selectedTab) {
      case "web":
        return webOptions;
      case "mobile":
        return mobileOptions;
      case "design":
        return designOptions;
      default:
        return webOptions;
    }
  };

  // Calculate total price
  useEffect(() => {
    if (!selectedOption) {
      setTotalPrice(0);
      setPriceBreakdown({});
      return;
    }

    const options = getOptions();
    const selectedService = options.find((opt) => opt.id === selectedOption);
    
    if (!selectedService) return;
    
    // Base price
    const basePrice = selectedService.basePrice;
    
    // Complexity multiplier (ranges from 0.8 to 1.2)
    const complexityMultiplier = 0.8 + (complexity[0] / 100) * 0.4;
    
    // Time frame multiplier
    const selectedTimeFrame = timeFrames.find((tf) => tf.id === timeFrame);
    const timeFrameMultiplier = selectedTimeFrame ? selectedTimeFrame.multiplier : 1;
    
    // Additional features
    const featuresPrice = selectedFeatures.reduce((total, featureId) => {
      const feature = additionalFeatures.find((f) => f.id === featureId);
      return total + (feature ? feature.price : 0);
    }, 0);
    
    // Calculate subtotal prices for breakdown
    const servicePrice = Math.round(basePrice * complexityMultiplier);
    const timeFramePrice = Math.round((servicePrice) * (timeFrameMultiplier - 1));
    
    // Calculate total
    const calculatedTotal = Math.round(servicePrice + timeFramePrice + featuresPrice);
    
    // Set total price and breakdown
    setTotalPrice(calculatedTotal);
    setPriceBreakdown({
      baseService: servicePrice,
      timeFrame: timeFramePrice,
      additionalFeatures: featuresPrice,
    });
  }, [selectedOption, complexity, timeFrame, selectedFeatures]);

  // Handle feature selection
  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  // Handle contact information input changes
  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmitRequest = async () => {
    if (!selectedOption) {
      toast({
        title:
            locale === "bg"
                ? "Моля, изберете услуга"
                : locale === "en"
                    ? "Please select a service"
                    : "Lütfen bir hizmet seçin",
        variant: "destructive"
      });
      return;
    }
    
    // Show contact form modal if not already shown
    if (!showContactForm) {
      setShowContactForm(true);
      return;
    }
    
    // Validate contact form
    if (!contactInfo.name || !contactInfo.email) {
      toast({
        title: t("price_calculator.toast_validate_fields"),
        description:t("price_calculator.toast_validate_fields_description"),
        variant: "destructive"
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo.email)) {
      toast({
        title: t("price_calculator.toast_title"),
        description: t("price_calculator.toast_title_description"),
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare the data
      const options = getOptions();
      const selectedService = options.find(opt => opt.id === selectedOption);
      const selectedTimeFrameObj = timeFrames.find(tf => tf.id === timeFrame);
      
      // Prepare data in format matching schema
      const requestData = {
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone || undefined,
        company: contactInfo.company || undefined,
        serviceType: selectedTab,
        complexity: complexity[0].toString(), // Convert to string as schema expects string
        timeline: selectedTimeFrameObj?.title || "",
        features: selectedFeatures.map(f => {
          const feature = additionalFeatures.find(af => af.id === f);
          return feature?.title || "";
        }),
        estimatedPrice: totalPrice,
        notes: customFeatures || undefined,
      };
      
      // Send the request
      await apiRequest("POST", "/api/price-calculator-requests", requestData);
      
      // Show success message
      toast({
        title: t("price_calculator.contact-success-title"),
        description: t("price_calculator.contact-success-description"),
      });
      
      // Reset the form
      setShowContactForm(false);
      setContactInfo({
        name: "",
        email: "",
        phone: "",
        company: ""
      });
      
    } catch (error) {
      toast({
        title: t("price_calculator.contact-error-title"),
        description: t("price_calculator.contact-error-description"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6">
      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowContactForm(false)}
          ></div>
          <div className="relative glassmorphism z-50 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <button 
              className="absolute top-4 right-4 text-white/50 hover:text-white"
              onClick={() => setShowContactForm(false)}
            >
              <X className="h-5 w-5" />
            </button>
            
            <h3 className="text-xl font-bold mb-4">
              {t("price_calculator.contact.title")}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-6">
              {t("price_calculator.contact.desc")}
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium mb-1 block">
                  {t("price_calculator.contact.name")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleContactInfoChange}
                  className="bg-muted border border-white/10 text-white focus:border-secondary"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm font-medium mb-1 block">
                  {t("price_calculator.contact.email")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={handleContactInfoChange}
                  className="bg-muted border border-white/10 text-white focus:border-secondary"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-sm font-medium mb-1 block">
                  {t("price_calculator.contact.phone")}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleContactInfoChange}
                  className="bg-muted border border-white/10 text-white focus:border-secondary"
                />
              </div>
              
              <div>
                <Label htmlFor="company" className="text-sm font-medium mb-1 block">
                  {t("price_calculator.contact.company")}
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={contactInfo.company}
                  onChange={handleContactInfoChange}
                  className="bg-muted border border-white/10 text-white focus:border-secondary"
                />
              </div>
              
              <Button 
                className="w-full mt-2" 
                onClick={handleSubmitRequest}
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? t("price_calculator.contact.submitting")
                  : t("price_calculator.contact.submit")}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {locale === "en"
              ? "Interactive "
              : locale === "tr"
                  ? "İnteraktif "
                  : "Интерактивен "}
          <span className="text-primary">
    {locale === "en"
        ? "Pricing Calculator"
        : locale === "tr"
            ? "Fiyat Hesaplayıcı"
            : "Калкулатор за Цени"}
  </span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {locale === "en"
              ? "Estimate the cost of your project based on your specific needs and requirements. Adjust the parameters below to get a custom quote."
              : "Özel ihtiyaçlarınıza ve gereksinimlerinize göre projenizin maliyetini tahmin edin. Özel bir teklif almak için aşağıdaki parametreleri ayarlayın."}
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Calculator Side */}
        <div className="lg:col-span-3 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{t("price_calculator.title")}</CardTitle>
              <CardDescription>
                {t("price_calculator.subtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="web" 
                value={selectedTab}
                onValueChange={(value) => {
                  setSelectedTab(value);
                  setSelectedOption("");
                  setSelectedFeatures([]);
                }}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="web">{t("price_calculator.website")}</TabsTrigger>
                  <TabsTrigger value="mobile">{t("price_calculator.mobile_app")}</TabsTrigger>
                  <TabsTrigger value="design">{t("price_calculator.design")}</TabsTrigger>
                </TabsList>
                <TabsContent value="web" className="space-y-4">
                  <FadeInStagger>
                    {webOptions.map((option) => (
                      <FadeIn key={option.id}>
                        <div
                          className={`p-4 border rounded-lg flex items-start gap-4 cursor-pointer transition-all hover:border-primary/50 ${
                            selectedOption === option.id ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => setSelectedOption(option.id)}
                        >
                          <div className="mt-1 text-primary">{option.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-medium">{option.title}</h3>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                          <div className="font-medium">{formatPrice(option.basePrice)}</div>
                        </div>
                      </FadeIn>
                    ))}
                  </FadeInStagger>
                </TabsContent>
                <TabsContent value="mobile" className="space-y-4">
                  <FadeInStagger>
                    {mobileOptions.map((option) => (
                      <FadeIn key={option.id}>
                        <div
                          className={`p-4 border rounded-lg flex items-start gap-4 cursor-pointer transition-all hover:border-primary/50 ${
                            selectedOption === option.id ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => setSelectedOption(option.id)}
                        >
                          <div className="mt-1 text-primary">{option.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-medium">{option.title}</h3>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                          <div className="font-medium">{formatPrice(option.basePrice)}</div>
                        </div>
                      </FadeIn>
                    ))}
                  </FadeInStagger>
                </TabsContent>
                <TabsContent value="design" className="space-y-4">
                  <FadeInStagger>
                    {designOptions.map((option) => (
                      <FadeIn key={option.id}>
                        <div
                          className={`p-4 border rounded-lg flex items-start gap-4 cursor-pointer transition-all hover:border-primary/50 ${
                            selectedOption === option.id ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => setSelectedOption(option.id)}
                        >
                          <div className="mt-1 text-primary">{option.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-medium">{option.title}</h3>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                          <div className="font-medium">{formatPrice(option.basePrice)}</div>
                        </div>
                      </FadeIn>
                    ))}
                  </FadeInStagger>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {selectedOption && (
            <>
              <FadeIn>
                <Card>
                  <CardHeader>
                    <CardTitle>{t("price_calculator.complexity")}</CardTitle>
                    <CardDescription>
                      {t("price_calculator.complexity_desc")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>{t("price_calculator.basic")}</span>
                        <span>{complexity[0]}%</span>
                        <span>{t("price_calculator.complex")}</span>
                      </div>
                      <Slider
                        value={complexity}
                        onValueChange={setComplexity}
                        max={100}
                        step={10}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn>
                <Card>
                  <CardHeader>
                    <CardTitle>{t("price_calculator.timeframe")}</CardTitle>
                    <CardDescription>
                      {t("price_calculator.timeframe_desc")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={timeFrame}
                      onValueChange={setTimeFrame}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={locale === "en" ? "Select time frame" : "Zaman çerçevesi seçin"} />
                      </SelectTrigger>
                      <SelectContent>
                        {timeFrames.map((tf) => (
                          <SelectItem key={tf.id} value={tf.id}>
                            <div className="flex items-center gap-2">
                              <Clock className="size-4" />
                              <span>{locale === "en" ? tf.title : tf.title}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn>
                <Card>
                  <CardHeader>
                    <CardTitle>{t("price_calculator.additional")}</CardTitle>
                    <CardDescription>
                      {t("price_calculator.additional_desc")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {additionalFeatures.map((feature) => (
                        <div
                          key={feature.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={feature.id}
                            checked={selectedFeatures.includes(feature.id)}
                            onCheckedChange={() => handleFeatureToggle(feature.id)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor={feature.id}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              {feature.icon}
                              <span>{feature.title}</span>
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(feature.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Label htmlFor="custom-features" className="mb-2 block">
                        {t("price_calculator.custom_requirements")}
                      </Label>
                      <Input
                        id="custom-features"
                        placeholder={t("price_calculator.custom_requirements_placeholder")}
                        value={customFeatures}
                        onChange={(e) => setCustomFeatures(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </>
          )}
        </div>

        {/* Summary Side - Sticky */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <Card className="border-primary/20">
              <CardHeader className="bg-primary-foreground border-b">
                <CardTitle>{t("price_calculator.estimate")}</CardTitle>
                <CardDescription>
                  {t("price_calculator.estimate_desc")}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {selectedOption ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">{t("price_calculator.selected")}</h3>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {getOptions().find((opt) => opt.id === selectedOption)?.title}
                        </span>
                        <span>{formatPrice(priceBreakdown.baseService || 0)}</span>
                      </div>
                    </div>

                    {priceBreakdown.timeFrame > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-medium">{t("price_calculator.timeframe")}</h3>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {timeFrames.find((tf) => tf.id === timeFrame)?.title}
                          </span>
                          <span>+{formatPrice(priceBreakdown.timeFrame || 0)}</span>
                        </div>
                      </div>
                    )}

                    {selectedFeatures.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-medium">{t("price_calculator.additional")}</h3>
                        {selectedFeatures.map((featureId) => {
                          const feature = additionalFeatures.find((f) => f.id === featureId);
                          return (
                            <div key={featureId} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {feature?.title}
                              </span>
                              <span>+{formatPrice(feature?.price || 0)}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <div className="flex justify-between font-medium">
                        <span>{t("price_calculator.estimated_total")}</span>
                        <span className="text-lg">{formatPrice(totalPrice)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("price_calculator.disclaimer")}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleSubmitRequest}
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? t("price_calculator.contact.submitting")
                          : t("price_calculator.request_quote")}
                      </Button>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4" />
                        <span>
                          {t("price_calculator.free_consultation")}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                      <Cpu className="size-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">
                      {t("price_calculator.select_service")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("price_calculator.select_service_desc")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}