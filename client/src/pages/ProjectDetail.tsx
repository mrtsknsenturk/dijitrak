import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { PortfolioProject } from "@shared/schema";
import { Helmet } from "react-helmet";
import { ChevronLeft, ChevronRight, ExternalLink, Clock, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FadeIn, FadeInStagger } from "@/components/ui/motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useMobile } from "@/hooks/use-mobile";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProjectDetail() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const isMobile = useMobile();
  
  const { data: project, isLoading, error } = useQuery<PortfolioProject>({
    queryKey: ["/api/portfolio-projects", slug],
    queryFn: async () => {
      const response = await fetch(`/api/portfolio-projects/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  useEffect(() => {
    if (project?.images && project.images.length > 0) {
      const mainImage = project.images.find((img: any) => img.isMain)?.url || 
                       project.images[0].url;
      setActiveImage(mainImage);
    }
  }, [project]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">{t("projectNotFound")}</h1>
        <p className="text-gray-500 mb-8">{t("projectNotFoundDesc")}</p>
        <Link href="/">
          <Button>{t("backToHome")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Quantum Edge</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <FadeIn>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
              <p className="text-gray-500 mt-2">{project.description}</p>
            </div>
            <div className="space-x-2">
              {project.prevProject && (
                <Link href={`/project/${project.prevProject}`}>
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    {t("previousProject")}
                  </Button>
                </Link>
              )}
              {project.nextProject && (
                <Link href={`/project/${project.nextProject}`}>
                  <Button variant="outline" size="sm">
                    {t("nextProject")}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              {activeImage && (
                <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={activeImage} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {project.images.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
                  {project.images.map((image: {url: string, alt: string}, index: number) => (
                    <div 
                      key={index}
                      className={`relative aspect-video cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        activeImage === image.url 
                          ? 'border-primary' 
                          : 'border-transparent hover:border-primary/30'
                      }`}
                      onClick={() => setActiveImage(image.url)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t("projectDetails")}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t("client")}</p>
                    <p className="font-medium flex items-center">
                      {project.clientLogo && (
                        <img 
                          src={project.clientLogo} 
                          alt={project.client} 
                          className="w-5 h-5 mr-2"
                        />
                      )}
                      {project.client}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t("duration")}</p>
                    <p className="font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      {project.duration}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t("date")}</p>
                    <p className="font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {project.date}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t("category")}</p>
                    <p className="font-medium flex items-center">
                      <Tag className="w-4 h-4 mr-1 text-gray-400" />
                      {project.category}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold mb-3">{t("services")}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service: string, index: number) => (
                    <Badge key={index} variant="outline">{service}</Badge>
                  ))}
                </div>
              </div>

              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold mb-3">{t("technologies")}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, index: number) => (
                    <Badge key={index} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>

              {project.url && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{t("liveProject")}</h3>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full">
                        {t("visitProject")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">{t("challenge")}</h2>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {project.challenge}
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">{t("solution")}</h2>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {project.solution}
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">{t("results")}</h2>
              <ul className="space-y-3">
                {project.results.map((result: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2 mt-1">
                      ✓
                    </span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        {project.testimonial && (
          <FadeIn>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 mb-16">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {project.testimonial.image && (
                  <img 
                    src={project.testimonial.image}
                    alt={project.testimonial.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                
                <div>
                  <p className="text-lg italic mb-4">"{project.testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{project.testimonial.author}</p>
                    <p className="text-sm text-gray-500">
                      {project.testimonial.position}, {project.testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        <FadeIn>
          <div className="flex justify-center">
            <Link href="/#portfolio">
              <Button variant="outline" size="lg">
                <ChevronLeft className="mr-2 h-4 w-4" />
                {t("backToPortfolio")}
              </Button>
            </Link>
          </div>
        </FadeIn>
      </main>

      <Footer />
    </>
  );
}