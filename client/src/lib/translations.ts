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
    // Live Chat
    "chat.title": "Live Chat Support",
    "chat.typing": "Type your message...",
    "chat.closed": "Chat closed",
    "chat.closed.desc": "You can reopen the chat anytime.",
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
    "language.bg": "Bulgarian",
    "language.select": "Select language",
    
    // Process Timeline
    "process_title": "Our Development",
    "process_title_highlight": "Process",
    "process_subtitle": "We follow a structured approach to deliver exceptional results for every project.",
    "process_discovery_title": "Discovery & Research",
    "process_discovery_desc": "We begin by thoroughly understanding your business goals, target audience, and project requirements through in-depth research and analysis.",
    "process_discovery_point1": "Stakeholder interviews to understand vision and goals",
    "process_discovery_point2": "Market research and competitor analysis",
    "process_discovery_point3": "User research and persona development",
    
    "process_planning_title": "Strategy & Planning",
    "process_planning_desc": "Based on our research, we develop a comprehensive strategy and detailed project plan with clear milestones and deliverables.",
    "process_planning_point1": "Project scope definition and timeline planning",
    "process_planning_point2": "Resource allocation and team assembly",
    "process_planning_point3": "Risk assessment and mitigation planning",
    
    "process_design_title": "Design & Prototyping",
    "process_design_desc": "Our design team creates intuitive, engaging, and beautiful interfaces that align with your brand and meet user expectations.",
    "process_design_point1": "Information architecture and user flow mapping",
    "process_design_point2": "Wireframing and interactive prototyping",
    "process_design_point3": "Visual design with brand alignment",
    
    "process_development_title": "Development & Implementation",
    "process_development_desc": "Our developers bring designs to life using the latest technologies and best practices for optimal performance and reliability.",
    "process_development_point1": "Frontend and backend development",
    "process_development_point2": "Integration with third-party services and APIs",
    "process_development_point3": "Code reviews and technical optimization",
    
    "process_testing_title": "Testing & Quality Assurance",
    "process_testing_desc": "We rigorously test all aspects of your project to ensure functionality, performance, and security across all devices and platforms.",
    "process_testing_point1": "Comprehensive functional and usability testing",
    "process_testing_point2": "Cross-browser and cross-device compatibility testing",
    "process_testing_point3": "Performance optimization and security audits",
    
    "process_launch_title": "Deployment & Launch",
    "process_launch_desc": "We carefully manage the deployment process to ensure a smooth and successful launch with minimal disruption.",
    "process_launch_point1": "Pre-launch checklist and final quality assurance",
    "process_launch_point2": "Deployment to production environment",
    "process_launch_point3": "Post-launch monitoring and immediate support",
    
    "process_support_title": "Maintenance & Support",
    "process_support_desc": "Our relationship continues after launch with ongoing support, maintenance, and optimization to ensure long-term success.",
    "process_support_point1": "Regular updates and security patching",
    "process_support_point2": "Performance monitoring and optimization",
    "process_support_point3": "Continuous improvement based on analytics and feedback",
    
    // Tech Stack 
    "tech_title": "Our Technology",
    "tech_title_highlight": "Stack",
    "tech_subtitle": "We leverage cutting-edge technologies to build robust, scalable, and high-performance digital solutions.",
    "tech_filter_all": "All Technologies",
    "tech_filter_frontend": "Frontend",
    "tech_filter_backend": "Backend",
    "tech_filter_devops": "DevOps",
    
    "tech_react_desc": "A JavaScript library for building user interfaces with component-based architecture and virtual DOM for optimal performance.",
    "tech_nextjs_desc": "React framework that enables server-side rendering, static site generation, and other performance optimizations.",
    "tech_tailwind_desc": "Utility-first CSS framework for rapid UI development with highly customizable design systems.",
    "tech_typescript_desc": "JavaScript superset that adds static types, enhancing code quality and developer productivity.",
    
    "tech_nodejs_desc": "JavaScript runtime built on Chrome's V8 engine for building fast, scalable server-side applications.",
    "tech_express_desc": "Minimal and flexible Node.js web application framework that provides robust features for web and mobile applications.",
    "tech_postgresql_desc": "Powerful, open-source object-relational database system with a strong reputation for reliability and data integrity.",
    
    "tech_docker_desc": "Platform for developing, shipping, and running applications in containers for consistent environments across development and production.",
    "tech_aws_desc": "Comprehensive cloud platform offering over 200 fully featured services from data centers globally.",
    "tech_github_desc": "CI/CD platform integrated with GitHub for automating software workflows, testing, and deployment.",
    
    // Price Calculator
    "price_calculator.title": "Interactive Pricing Calculator",
    "price_calculator.subtitle": "Estimate the cost of your project based on your specific needs and requirements. Adjust the parameters below to get a custom quote.",
    "price_calculator.project_type": "Project Type",
    "price_calculator.project_type_desc": "Select the type of project you need",
    "price_calculator.website": "Website",
    "price_calculator.mobile_app": "Mobile App",
    "price_calculator.design": "Design",
    "price_calculator.complexity": "Project Complexity",
    "price_calculator.complexity_desc": "Adjust the complexity based on your project requirements",
    "price_calculator.basic": "Basic",
    "price_calculator.complex": "Complex",
    "price_calculator.timeframe": "Time Frame",
    "price_calculator.timeframe_desc": "Select your preferred delivery timeline",
    "price_calculator.additional": "Additional Features",
    "price_calculator.additional_desc": "Select any additional features you need",
    "price_calculator.custom_requirements": "Custom requirements (optional)",
    "price_calculator.custom_requirements_placeholder": "Describe any custom features you need",
    "price_calculator.estimate": "Project Estimate",
    "price_calculator.estimate_desc": "Summary of your estimated project cost",
    "price_calculator.selected": "Selected Service",
    "price_calculator.estimated_total": "Estimated Total",
    "price_calculator.disclaimer": "This is an estimate based on the information provided. Final pricing may vary based on detailed requirements.",
    "price_calculator.request_quote": "Request Detailed Quote",
    "price_calculator.free_consultation": "No commitment, free consultation",
    "price_calculator.select_service": "Select a service to begin",
    "price_calculator.select_service_desc": "Choose from our service options to see pricing details",
  },
  tr: {
    // Live Chat
    "chat.title": "Canlı Destek",
    "chat.typing": "Mesajınızı yazın...",
    "chat.closed": "Sohbet kapatıldı",
    "chat.closed.desc": "Sohbeti istediğiniz zaman yeniden açabilirsiniz.",
    
    // Price Calculator
    "price_calculator.title": "İnteraktif Fiyat Hesaplayıcı",
    "price_calculator.subtitle": "Özel ihtiyaçlarınıza ve gereksinimlerinize göre projenizin maliyetini tahmin edin. Özel bir teklif almak için aşağıdaki parametreleri ayarlayın.",
    "price_calculator.project_type": "Proje Tipi",
    "price_calculator.project_type_desc": "İhtiyacınız olan proje türünü seçin",
    "price_calculator.website": "Web Sitesi",
    "price_calculator.mobile_app": "Mobil Uygulama",
    "price_calculator.design": "Tasarım",
    "price_calculator.complexity": "Proje Karmaşıklığı",
    "price_calculator.complexity_desc": "Proje gereksinimlerinize göre karmaşıklığı ayarlayın",
    "price_calculator.basic": "Temel",
    "price_calculator.complex": "Karmaşık",
    "price_calculator.timeframe": "Zaman Çerçevesi",
    "price_calculator.timeframe_desc": "Tercih ettiğiniz teslimat zaman çizelgesini seçin",
    "price_calculator.additional": "Ek Özellikler",
    "price_calculator.additional_desc": "İhtiyacınız olan ek özellikleri seçin",
    "price_calculator.custom_requirements": "Özel gereksinimler (isteğe bağlı)",
    "price_calculator.custom_requirements_placeholder": "İhtiyacınız olan özel özellikleri açıklayın",
    "price_calculator.estimate": "Proje Tahmini",
    "price_calculator.estimate_desc": "Tahmini proje maliyetinizin özeti",
    "price_calculator.selected": "Seçilen Hizmet",
    "price_calculator.estimated_total": "Tahmini Toplam",
    "price_calculator.disclaimer": "Bu, sağlanan bilgilere dayalı bir tahmindir. Nihai fiyatlandırma, detaylı gereksinimlere göre değişebilir.",
    "price_calculator.request_quote": "Detaylı Teklif İste",
    "price_calculator.free_consultation": "Taahhüt yok, ücretsiz danışma",
    "price_calculator.select_service": "Başlamak için bir hizmet seçin",
    "price_calculator.select_service_desc": "Fiyatlandırma detaylarını görmek için hizmet seçeneklerimizden birini seçin",
    
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
    "language.bg": "Bulgarca",
    "language.select": "Dil seçin",
    
    // Process Timeline
    "process_title": "Geliştirme",
    "process_title_highlight": "Sürecimiz",
    "process_subtitle": "Her proje için mükemmel sonuçlar sunmak üzere yapılandırılmış bir yaklaşım izliyoruz.",
    "process_discovery_title": "Keşif ve Araştırma",
    "process_discovery_desc": "İş hedeflerinizi, hedef kitlenizi ve proje gereksinimlerinizi derinlemesine araştırma ve analiz yoluyla iyice anlamakla başlıyoruz.",
    "process_discovery_point1": "Vizyon ve hedefleri anlamak için paydaş görüşmeleri",
    "process_discovery_point2": "Pazar araştırması ve rakip analizi",
    "process_discovery_point3": "Kullanıcı araştırması ve persona geliştirme",
    
    "process_planning_title": "Strateji ve Planlama",
    "process_planning_desc": "Araştırmamıza dayanarak, net kilometre taşları ve teslim edilebilirlerle kapsamlı bir strateji ve detaylı proje planı geliştiriyoruz.",
    "process_planning_point1": "Proje kapsamı tanımı ve zaman planlaması",
    "process_planning_point2": "Kaynak tahsisi ve ekip oluşturma",
    "process_planning_point3": "Risk değerlendirmesi ve azaltma planlaması",
    
    "process_design_title": "Tasarım ve Prototipleme",
    "process_design_desc": "Tasarım ekibimiz, markanızla uyumlu ve kullanıcı beklentilerini karşılayan sezgisel, çekici ve güzel arayüzler oluşturur.",
    "process_design_point1": "Bilgi mimarisi ve kullanıcı akışı haritalama",
    "process_design_point2": "Tel çerçeve oluşturma ve etkileşimli prototipleme",
    "process_design_point3": "Marka uyumlu görsel tasarım",
    
    "process_development_title": "Geliştirme ve Uygulama",
    "process_development_desc": "Geliştiricilerimiz, en iyi performans ve güvenilirlik için en son teknolojileri ve en iyi uygulamaları kullanarak tasarımları hayata geçiriyor.",
    "process_development_point1": "Frontend ve backend geliştirme",
    "process_development_point2": "Üçüncü taraf hizmetler ve API'ler ile entegrasyon",
    "process_development_point3": "Kod incelemeleri ve teknik optimizasyon",
    
    "process_testing_title": "Test ve Kalite Güvencesi",
    "process_testing_desc": "Tüm cihazlarda ve platformlarda işlevselliği, performansı ve güvenliği sağlamak için projenizin tüm yönlerini titizlikle test ediyoruz.",
    "process_testing_point1": "Kapsamlı işlevsellik ve kullanılabilirlik testi",
    "process_testing_point2": "Çapraz tarayıcı ve çapraz cihaz uyumluluk testi",
    "process_testing_point3": "Performans optimizasyonu ve güvenlik denetimleri",
    
    "process_launch_title": "Dağıtım ve Lansman",
    "process_launch_desc": "Minimum kesinti ile sorunsuz ve başarılı bir lansman sağlamak için dağıtım sürecini dikkatle yönetiyoruz.",
    "process_launch_point1": "Lansman öncesi kontrol listesi ve son kalite güvencesi",
    "process_launch_point2": "Üretim ortamına dağıtım",
    "process_launch_point3": "Lansman sonrası izleme ve anında destek",
    
    "process_support_title": "Bakım ve Destek",
    "process_support_desc": "İlişkimiz, uzun vadeli başarıyı sağlamak için devam eden destek, bakım ve optimizasyon ile lansmandan sonra da devam ediyor.",
    "process_support_point1": "Düzenli güncellemeler ve güvenlik yamaları",
    "process_support_point2": "Performans izleme ve optimizasyon",
    "process_support_point3": "Analitik ve geri bildirimlere dayalı sürekli iyileştirme",
    
    // Tech Stack 
    "tech_title": "Teknoloji",
    "tech_title_highlight": "Yığınımız",
    "tech_subtitle": "Sağlam, ölçeklenebilir ve yüksek performanslı dijital çözümler oluşturmak için en son teknolojilerden yararlanıyoruz.",
    "tech_filter_all": "Tüm Teknolojiler",
    "tech_filter_frontend": "Frontend",
    "tech_filter_backend": "Backend",
    "tech_filter_devops": "DevOps",
    
    "tech_react_desc": "Bileşen tabanlı mimari ve optimal performans için sanal DOM ile kullanıcı arayüzleri oluşturmak için bir JavaScript kütüphanesi.",
    "tech_nextjs_desc": "Sunucu tarafı işleme, statik site oluşturma ve diğer performans optimizasyonlarını sağlayan React çerçevesi.",
    "tech_tailwind_desc": "Yüksek derecede özelleştirilebilir tasarım sistemleriyle hızlı kullanıcı arayüzü geliştirme için yardımcı sınıf öncelikli CSS çerçevesi.",
    "tech_typescript_desc": "Kod kalitesini ve geliştirici üretkenliğini artıran statik tipler ekleyen JavaScript üst kümesi.",
    
    "tech_nodejs_desc": "Hızlı, ölçeklenebilir sunucu tarafı uygulamaları oluşturmak için Chrome'un V8 motoru üzerine kurulmuş JavaScript çalışma zamanı.",
    "tech_express_desc": "Web ve mobil uygulamalar için güçlü özellikler sunan minimal ve esnek Node.js web uygulama çerçevesi.",
    "tech_postgresql_desc": "Güvenilirlik ve veri bütünlüğü konusunda güçlü bir üne sahip, güçlü, açık kaynaklı nesne-ilişkisel veritabanı sistemi.",
    
    "tech_docker_desc": "Geliştirme ve üretim arasında tutarlı ortamlar için uygulamaları konteynerlerde geliştirme, gönderme ve çalıştırma platformu.",
    "tech_aws_desc": "Dünya çapında veri merkezlerinden 200'den fazla tam özellikli hizmet sunan kapsamlı bulut platformu.",
    "tech_github_desc": "Yazılım iş akışlarını, testleri ve dağıtımı otomatikleştirmek için GitHub ile entegre CI/CD platformu.",
  },
  bg: {
    // Navbar
    "nav.home": "Начало",
    "nav.services": "Услуги",
    "nav.portfolio": "Портфолио",
    "nav.testimonials": "Отзиви",
    "nav.contact": "Контакт",
    "nav.getInTouch": "Свържете се",
    
    // Hero Section
    "hero.title": "Дигитални решения за бъдещето на вашия бизнес",
    "hero.subtitle": "Проектираме и разработваме иновативни дигитални изживявания, които помагат на бизнеса да расте, ангажира и трансформира.",
    "hero.cta": "Разгледайте услугите",
    "hero.stats.clients": "Доволни клиенти",
    "hero.stats.projects": "Завършени проекти",
    "hero.stats.experience": "Години опит",
    
    // Services Section
    "services.title": "Нашите услуги",
    "services.subtitle": "Предлагаме широка гама от дигитални услуги, които помагат на вашия бизнес да процъфтява в дигиталния свят.",
    "services.webDev.title": "Уеб разработка",
    "services.webDev.description": "Персонализирана разработка на уебсайтове с отзивчив дизайн, оптимизирана производителност и безпроблемно потребителско изживяване.",
    "services.mobileDev.title": "Мобилни приложения",
    "services.mobileDev.description": "Нативни и кросплатформени мобилни приложения, които осигуряват изключително потребителско изживяване на всички устройства.",
    "services.uxDesign.title": "UX/UI Дизайн",
    "services.uxDesign.description": "Ориентирани към потребителя дизайн решения, които подобряват идентичността на марката, използваемостта и ангажираността на потребителите.",
    "services.branding.title": "Брандинг",
    "services.branding.description": "Стратегия за бранда, визуална идентичност и маркетингови материали, които комуникират ценностите и мисията на вашия бранд.",
    "services.digitalMarketing.title": "Дигитален маркетинг",
    "services.digitalMarketing.description": "Ориентирани към резултати дигитални маркетингови стратегии, които увеличават видимостта, трафика и конверсиите.",
    "services.ecommerce.title": "Електронна търговия",
    "services.ecommerce.description": "Персонализирани решения за електронна търговия със сигурни платежни шлюзове, управление на инвентара и плавно преживяване при плащане.",
    "services.seo.title": "SEO оптимизация",
    "services.seo.description": "Стратегии за оптимизация на търсачките, които подобряват видимостта на вашия уебсайт и класирането му в органичното търсене.",
    "services.contentCreation.title": "Създаване на съдържание",
    "services.contentCreation.description": "Висококачествено съдържание за уебсайтове, блогове, социални медии и маркетингови кампании.",
    "services.cloudServices.title": "Облачни услуги",
    "services.cloudServices.description": "Облачна архитектура, миграция и управленски услуги за мащабируема и сигурна инфраструктура.",
    
    // Portfolio Section
    "portfolio.title": "Нашето портфолио",
    "portfolio.subtitle": "Разгледайте нашата най-скорошна работа и вижте как помогнахме на бизнеса да постигне дигиталните си цели.",
    "portfolio.filter.all": "Всички",
    "portfolio.filter.webDesign": "Уеб дизайн",
    "portfolio.filter.mobileApps": "Мобилни приложения",
    "portfolio.filter.branding": "Брандинг",
    "portfolio.viewProject": "Вижте проекта",
    
    // Stats Section
    "stats.title": "Нашите числа",
    "stats.subtitle": "Гордеем се с нашите постижения и въздействието, което сме оказали на бизнеса по целия свят.",
    "stats.clients": "Доволни клиенти",
    "stats.projects": "Завършени проекти",
    "stats.team": "Членове на екипа",
    "stats.satisfaction": "Удовлетвореност на клиентите",
    
    // Testimonial Section
    "testimonials.title": "Какво казват нашите клиенти",
    "testimonials.subtitle": "Не приемайте само нашата дума - чуйте от някои от нашите доволни клиенти за техния опит с нас.",
    
    // CTA Section
    "cta.title": "Готови ли сте да трансформирате бизнеса си?",
    "cta.subtitle": "Нека работим заедно, за да осъществим вашата визия. Започнете, като ни разкажете за вашия проект.",
    "cta.button.freelancer": "Присъединете се като фрилансър",
    "cta.button.project": "Започнете проект",
    
    // Contact Section
    "contact.title": "Свържете се с нас",
    "contact.subtitle": "Имате проект в ума си или искате да научите повече за нашите услуги? Свържете се с нас директно, като използвате формуляра по-долу.",
    "contact.location.title": "Нашето местоположение",
    "contact.email.title": "Имейл",
    "contact.phone.title": "Обадете ни се",
    "contact.hours.title": "Работно време",
    "contact.hours.weekdays": "Понеделник - Петък:",
    "contact.hours.saturday": "Събота:",
    "contact.hours.sunday": "Неделя:",
    "contact.form.title": "Изпратете ни съобщение",
    "contact.form.name": "Вашето име",
    "contact.form.email": "Вашият имейл",
    "contact.form.subject": "Тема",
    "contact.form.message": "Вашето съобщение",
    "contact.form.button.send": "Изпратете съобщение",
    "contact.form.button.sending": "Изпращане...",
    "contact.form.button.sent": "Съобщението е изпратено!",
    
    // Footer
    "footer.rights": "Всички права запазени",
    "footer.privacy": "Политика за поверителност",
    "footer.terms": "Условия за ползване",
    
    // Project Modal
    "project.form.title": "Започнете вашия проект",
    "project.form.subtitle": "Разкажете ни за вашия проект и ние ще се свържем с вас в рамките на 24 часа.",
    "project.form.name": "Вашето име",
    "project.form.email": "Вашият имейл",
    "project.form.phone": "Телефонен номер",
    "project.form.company": "Име на компанията (по избор)",
    "project.form.budget": "Очакван бюджет",
    "project.form.type": "Тип проект",
    "project.form.description": "Описание на проекта",
    "project.form.button.submit": "Изпратете проекта",
    "project.form.button.submitting": "Изпращане...",
    "project.form.success": "Вашата заявка за проект беше изпратена успешно!",
    
    // Freelancer Modal
    "freelancer.form.title": "Присъединете се към нашата мрежа от фрилансъри",
    "freelancer.form.subtitle": "Попълнете формуляра по-долу, за да кандидатствате като фрилансър.",
    "freelancer.form.name": "Вашето пълно име",
    "freelancer.form.email": "Имейл адрес",
    "freelancer.form.phone": "Телефонен номер",
    "freelancer.form.skills": "Умения и експертиза",
    "freelancer.form.experience": "Години опит",
    "freelancer.form.portfolio": "URL на портфолио",
    "freelancer.form.rate": "Почасова ставка (USD)",
    "freelancer.form.availability": "Наличност",
    "freelancer.form.button.submit": "Изпратете кандидатура",
    "freelancer.form.button.submitting": "Изпращане...",
    "freelancer.form.success": "Вашата кандидатура беше изпратена успешно!",
    
    // Search
    "search.placeholder": "Търсене на проекти...",
    "search.button": "Търсене",
    "search.results": "Резултати от търсенето",
    "search.noResults": "Не са намерени резултати за",
    
    // Language Switcher
    "language.en": "Английски",
    "language.tr": "Турски",
    "language.bg": "Български",
    "language.select": "Изберете език",
    
    // Process Timeline
    "process_title": "Нашият процес на",
    "process_title_highlight": "разработка",
    "process_subtitle": "Следваме структуриран подход, за да постигнем изключителни резултати за всеки проект.",
    "process_discovery_title": "Откриване и изследване",
    "process_discovery_desc": "Започваме с цялостно разбиране на бизнес целите ви, целевата аудитория и изискванията на проекта чрез задълбочено изследване и анализ.",
    "process_discovery_point1": "Интервюта със заинтересовани страни за разбиране на визията и целите",
    "process_discovery_point2": "Пазарно проучване и анализ на конкуренцията",
    "process_discovery_point3": "Изследване на потребителите и разработване на персони",
    
    "process_planning_title": "Стратегия и планиране",
    "process_planning_desc": "На базата на нашето изследване, разработваме цялостна стратегия и подробен проектен план с ясни етапи и изисквания.",
    "process_planning_point1": "Дефиниране на обхвата на проекта и планиране на времевата рамка",
    "process_planning_point2": "Разпределение на ресурсите и сформиране на екип",
    "process_planning_point3": "Оценка и планиране на намаляване на риска",
    
    "process_design_title": "Дизайн и прототипиране",
    "process_design_desc": "Нашият дизайнерски екип създава интуитивни, ангажиращи и красиви интерфейси, които са в съответствие с вашия бранд и отговарят на очакванията на потребителите.",
    "process_design_point1": "Информационна архитектура и картографиране на потребителския поток",
    "process_design_point2": "Wireframing и интерактивно прототипиране",
    "process_design_point3": "Визуален дизайн с подравняване към бранда",
    
    "process_development_title": "Разработка и внедряване",
    "process_development_desc": "Нашите разработчици съживяват дизайните, използвайки най-новите технологии и най-добрите практики за оптимална производителност и надеждност.",
    "process_development_point1": "Frontend и backend разработка",
    "process_development_point2": "Интеграция с услуги и API на трети страни",
    "process_development_point3": "Прегледи на кода и техническа оптимизация",
    
    "process_testing_title": "Тестване и осигуряване на качеството",
    "process_testing_desc": "Ние строго тестваме всички аспекти на вашия проект, за да гарантираме функционалност, производителност и сигурност на всички устройства и платформи.",
    "process_testing_point1": "Цялостно функционално и тестване на използваемостта",
    "process_testing_point2": "Тестване на съвместимост с различни браузъри и устройства",
    "process_testing_point3": "Оптимизация на производителността и проверки на сигурността",
    
    "process_launch_title": "Внедряване и пускане",
    "process_launch_desc": "Ние внимателно управляваме процеса на внедряване, за да осигурим гладко и успешно пускане с минимални прекъсвания.",
    "process_launch_point1": "Предпусков контролен списък и финално осигуряване на качеството",
    "process_launch_point2": "Внедряване в производствена среда",
    "process_launch_point3": "Наблюдение след пускането и незабавна поддръжка",
    
    "process_support_title": "Поддръжка и обслужване",
    "process_support_desc": "Нашите взаимоотношения продължават и след пускането с текуща поддръжка, обслужване и оптимизация, за да осигурим дългосрочен успех.",
    "process_support_point1": "Редовни актуализации и патчове за сигурност",
    "process_support_point2": "Наблюдение и оптимизация на производителността",
    "process_support_point3": "Непрекъснато подобрение на базата на анализи и обратна връзка",
    
    // Tech Stack 
    "tech_title": "Нашата технологична",
    "tech_title_highlight": "обстановка",
    "tech_subtitle": "Използваме авангардни технологии за изграждане на надеждни, мащабируеми и високопроизводителни дигитални решения.",
    "tech_filter_all": "Всички технологии",
    "tech_filter_frontend": "Frontend",
    "tech_filter_backend": "Backend",
    "tech_filter_devops": "DevOps",
    
    "tech_react_desc": "JavaScript библиотека за изграждане на потребителски интерфейси с компонентна архитектура и виртуален DOM за оптимална производителност.",
    "tech_nextjs_desc": "React framework, който позволява рендериране от страна на сървъра, генериране на статични сайтове и други оптимизации на производителността.",
    "tech_tailwind_desc": "CSS framework с приоритет на полезността за бързо развитие на потребителския интерфейс с високо персонализируеми дизайн системи.",
    "tech_typescript_desc": "JavaScript надмножество, което добавя статични типове, подобрявайки качеството на кода и продуктивността на разработчиците.",
    
    "tech_nodejs_desc": "JavaScript среда за изпълнение, изградена върху V8 двигателя на Chrome за изграждане на бързи, мащабируеми приложения от страна на сървъра.",
    "tech_express_desc": "Минимална и гъвкава Node.js уеб приложна рамка, която предоставя надеждни функции за уеб и мобилни приложения.",
    "tech_postgresql_desc": "Мощна система за обектно-релационни бази данни с отворен код с добра репутация за надеждност и цялост на данните.",
    
    "tech_docker_desc": "Платформа за разработка, доставка и изпълнение на приложения в контейнери за постоянни среди в разработката и производството.",
    "tech_aws_desc": "Всеобхватна облачна платформа, предлагаща над 200 напълно функционални услуги от центрове за данни по целия свят.",
    "tech_github_desc": "CI/CD платформа, интегрирана с GitHub за автоматизиране на софтуерни работни потоци, тестване и внедряване.",

    // Price Calculator
    "price_calculator.title": "Интерактивен калкулатор на цени",
    "price_calculator.subtitle": "Пресметнете стойността на вашия проект въз основа на специфичните ви нужди и изисквания. Променете параметрите по-долу, за да получите персонализирана оферта.",
    "price_calculator.project_type": "Тип проект",
    "price_calculator.project_type_desc": "Изберете типа проект, от който имате нужда",
    "price_calculator.website": "Уебсайт",
    "price_calculator.mobile_app": "Мобилно приложение",
    "price_calculator.design": "Дизайн",
    "price_calculator.complexity": "Сложност на проекта",
    "price_calculator.complexity_desc": "Регулирайте сложността според изискванията на вашия проект",
    "price_calculator.basic": "Основен",
    "price_calculator.complex": "Сложен",
    "price_calculator.timeframe": "Времева рамка",
    "price_calculator.timeframe_desc": "Изберете предпочитания от вас срок за доставка",
    "price_calculator.additional": "Допълнителни функции",
    "price_calculator.additional_desc": "Изберете всички допълнителни функции, от които се нуждаете",
    "price_calculator.custom_requirements": "Персонализирани изисквания (по избор)",
    "price_calculator.custom_requirements_placeholder": "Опишете всички персонализирани функции, от които се нуждаете",
    "price_calculator.estimate": "Оценка на проекта",
    "price_calculator.estimate_desc": "Обобщение на прогнозните разходи за вашия проект",
    "price_calculator.selected": "Избрана услуга",
    "price_calculator.estimated_total": "Приблизителна обща сума",
    "price_calculator.disclaimer": "Това е приблизителна стойност, базирана на предоставената информация. Крайната цена може да варира в зависимост от подробните изисквания.",
    "price_calculator.request_quote": "Заявете детайлна оферта",
    "price_calculator.free_consultation": "Без ангажимент, безплатна консултация",
    "price_calculator.select_service": "Изберете услуга, за да започнете",
    "price_calculator.select_service_desc": "Изберете от нашите опции за услуги, за да видите ценовите детайли"
  }
};