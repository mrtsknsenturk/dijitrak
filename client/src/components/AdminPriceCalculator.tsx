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
import { CheckCircle2, Shield, Clock, Cpu, BrainCircuit, LineChart, Database, Code, PaintBucket, Globe } from "lucide-react";
import { MotionDiv, FadeIn, FadeInStagger } from "@/components/ui/motion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

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
    id: "web-app",
    title: "Web Application",
    description: "Custom web applications with interactive features",
    icon: <Code className="size-5" />,
    basePrice: 5000,
    priceMultiplier: 1.0
  },
  {
    id: "e-commerce",
    title: "E-Commerce",
    description: "Online store with payment processing",
    icon: <ShoppingCart className="size-5" />,
    basePrice: 7000,
    priceMultiplier: 1.2
  },
  {
    id: "landing-page",
    title: "Landing Page",
    description: "High-conversion single page website",
    icon: <Rocket className="size-5" />,
    basePrice: 2500,
    priceMultiplier: 0.8
  }
];

const mobileOptions: PricingOption[] = [
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "Native mobile applications for iOS and Android",
    icon: <SmartphoneIcon className="size-5" />,
    basePrice: 8000,
    priceMultiplier: 1.3
  },
  {
    id: "cross-platform",
    title: "Cross-Platform",
    description: "Apps that work on multiple platforms",
    icon: <AppleIcon className="size-5" />,
    basePrice: 7000,
    priceMultiplier: 1.1
  },
  {
    id: "app-redesign",
    title: "App Redesign",
    description: "Modernize and improve existing mobile apps",
    icon: <PaintBucket className="size-5" />,
    basePrice: 4500, 
    priceMultiplier: 0.9
  }
];

const marketingOptions: PricingOption[] = [
  {
    id: "seo",
    title: "SEO Optimization",
    description: "Improve search engine rankings",
    icon: <Search className="size-5" />,
    basePrice: 1800,
    priceMultiplier: 0.7
  },
  {
    id: "content",
    title: "Content Creation",
    description: "Blog posts, articles, and social media content",
    icon: <Layers className="size-5" />,
    basePrice: 2200,
    priceMultiplier: 0.75
  },
  {
    id: "analytics",
    title: "Analytics Setup",
    description: "Track and analyze user behavior",
    icon: <LineChart className="size-5" />,
    basePrice: 1500,
    priceMultiplier: 0.65
  }
];

const designOptions: PricingOption[] = [
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "User interface and experience design",
    icon: <Palette className="size-5" />,
    basePrice: 3500,
    priceMultiplier: 0.85
  },
  {
    id: "branding",
    title: "Branding",
    description: "Logo, color scheme, and brand identity",
    icon: <Play className="size-5" />,
    basePrice: 3000,
    priceMultiplier: 0.8
  },
  {
    id: "prototypes",
    title: "Prototypes",
    description: "Interactive prototypes for testing",
    icon: <Wrench className="size-5" />,
    basePrice: 2800,
    priceMultiplier: 0.75
  }
];

// Time frames with multipliers
const timeFrames: TimeFrame[] = [
  {
    id: "standard",
    title: "Standard (2-3 months)",
    multiplier: 1.0
  },
  {
    id: "accelerated",
    title: "Accelerated (1-2 months)",
    multiplier: 1.3
  },
  {
    id: "rush",
    title: "Rush (2-4 weeks)",
    multiplier: 1.6
  }
];

// Complexity levels with multipliers
const complexityLevels = [
  { id: "basic", title: "Basic", multiplier: 0.8 },
  { id: "standard", title: "Standard", multiplier: 1.0 },
  { id: "advanced", title: "Advanced", multiplier: 1.5 },
  { id: "complex", title: "Complex", multiplier: 2.0 }
];

