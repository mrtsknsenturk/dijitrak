export interface ProjectImage {
  url: string;
  alt: string;
  isMain?: boolean;
}

export interface ProjectTag {
  name: string;
  color?: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  client: string;
  clientLogo?: string;
  category: string;
  tags: ProjectTag[];
  services: string[];
  images: ProjectImage[];
  date: string;
  duration: string;
  technologies: string[];
  challenge: string;
  solution: string;
  results: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
    company: string;
    image?: string;
  };
  nextProject?: string;
  prevProject?: string;
  url?: string;
}