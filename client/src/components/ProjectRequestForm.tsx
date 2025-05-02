import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface ProjectRequestFormProps {
  onClose?: () => void;
}

export default function ProjectRequestForm({ onClose }: ProjectRequestFormProps) {
  const { locale, t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    companyName: "",
    projectName: "",
    projectType: "web-app",
    projectDescription: "",
    budget: "medium",
    timeline: "1-3-months"
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.clientEmail || !formData.projectName || !formData.projectDescription) {
      toast({
        title: locale === "en" ? "Required Fields Missing" : "Gerekli Alanlar Eksik",
        description: locale === "en" 
          ? "Please fill in all required fields" 
          : "Lütfen tüm gerekli alanları doldurun",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await apiRequest("POST", "/api/project-requests", formData);
      
      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: locale === "en" ? "Request Submitted" : "Talep Gönderildi",
          description: locale === "en" 
            ? "Your project request has been submitted successfully" 
            : "Proje talebiniz başarıyla gönderildi"
        });
        
        // Reset form after 3 seconds if modal is not closed
        setTimeout(() => {
          if (!onClose) {
            setIsSuccess(false);
            setFormData({
              clientName: "",
              clientEmail: "",
              clientPhone: "",
              companyName: "",
              projectName: "",
              projectType: "web-app",
              projectDescription: "",
              budget: "medium",
              timeline: "1-3-months"
            });
          } else {
            onClose();
          }
        }, 3000);
      } else {
        toast({
          title: locale === "en" ? "Error" : "Hata",
          description: locale === "en" 
            ? "Failed to submit your request. Please try again." 
            : "Talebiniz gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error submitting project request:", error);
      toast({
        title: locale === "en" ? "Error" : "Hata",
        description: locale === "en" 
          ? "Failed to submit your request. Please try again." 
          : "Talebiniz gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSuccess) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {locale === "en" ? "Request Submitted" : "Talep Gönderildi"}
            </h3>
            <p className="text-muted-foreground">
              {locale === "en" 
                ? "Thank you! We'll get back to you shortly." 
                : "Teşekkürler! En kısa sürede size geri döneceğiz."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {locale === "en" ? "Project Request Form" : "Proje Talep Formu"}
        </CardTitle>
        <CardDescription>
          {locale === "en" 
            ? "Fill in the details below and we'll get back to you with a project estimate" 
            : "Aşağıdaki ayrıntıları doldurun ve size bir proje tahmini ile geri döneceğiz"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">
                {locale === "en" ? "Your Name" : "Adınız"} *
              </Label>
              <Input
                id="clientName"
                name="clientName"
                placeholder={locale === "en" ? "John Doe" : "Ahmet Yılmaz"}
                value={formData.clientName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">
                {locale === "en" ? "Email" : "E-posta"} *
              </Label>
              <Input
                id="clientEmail"
                name="clientEmail"
                type="email"
                placeholder={locale === "en" ? "john@example.com" : "ahmet@ornek.com"}
                value={formData.clientEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientPhone">
                {locale === "en" ? "Phone (optional)" : "Telefon (isteğe bağlı)"}
              </Label>
              <Input
                id="clientPhone"
                name="clientPhone"
                placeholder={locale === "en" ? "+1 234 567 8900" : "+90 555 123 4567"}
                value={formData.clientPhone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">
                {locale === "en" ? "Company Name (optional)" : "Şirket Adı (isteğe bağlı)"}
              </Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder={locale === "en" ? "Acme Inc." : "ABC Ltd. Şti."}
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectName">
              {locale === "en" ? "Project Name" : "Proje Adı"} *
            </Label>
            <Input
              id="projectName"
              name="projectName"
              placeholder={locale === "en" ? "My Awesome Website" : "Harika Web Sitem"}
              value={formData.projectName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectType">
                {locale === "en" ? "Project Type" : "Proje Türü"} *
              </Label>
              <Select
                value={formData.projectType}
                onValueChange={(value) => handleSelectChange("projectType", value)}
              >
                <SelectTrigger id="projectType">
                  <SelectValue placeholder={locale === "en" ? "Select project type" : "Proje türü seçin"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-app">
                    {locale === "en" ? "Web Application" : "Web Uygulaması"}
                  </SelectItem>
                  <SelectItem value="mobile-app">
                    {locale === "en" ? "Mobile Application" : "Mobil Uygulama"}
                  </SelectItem>
                  <SelectItem value="e-commerce">
                    {locale === "en" ? "E-commerce Website" : "E-ticaret Sitesi"}
                  </SelectItem>
                  <SelectItem value="corporate-website">
                    {locale === "en" ? "Corporate Website" : "Kurumsal Web Sitesi"}
                  </SelectItem>
                  <SelectItem value="other">
                    {locale === "en" ? "Other" : "Diğer"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">
                {locale === "en" ? "Budget Range" : "Bütçe Aralığı"} *
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => handleSelectChange("budget", value)}
              >
                <SelectTrigger id="budget">
                  <SelectValue placeholder={locale === "en" ? "Select budget range" : "Bütçe aralığı seçin"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    {locale === "en" ? "$1K - $5K" : "₺30K - ₺150K"}
                  </SelectItem>
                  <SelectItem value="medium">
                    {locale === "en" ? "$5K - $15K" : "₺150K - ₺450K"}
                  </SelectItem>
                  <SelectItem value="large">
                    {locale === "en" ? "$15K - $50K" : "₺450K - ₺1.5M"}
                  </SelectItem>
                  <SelectItem value="enterprise">
                    {locale === "en" ? "$50K+" : "₺1.5M+"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeline">
                {locale === "en" ? "Project Timeline" : "Proje Zaman Çizelgesi"} *
              </Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => handleSelectChange("timeline", value)}
              >
                <SelectTrigger id="timeline">
                  <SelectValue placeholder={locale === "en" ? "Select timeline" : "Zaman çizelgesi seçin"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-1-month">
                    {locale === "en" ? "Less than 1 month" : "1 aydan az"}
                  </SelectItem>
                  <SelectItem value="1-3-months">
                    {locale === "en" ? "1-3 months" : "1-3 ay"}
                  </SelectItem>
                  <SelectItem value="3-6-months">
                    {locale === "en" ? "3-6 months" : "3-6 ay"}
                  </SelectItem>
                  <SelectItem value="6-plus-months">
                    {locale === "en" ? "6+ months" : "6+ ay"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="projectDescription">
                {locale === "en" ? "Project Description" : "Proje Açıklaması"} *
              </Label>
              <Textarea
                id="projectDescription"
                name="projectDescription"
                placeholder={locale === "en" 
                  ? "Please describe your project in detail..." 
                  : "Lütfen projenizi detaylı olarak açıklayın..."}
                rows={5}
                value={formData.projectDescription}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              {locale === "en" ? "Cancel" : "İptal"}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting 
              ? (locale === "en" ? "Submitting..." : "Gönderiliyor...") 
              : (locale === "en" ? "Submit Project Request" : "Proje Talebini Gönder")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}