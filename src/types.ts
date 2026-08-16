export type PageType = 
  | 'home' 
  | 'services' 
  | 'pricing' 
  | 'packages' 
  | 'portfolio' 
  | 'about' 
  | 'process' 
  | 'webinars'
  | 'terms'
  | 'refund-policy'
  | 'return-policy'
  | 'disclaimer'
  | 'ai-helper' 
  | 'contact' 
  | 'faq'
  | 'admin';

export interface WebinarItem {
  id: string;
  type: 'free' | 'paid_1on1';
  title: string;
  subtitle: string;
  priceFormatted: string;
  originalPriceFormatted?: string;
  priceNumber: number;
  badge: string;
  duration: string;
  format: string;
  instructor: string;
  instructorRole: string;
  description: string;
  topics: string[];
  includes: string[];
  ctaText: string;
  colorTheme: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  deliverables: string[];
  icon: string;
  startingPrice?: string;
}

export interface PricingItem {
  category: string;
  name: string;
  price: string;
  period?: string;
  description?: string;
  badge?: string;
}

export interface DigitalPackage {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  tagline: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  colorTheme: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Education' | 'Restaurants & Cafes' | 'Fitness' | 'Real Estate' | 'Local Businesses' | 'Professional Services';
  services: string[];
  result: string;
  description: string;
  image: string;
  isDemo?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface EnquiryData {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  businessType: string;
  requiredService: string;
  budget: string;
  message: string;
}

export interface AIRecommendation {
  recommendedPackage: string;
  primaryService: string;
  additionalServices: string[];
  summaryReasoning: string;
  estimatedTimeline: string;
  actionPlan: string[];
}