// Feature options
const featureOptions = {
  "web-app": [
    { id: "auth_system", title: "Authentication System", price: 1200 },
    { id: "payment_integration", title: "Payment Integration", price: 1500 },
    { id: "admin_dashboard", title: "Admin Dashboard", price: 2000 },
    { id: "api_integration", title: "Third-party API Integration", price: 1000 },
    { id: "search_functionality", title: "Advanced Search", price: 800 }
  ],
  "e-commerce": [
    { id: "product_management", title: "Product Management System", price: 1800 },
    { id: "inventory_tracking", title: "Inventory Tracking", price: 1200 },
    { id: "discount_system", title: "Discount & Coupon System", price: 1000 },
    { id: "multi_currency", title: "Multi-Currency Support", price: 1500 },
    { id: "shipping_integration", title: "Shipping Integration", price: 1300 }
  ],
  "mobile-app": [
    { id: "offline_mode", title: "Offline Mode", price: 1500 },
    { id: "push_notifications", title: "Push Notifications", price: 1000 },
    { id: "biometric_auth", title: "Biometric Authentication", price: 1200 },
    { id: "camera_integration", title: "Camera Integration", price: 900 },
    { id: "location_services", title: "Location Services", price: 1100 }
  ],
  "cross-platform": [
    { id: "web_version", title: "Web Version Included", price: 2000 },
    { id: "native_components", title: "Native UI Components", price: 1500 },
    { id: "cross_device_sync", title: "Cross-Device Sync", price: 1700 },
    { id: "deep_linking", title: "Deep Linking", price: 800 },
    { id: "tablet_optimization", title: "Tablet Optimization", price: 1200 }
  ],
  "ui-ux": [
    { id: "interaction_design", title: "Interaction Design", price: 1200 },
    { id: "user_testing", title: "User Testing", price: 1500 },
    { id: "design_system", title: "Complete Design System", price: 2000 },
    { id: "motion_design", title: "Motion Design", price: 1300 },
    { id: "accessibility", title: "Accessibility Optimization", price: 1000 }
  ]
};

// SVG Icons
function ShoppingCart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="8" cy="21" r="1"/>
      <circle cx="19" cy="21" r="1"/>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
  );
}

function Rocket(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  );
}

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/>
      <path d="M10 2c1 .5 2 2 2 5"/>
    </svg>
  );
}

function SmartphoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
      <path d="M12 18h.01"/>
    </svg>
  );
}

function Layers(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
      <path d="m22 12.18-8.58 3.91a2 2 0 0 1-1.66 0L2.6 12.18"/>
      <path d="m22 16.18-8.58 3.91a2 2 0 0 1-1.66 0L2.6 16.18"/>
    </svg>
  );
}

function Palette(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="13.5" cy="6.5" r=".5"/>
      <circle cx="17.5" cy="10.5" r=".5"/>
      <circle cx="8.5" cy="7.5" r=".5"/>
      <circle cx="6.5" cy="12.5" r=".5"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  );
}

function Play(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="6 3 20 12 6 21 6 3"/>
    </svg>
  );
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  );
}

function Wrench(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}

interface AdminPriceCalculatorProps {
  onSubmit?: (calculatedData: any) => void;
  standalone?: boolean;
}

