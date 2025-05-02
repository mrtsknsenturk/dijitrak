// Key-value pairs for translations
type LanguageData = {
  [key: string]: string;
};

// Translation data for each language
export type TranslationsData = {
  [locale: string]: LanguageData;
};

// Translation data structure
export const translations: TranslationsData = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact",
    "nav.getInTouch": "Get in Touch",
    
    // Hero Section
    "hero.title": "Digital Solutions for the Future of Your Business",
    "hero.subtitle": "We design and develop innovative digital experiences that help businesses grow, engage, and transform.",
    "hero.cta": "Explore Services",
    "hero.stats.clients": "Happy Clients",
    "hero.stats.projects": "Projects Completed",
    "hero.stats.experience": "Years of Experience",
    
    // Services Section
    "services.title": "Our Services",
    "services.subtitle": "We offer a comprehensive range of digital services to help your business thrive in the digital world.",
    "services.webDev.title": "Web Development",
    "services.webDev.description": "Custom website development with responsive design, optimized performance, and seamless user experience.",
    "services.mobileDev.title": "Mobile Apps",
    "services.mobileDev.description": "Native and cross-platform mobile applications that provide exceptional user experience across all devices.",
    "services.uxDesign.title": "UX/UI Design",
    "services.uxDesign.description": "User-centered design solutions that enhance brand identity, usability, and user engagement.",
    "services.branding.title": "Branding",
    "services.branding.description": "Brand strategy, visual identity, and marketing materials that communicate your brand's values and mission.",
    "services.digitalMarketing.title": "Digital Marketing",
    "services.digitalMarketing.description": "Results-driven digital marketing strategies that increase visibility, traffic, and conversions.",
    "services.ecommerce.title": "E-commerce",
    "services.ecommerce.description": "Custom e-commerce solutions with secure payment gateways, inventory management, and smooth checkout experience.",
    "services.seo.title": "SEO Optimization",
    "services.seo.description": "Search engine optimization strategies that improve your website's visibility and organic search rankings.",
    "services.contentCreation.title": "Content Creation",
    "services.contentCreation.description": "High-quality content for websites, blogs, social media, and marketing campaigns.",
    "services.cloudServices.title": "Cloud Services",
    "services.cloudServices.description": "Cloud architecture, migration, and management services for scalable and secure infrastructure.",
    
    // Portfolio Section
    "portfolio.title": "Our Portfolio",
    "portfolio.subtitle": "Explore our most recent work and see how we've helped businesses achieve their digital goals.",
    "portfolio.filter.all": "All",
    "portfolio.filter.webDesign": "Web Design",
    "portfolio.filter.mobileApps": "Mobile Apps",
    "portfolio.filter.branding": "Branding",
    "portfolio.viewProject": "View Project",
    
    // Stats Section
    "stats.title": "Our Numbers",
    "stats.subtitle": "We take pride in our achievements and the impact we've made for businesses worldwide.",
    "stats.clients": "Happy Clients",
    "stats.projects": "Projects Completed",
    "stats.team": "Team Members",
    "stats.satisfaction": "Customer Satisfaction",
    
    // Testimonial Section
    "testimonials.title": "What Our Clients Say",
    "testimonials.subtitle": "Don't just take our word for it — hear from some of our satisfied clients about their experiences working with us.",
    
    // CTA Section
    "cta.title": "Ready to Transform Your Business?",
    "cta.subtitle": "Let's work together to bring your vision to life. Start by telling us about your project.",
    "cta.button.freelancer": "Join as Freelancer",
    "cta.button.project": "Start a Project",
    
    // Contact Section
    "contact.title": "Get In Touch",
    "contact.subtitle": "Have a project in mind or want to learn more about our services? Reach out to us directly using the form below.",
    "contact.location.title": "Our Location",
    "contact.email.title": "Email Us",
    "contact.phone.title": "Call Us",
    "contact.hours.title": "Working Hours",
    "contact.hours.weekdays": "Monday - Friday:",
    "contact.hours.saturday": "Saturday:",
    "contact.hours.sunday": "Sunday:",
    "contact.form.title": "Send Us a Message",
    "contact.form.name": "Your Name",
    "contact.form.email": "Your Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Your Message",
    "contact.form.button.send": "Send Message",
    "contact.form.button.sending": "Sending...",
    "contact.form.button.sent": "Message Sent!",
    
    // Footer
    "footer.rights": "All Rights Reserved",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    
    // Project Modal
    "project.form.title": "Start Your Project",
    "project.form.subtitle": "Tell us about your project and we'll get back to you within 24 hours.",
    "project.form.name": "Your Name",
    "project.form.email": "Your Email",
    "project.form.phone": "Phone Number",
    "project.form.company": "Company Name (Optional)",
    "project.form.budget": "Estimated Budget",
    "project.form.type": "Project Type",
    "project.form.description": "Project Description",
    "project.form.button.submit": "Submit Project",
    "project.form.button.submitting": "Submitting...",
    "project.form.success": "Your project request has been submitted successfully!",
    
    // Freelancer Modal
    "freelancer.form.title": "Join Our Freelancer Network",
    "freelancer.form.subtitle": "Fill out the form below to apply as a freelancer.",
    "freelancer.form.name": "Your Full Name",
    "freelancer.form.email": "Email Address",
    "freelancer.form.phone": "Phone Number",
    "freelancer.form.skills": "Skills & Expertise",
    "freelancer.form.experience": "Years of Experience",
    "freelancer.form.portfolio": "Portfolio URL",
    "freelancer.form.rate": "Hourly Rate (USD)",
    "freelancer.form.availability": "Availability",
    "freelancer.form.button.submit": "Submit Application",
    "freelancer.form.button.submitting": "Submitting...",
    "freelancer.form.success": "Your application has been submitted successfully!",
    
    // Search
    "search.placeholder": "Search projects...",
    "search.button": "Search",
    "search.results": "Search Results",
    "search.noResults": "No results found for",
    
    // Language Switcher
    "language.en": "English",
    "language.tr": "Turkish",
  },
  tr: {
    // Navbar
    "nav.home": "Ana Sayfa",
    "nav.services": "Hizmetler",
    "nav.portfolio": "Portföy",
    "nav.testimonials": "Müşteri Yorumları",
    "nav.contact": "İletişim",
    "nav.getInTouch": "Bize Ulaşın",
    
    // Hero Section
    "hero.title": "İşletmenizin Geleceği İçin Dijital Çözümler",
    "hero.subtitle": "İşletmelerin büyümesine, etkileşim kurmasına ve dönüşmesine yardımcı olan yenilikçi dijital deneyimler tasarlıyor ve geliştiriyoruz.",
    "hero.cta": "Hizmetleri Keşfet",
    "hero.stats.clients": "Mutlu Müşteri",
    "hero.stats.projects": "Tamamlanan Proje",
    "hero.stats.experience": "Yıllık Deneyim",
    
    // Services Section
    "services.title": "Hizmetlerimiz",
    "services.subtitle": "İşletmenizin dijital dünyada başarılı olması için kapsamlı bir dizi dijital hizmet sunuyoruz.",
    "services.webDev.title": "Web Geliştirme",
    "services.webDev.description": "Duyarlı tasarım, optimize edilmiş performans ve sorunsuz kullanıcı deneyimi ile özel web sitesi geliştirme.",
    "services.mobileDev.title": "Mobil Uygulamalar",
    "services.mobileDev.description": "Tüm cihazlarda olağanüstü kullanıcı deneyimi sunan yerel ve çapraz platform mobil uygulamalar.",
    "services.uxDesign.title": "UX/UI Tasarım",
    "services.uxDesign.description": "Marka kimliğini, kullanılabilirliği ve kullanıcı etkileşimini geliştiren kullanıcı odaklı tasarım çözümleri.",
    "services.branding.title": "Markalaşma",
    "services.branding.description": "Markanızın değerlerini ve misyonunu ileten marka stratejisi, görsel kimlik ve pazarlama materyalleri.",
    "services.digitalMarketing.title": "Dijital Pazarlama",
    "services.digitalMarketing.description": "Görünürlüğü, trafiği ve dönüşümleri artıran sonuç odaklı dijital pazarlama stratejileri.",
    "services.ecommerce.title": "E-ticaret",
    "services.ecommerce.description": "Güvenli ödeme sistemleri, envanter yönetimi ve sorunsuz ödeme deneyimi ile özel e-ticaret çözümleri.",
    "services.seo.title": "SEO Optimizasyonu",
    "services.seo.description": "Web sitenizin görünürlüğünü ve organik arama sıralamalarını iyileştiren arama motoru optimizasyon stratejileri.",
    "services.contentCreation.title": "İçerik Oluşturma",
    "services.contentCreation.description": "Web siteleri, bloglar, sosyal medya ve pazarlama kampanyaları için yüksek kaliteli içerik.",
    "services.cloudServices.title": "Bulut Hizmetleri",
    "services.cloudServices.description": "Ölçeklenebilir ve güvenli altyapı için bulut mimarisi, geçiş ve yönetim hizmetleri.",
    
    // Portfolio Section
    "portfolio.title": "Portföyümüz",
    "portfolio.subtitle": "En son çalışmalarımızı keşfedin ve işletmelerin dijital hedeflerine ulaşmalarına nasıl yardımcı olduğumuzu görün.",
    "portfolio.filter.all": "Tümü",
    "portfolio.filter.webDesign": "Web Tasarım",
    "portfolio.filter.mobileApps": "Mobil Uygulamalar",
    "portfolio.filter.branding": "Markalaşma",
    "portfolio.viewProject": "Projeyi Görüntüle",
    
    // Stats Section
    "stats.title": "Rakamlarla Biz",
    "stats.subtitle": "Başarılarımızla ve dünya çapındaki işletmeler üzerinde yarattığımız etkiyle gurur duyuyoruz.",
    "stats.clients": "Mutlu Müşteri",
    "stats.projects": "Tamamlanan Proje",
    "stats.team": "Ekip Üyesi",
    "stats.satisfaction": "Müşteri Memnuniyeti",
    
    // Testimonial Section
    "testimonials.title": "Müşterilerimiz Ne Diyor",
    "testimonials.subtitle": "Sadece bizim sözümüzü dinlemeyin — memnun müşterilerimizden bazılarının bizimle çalışma deneyimleri hakkında bilgi edinin.",
    
    // CTA Section
    "cta.title": "İşletmenizi Dönüştürmeye Hazır mısınız?",
    "cta.subtitle": "Vizyonunuzu hayata geçirmek için birlikte çalışalım. Projenizi anlatarak başlayın.",
    "cta.button.freelancer": "Freelancer Olarak Katıl",
    "cta.button.project": "Bir Proje Başlat",
    
    // Contact Section
    "contact.title": "Bize Ulaşın",
    "contact.subtitle": "Aklınızda bir proje mi var veya hizmetlerimiz hakkında daha fazla bilgi mi edinmek istiyorsunuz? Aşağıdaki formu kullanarak doğrudan bize ulaşın.",
    "contact.location.title": "Konumumuz",
    "contact.email.title": "E-posta",
    "contact.phone.title": "Telefon",
    "contact.hours.title": "Çalışma Saatleri",
    "contact.hours.weekdays": "Pazartesi - Cuma:",
    "contact.hours.saturday": "Cumartesi:",
    "contact.hours.sunday": "Pazar:",
    "contact.form.title": "Bize Mesaj Gönderin",
    "contact.form.name": "Adınız",
    "contact.form.email": "E-posta Adresiniz",
    "contact.form.subject": "Konu",
    "contact.form.message": "Mesajınız",
    "contact.form.button.send": "Mesaj Gönder",
    "contact.form.button.sending": "Gönderiliyor...",
    "contact.form.button.sent": "Mesaj Gönderildi!",
    
    // Footer
    "footer.rights": "Tüm Hakları Saklıdır",
    "footer.privacy": "Gizlilik Politikası",
    "footer.terms": "Kullanım Koşulları",
    
    // Project Modal
    "project.form.title": "Projenizi Başlatın",
    "project.form.subtitle": "Projeniz hakkında bilgi verin, 24 saat içinde size geri döneceğiz.",
    "project.form.name": "Adınız",
    "project.form.email": "E-posta Adresiniz",
    "project.form.phone": "Telefon Numarası",
    "project.form.company": "Şirket Adı (İsteğe Bağlı)",
    "project.form.budget": "Tahmini Bütçe",
    "project.form.type": "Proje Türü",
    "project.form.description": "Proje Açıklaması",
    "project.form.button.submit": "Projeyi Gönder",
    "project.form.button.submitting": "Gönderiliyor...",
    "project.form.success": "Proje talebiniz başarıyla gönderildi!",
    
    // Freelancer Modal
    "freelancer.form.title": "Freelancer Ağımıza Katılın",
    "freelancer.form.subtitle": "Freelancer olarak başvurmak için aşağıdaki formu doldurun.",
    "freelancer.form.name": "Tam Adınız",
    "freelancer.form.email": "E-posta Adresi",
    "freelancer.form.phone": "Telefon Numarası",
    "freelancer.form.skills": "Yetenekler ve Uzmanlık",
    "freelancer.form.experience": "Deneyim Yılı",
    "freelancer.form.portfolio": "Portfolyo URL",
    "freelancer.form.rate": "Saatlik Ücret (USD)",
    "freelancer.form.availability": "Uygunluk",
    "freelancer.form.button.submit": "Başvuruyu Gönder",
    "freelancer.form.button.submitting": "Gönderiliyor...",
    "freelancer.form.success": "Başvurunuz başarıyla gönderildi!",
    
    // Search
    "search.placeholder": "Projeleri ara...",
    "search.button": "Ara",
    "search.results": "Arama Sonuçları",
    "search.noResults": "Için sonuç bulunamadı",
    
    // Language Switcher
    "language.en": "İngilizce",
    "language.tr": "Türkçe",
  }
};