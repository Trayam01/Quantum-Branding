import React, { useEffect } from 'react';
import { PageType } from '../types';

interface SEOHeadProps {
  currentPage: PageType;
}

export function SEOHead({ currentPage }: SEOHeadProps) {
  useEffect(() => {
    let title = 'Quantum Branding | B2B Digital Agency India — Websites, SEO, Marketing & AI';
    let description = 'Quantum Branding is a top-tier B2B digital agency founded by Trayam Tiwari. We specialize in website development, SEO, social media management, performance marketing, and digital growth.';

    switch (currentPage) {
      case 'home':
        title = 'Quantum Branding | B2B Digital Agency India — Websites, SEO, Marketing & AI';
        description = 'Scale your business with Quantum Branding. Custom high-converting websites, top-rank local SEO, reel content creation, and WhatsApp lead automation by Trayam Tiwari.';
        break;
      case 'services':
        title = 'Digital Services | Website Development, SEO & Social Media — Quantum Branding';
        description = 'Explore our specialized services: Custom Web Development, Local & Global SEO, Social Media Management, Branding, Meta Ads, and AI Growth Solutions.';
        break;
      case 'pricing':
        title = 'Transparent Digital Agency Pricing | Quantum Branding India';
        description = 'Affordable and ROI-driven pricing plans for website development, SEO packages, social media management, and complete digital marketing packages.';
        break;
      case 'packages':
        title = 'Growth & Premium Digital Packages | Quantum Branding (₹30,000–₹50,000)';
        description = 'All-in-one digital growth packages featuring high-speed website development, 15-30 Reels, WhatsApp lead integration, SEO, and continuous maintenance.';
        break;
      case 'portfolio':
        title = 'Case Studies & Portfolio | Revolution Academy & Client Success — Quantum Branding';
        description = 'View our featured client case studies, including Revolution Academy (Website Development, SEO, and Social Media Management). Real business impact and growth metrics.';
        break;
      case 'about':
        title = 'About Quantum Branding | Founded by Trayam Tiwari — B2B Agency';
        description = 'Learn about Quantum Branding, our mission, digital philosophy, and founder Trayam Tiwari. Transforming businesses with engineering and marketing excellence.';
        break;
      case 'process':
        title = 'Our 4-Step Proven Execution Process | Quantum Branding Digital Agency';
        description = 'Discover our transparent 4-step agency workflow: Discovery & Strategy, Custom Design & Engineering, Growth Campaign Launch, and Optimization.';
        break;
      case 'webinars':
        title = 'Free Growth Webinars & 1-on-1 Strategy Workshops | Quantum Branding';
        description = 'Register for live agency webinars and 1-on-1 digital strategy sessions. Learn website conversion hacks, local SEO tactics, and social media growth frameworks.';
        break;
      case 'contact':
        title = 'Get in Touch & Request a Quote | Quantum Branding Agency';
        description = 'Contact Founder Trayam Tiwari and the Quantum Branding team. Schedule a 15-minute discovery call or enquire about custom website development & SEO.';
        break;
      case 'faq':
        title = 'Frequently Asked Questions | Quantum Branding Agency';
        description = 'Answers to common questions regarding our website development timelines, SEO guarantees, social media packages, payment terms, and support.';
        break;
      case 'admin':
        title = 'Private Admin Portal | Quantum Branding';
        description = 'Secure administrator management interface for client enquiries and webinar registrations.';
        break;
      default:
        break;
    }

    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Update Open Graph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

  }, [currentPage]);

  return null;
}