export default function AdminPriceCalculator({ onSubmit, standalone = true }: AdminPriceCalculatorProps) {
  const { locale, t } = useLanguage();
  const { toast } = useToast();
  
  // States for calculator
  const [selectedTab, setSelectedTab] = useState<string>("web");
  const [selectedService, setSelectedService] = useState<PricingOption | null>(null);
  const [complexity, setComplexity] = useState("standard");
  const [timeFrame, setTimeFrame] = useState("standard");
  const [selectedFeatures, setSelectedFeatures] = useState<{ [key: string]: boolean }>({});
  
  // Client contact information
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: ""
  });

  // Calculate the total price based on selections
  const calculatePrice = () => {
    if (!selectedService) return 0;
    
    // Get base price from selected service
    let price = selectedService.basePrice;
    
    // Apply complexity multiplier
    const complexityMultiplier = complexityLevels.find(c => c.id === complexity)?.multiplier || 1;
    price = price * complexityMultiplier;
    
    // Apply time frame multiplier
    const timeFrameMultiplier = timeFrames.find(t => t.id === timeFrame)?.multiplier || 1;
    price = price * timeFrameMultiplier;
    
    // Add costs of selected features
    const serviceFeatures = featureOptions[selectedService.id as keyof typeof featureOptions] || [];
    serviceFeatures.forEach(feature => {
      if (selectedFeatures[feature.id]) {
        price += feature.price;
      }
    });
    
    return Math.round(price);
  };
  
  const totalPrice = calculatePrice();
  
  // Format price based on language
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
      style: "currency",
      currency: locale === "tr" ? "TRY" : "USD",
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Reset feature selections when service changes
  useEffect(() => {
    setSelectedFeatures({});
  }, [selectedService]);
  
  // Submit form
  const handleSubmit = async () => {
    if (!selectedService) {
      toast({
        title: locale === "en" ? "Select a service" : "Bir hizmet seçin",
        description: locale === "en" ? "Please select a service to continue" : "Devam etmek için lütfen bir hizmet seçin",
        variant: "destructive"
      });
      return;
    }
    
    if (!clientInfo.name || !clientInfo.email) {
      toast({
        title: locale === "en" ? "Required information missing" : "Gerekli bilgiler eksik",
        description: locale === "en" ? "Please provide your name and email" : "Lütfen adınızı ve e-posta adresinizi girin",
        variant: "destructive"
      });
      return;
    }
    
    const requestData = {
      name: clientInfo.name,
      email: clientInfo.email,
      phone: clientInfo.phone || null,
      company: clientInfo.company || null,
      serviceType: selectedService.id,
      complexity: complexity,
      timeline: timeFrame,
      estimatedPrice: totalPrice,
      features: selectedFeatures,
      notes: clientInfo.notes || null,
      status: "pending"
    };
    
    try {
      if (onSubmit) {
        // If used as a component with submit handler
        onSubmit(requestData);
        
        toast({
          title: locale === "en" ? "Request submitted" : "Talep gönderildi",
          description: locale === "en" ? "Your pricing request has been submitted" : "Fiyatlandırma talebiniz gönderildi"
        });
        
        // Reset form
        setSelectedService(null);
        setComplexity("standard");
        setTimeFrame("standard");
        setSelectedFeatures({});
        setClientInfo({
          name: "",
          email: "",
          phone: "",
          company: "",
          notes: ""
        });
      } else {
        // Send to API directly if used standalone
        const response = await apiRequest("POST", "/api/price-calculator-requests", requestData);
        
        if (response.ok) {
          toast({
            title: locale === "en" ? "Request submitted" : "Talep gönderildi",
            description: locale === "en" ? "Your pricing request has been submitted" : "Fiyatlandırma talebiniz gönderildi"
          });
          
          // Reset form
          setSelectedService(null);
          setComplexity("standard");
          setTimeFrame("standard");
          setSelectedFeatures({});
          setClientInfo({
            name: "",
            email: "",
            phone: "",
            company: "",
            notes: ""
          });
        } else {
          toast({
            title: locale === "en" ? "Error" : "Hata",
            description: locale === "en" ? "Failed to submit your request. Please try again." : "Talebiniz gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: locale === "en" ? "Error" : "Hata",
        description: locale === "en" ? "Failed to submit your request. Please try again." : "Talebiniz gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
      console.error("Error submitting price calculator request:", error);
    }
  };

  // Get service options based on tab
  const getServiceOptions = () => {
    switch (selectedTab) {
      case "web":
        return webOptions;
      case "mobile":
        return mobileOptions;
      case "marketing":
        return marketingOptions;
      case "design":
        return designOptions;
      default:
        return webOptions;
    }
  };

  // Custom container class depending on whether it's standalone
  const containerClass = standalone ? 
    "container mx-auto py-16 px-4 md:px-6" : 
    "w-full";
  
  return (
    <div className={containerClass}>
      <div className="max-w-6xl mx-auto">
        {standalone && (
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">
              {locale === "en" ? "Interactive Pricing Calculator" : "İnteraktif Fiyatlandırma Hesaplayıcı"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {locale === "en" 
                ? "Get an instant estimate for your digital project. Select options below to calculate approximate pricing." 
                : "Dijital projeniz için anında bir tahmin alın. Yaklaşık fiyatlandırmayı hesaplamak için aşağıdaki seçenekleri belirleyin."}
            </p>
          </div>
        )}
        
        <div className="grid md:grid-cols-[1fr_380px] gap-6">
          <div className="order-2 md:order-1">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid grid-cols-4 md:grid-cols-4 mb-8">
                <TabsTrigger value="web">
                  <Globe className="size-4 mr-2 md:mr-3" />
                  <span className="hidden md:inline">Web</span>
                </TabsTrigger>
                <TabsTrigger value="mobile">
                  <SmartphoneIcon className="size-4 mr-2 md:mr-3" />
                  <span className="hidden md:inline">Mobile</span>
                </TabsTrigger>
                <TabsTrigger value="marketing">
                  <LineChart className="size-4 mr-2 md:mr-3" />
                  <span className="hidden md:inline">Marketing</span>
                </TabsTrigger>
                <TabsTrigger value="design">
                  <Palette className="size-4 mr-2 md:mr-3" />
                  <span className="hidden md:inline">Design</span>
                </TabsTrigger>
              </TabsList>
              
              <FadeInStagger>
                <div className="grid md:grid-cols-3 gap-4">
                  {getServiceOptions().map((option) => (
                    <FadeIn key={option.id}>
                      <Card 
                        className={`cursor-pointer transition-all hover:border-primary ${selectedService?.id === option.id ? 'border-primary ring-1 ring-primary' : ''}`}
                        onClick={() => setSelectedService(option)}
                      >
                        <CardHeader>
                          <div className={`w-10 h-10 rounded-md flex items-center justify-center bg-primary/10 text-primary mb-3`}>
                            {option.icon}
                          </div>
                          <CardTitle>{locale === "en" ? option.title : option.title}</CardTitle>
                          <CardDescription>
                            {locale === "en" ? option.description : option.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm">
                            {locale === "en" ? "Starting from " : "Başlangıç fiyatı "}
                            <span className="font-medium">{formatPrice(option.basePrice)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </FadeIn>
                  ))}
                </div>
              </FadeInStagger>
              
              {selectedService && (
                <div className="mt-8 space-y-6">
                  <FadeIn>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {locale === "en" ? "Project Complexity" : "Proje Karmaşıklığı"}
                        </CardTitle>
                        <CardDescription>
                          {locale === "en" 
                            ? "Select the complexity level of your project" 
                            : "Projenizin karmaşıklık düzeyini seçin"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <Slider
                            defaultValue={[2]}
                            max={4}
                            step={1}
                            value={[complexityLevels.findIndex(c => c.id === complexity) + 1]}
                            onValueChange={(value) => {
                              const index = value[0] - 1;
                              if (index >= 0 && index < complexityLevels.length) {
                                setComplexity(complexityLevels[index].id);
                              }
                            }}
                          />
                          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                            {complexityLevels.map(level => (
                              <div 
                                key={level.id}
                                className={`cursor-pointer px-1 ${complexity === level.id ? 'text-primary font-medium' : ''}`}
                                onClick={() => setComplexity(level.id)}
                              >
                                {locale === "en" ? level.title : level.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                  
                  <FadeIn>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {locale === "en" ? "Timeline" : "Zaman Çizelgesi"}
                        </CardTitle>
                        <CardDescription>
                          {locale === "en" 
                            ? "Select your preferred delivery timeline" 
                            : "Tercih ettiğiniz teslimat zaman çizelgesini seçin"}
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
                        <CardTitle>
                          {locale === "en" ? "Features" : "Özellikler"}
                        </CardTitle>
                        <CardDescription>
                          {locale === "en" 
                            ? "Select additional features for your project" 
                            : "Projeniz için ek özellikler seçin"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {(featureOptions[selectedService.id as keyof typeof featureOptions] || []).map((feature) => (
                            <div key={feature.id} className="flex items-center justify-between gap-4">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id={feature.id} 
                                  checked={selectedFeatures[feature.id] || false}
                                  onCheckedChange={(checked) => {
                                    setSelectedFeatures(prev => ({
                                      ...prev,
                                      [feature.id]: !!checked
                                    }));
                                  }}
                                />
                                <Label htmlFor={feature.id} className="cursor-pointer">
                                  {locale === "en" ? feature.title : feature.title}
                                </Label>
                              </div>
                              <div className="text-sm">
                                +{formatPrice(feature.price)}
                              </div>
                            </div>
                          ))}
                          
                          {!(featureOptions[selectedService.id as keyof typeof featureOptions] || []).length && (
                            <div className="text-center py-2 text-muted-foreground text-sm">
                              {locale === "en" 
                                ? "No additional features available for this service" 
                                : "Bu hizmet için mevcut ek özellik bulunmamaktadır"}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                  
                  <FadeIn>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {locale === "en" ? "Contact Information" : "İletişim Bilgileri"}
                        </CardTitle>
                        <CardDescription>
                          {locale === "en" 
                            ? "Provide your details to receive a custom quote" 
                            : "Özel bir teklif almak için bilgilerinizi girin"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">
                                {locale === "en" ? "Name" : "İsim"} *
                              </Label>
                              <Input 
                                id="name" 
                                placeholder={locale === "en" ? "Your name" : "İsminiz"}
                                value={clientInfo.name}
                                onChange={(e) => setClientInfo(prev => ({ ...prev, name: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">
                                {locale === "en" ? "Email" : "E-posta"} *
                              </Label>
                              <Input 
                                id="email" 
                                type="email"
                                placeholder={locale === "en" ? "Your email" : "E-posta adresiniz"}
                                value={clientInfo.email}
                                onChange={(e) => setClientInfo(prev => ({ ...prev, email: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">
                                {locale === "en" ? "Phone (optional)" : "Telefon (isteğe bağlı)"}
                              </Label>
                              <Input 
                                id="phone" 
                                placeholder={locale === "en" ? "Your phone number" : "Telefon numaranız"}
                                value={clientInfo.phone}
                                onChange={(e) => setClientInfo(prev => ({ ...prev, phone: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="company">
                                {locale === "en" ? "Company (optional)" : "Şirket (isteğe bağlı)"}
                              </Label>
                              <Input 
                                id="company" 
                                placeholder={locale === "en" ? "Your company" : "Şirketiniz"}
                                value={clientInfo.company}
                                onChange={(e) => setClientInfo(prev => ({ ...prev, company: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notes">
                              {locale === "en" ? "Additional Notes (optional)" : "Ek Notlar (isteğe bağlı)"}
                            </Label>
                            <textarea 
                              id="notes"
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder={locale === "en" ? "Share any specific requirements or questions" : "Herhangi bir özel gereksinim veya sorunuzu paylaşın"}
                              value={clientInfo.notes}
                              onChange={(e) => setClientInfo(prev => ({ ...prev, notes: e.target.value }))}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                </div>
              )}
            </Tabs>
          </div>
          
          <div className="order-1 md:order-2">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>
                  {locale === "en" ? "Project Estimate" : "Proje Tahmini"}
                </CardTitle>
                <CardDescription>
                  {locale === "en" 
                    ? "Your estimated project cost" 
                    : "Tahmini proje maliyetiniz"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedService ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between font-medium">
                      <span>{locale === "en" ? "Selected service:" : "Seçilen hizmet:"}</span>
                      <span>{locale === "en" ? selectedService.title : selectedService.title}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>{locale === "en" ? "Base price:" : "Temel fiyat:"}</span>
                      <span>{formatPrice(selectedService.basePrice)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>{locale === "en" ? "Complexity:" : "Karmaşıklık:"}</span>
                      <span>
                        {complexityLevels.find(c => c.id === complexity)?.title || "Standard"}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({complexityLevels.find(c => c.id === complexity)?.multiplier || 1}x)
                        </span>
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>{locale === "en" ? "Timeline:" : "Süre:"}</span>
                      <span>
                        {timeFrames.find(t => t.id === timeFrame)?.title || "Standard"}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({timeFrames.find(t => t.id === timeFrame)?.multiplier || 1}x)
                        </span>
                      </span>
                    </div>
                    
                    {Object.keys(selectedFeatures).some(key => selectedFeatures[key]) && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">
                          {locale === "en" ? "Selected features:" : "Seçilen özellikler:"}
                        </div>
                        {(featureOptions[selectedService.id as keyof typeof featureOptions] || [])
                          .filter(feature => selectedFeatures[feature.id])
                          .map(feature => (
                            <div key={feature.id} className="flex justify-between text-sm">
                              <span>
                                {feature?.title}
                              </span>
                              <span>+{formatPrice(feature?.price || 0)}</span>
                            </div>
                          ))}
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <div className="flex justify-between font-medium">
                        <span>{locale === "en" ? "Estimated Total" : "Tahmini Toplam"}</span>
                        <span className="text-lg">{formatPrice(totalPrice)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {locale === "en" 
                          ? "This is an estimate based on the information provided. Final pricing may vary based on detailed requirements." 
                          : "Bu, sağlanan bilgilere dayalı bir tahmindir. Nihai fiyatlandırma, detaylı gereksinimlere göre değişebilir."}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleSubmit}
                      >
                        {locale === "en" ? "Submit Request" : "Talep Gönder"}
                      </Button>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4" />
                        <span>
                          {locale === "en" 
                            ? "No commitment, free consultation" 
                            : "Taahhüt yok, ücretsiz danışma"}
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
                      {locale === "en" ? "Select a service to begin" : "Başlamak için bir hizmet seçin"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {locale === "en" 
                        ? "Choose from our service options to see pricing details" 
                        : "Fiyatlandırma detaylarını görmek için hizmet seçeneklerimizden birini seçin"}
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