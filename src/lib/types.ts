export type Lang = 'es' | 'en';

export interface Image {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

// Foto de la portada: cada una tiñe el resplandor y el aro de su miniatura
export interface Shot {
  image: Image;
  glow: string;
  ring: string;
}

export interface Feature {
  title: string;
  stack: string;
  souxion?: boolean;
}

export interface Stat {
  value: string;
  label: string;
  tone: 'accent' | 'outline' | 'orange';
}

export interface StackCategory {
  label: string;
  items: string[];
}

export interface Education {
  year: string;
  title: string;
  institution: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  image: Image;
}

export interface Settings {
  name: string;
  role: string;
  availability: string;
  heroCopy: string;
  typedWords: string[];
  shots: Shot[];
  features: Feature[];
  marquee: string[];
  aboutLead: string;
  aboutCopy: string;
  traits: string[];
  aboutPhoto: Image;
  stats: Stat[];
  souxion: {
    description: string;
    photo: Image;
    url: string;
    instagram: string;
    instagramUrl: string;
    whatsapp: string;
  };
  email: string;
  whatsapp: string;
  whatsappMessage: string;
  linkedin: string;
  github: string;
  cvEs: string;
  cvEn: string;
  stack: StackCategory[];
  education: Education[];
  certificates: Certificate[];
}

export type ProjectCategory = 'souxion' | 'web' | 'portfolio' | 'academico';
export type ProjectTone = 'souxion' | 'accent' | 'dev' | 'muted';
// Qué se muestra cuando el proyecto no tiene captura
export type ProjectPlaceholder = 'web' | 'code' | 'souxion' | 'soon';

export interface Project {
  title: string;
  kind: string;
  tone: ProjectTone;
  categories: ProjectCategory[];
  description: string;
  stack: string;
  image: Image | null;
  placeholder: ProjectPlaceholder;
  domain?: string;
  cta: string;
  url?: string;
}

export interface Service {
  title: string;
  description: string;
}
