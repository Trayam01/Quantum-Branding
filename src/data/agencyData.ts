import { DigitalPackage, FAQItem, PortfolioProject, PricingItem, ProcessStep, ServiceItem, WebinarItem } from '../types';

export const COMPANY_INFO = {
  name: 'Quantum Branding',
  founder: 'Trayam Tiwari',
  title: 'Founder — Quantum Branding',
  phone: '8878080111',
  phoneFormatted: '+91 8878080111',
  phoneLink: 'tel:+918878080111',
  email: 'hello.quantumbranding@gmail.com',
  emailLink: 'mailto:hello.quantumbranding@gmail.com',
  whatsappNumber: '918878080111',
  defaultWhatsappMessage: 'Hello Quantum Branding! I am interested in digital growth services for my business. Please share details.',
  whatsappLink: `https://wa.me/918878080111?text=${encodeURIComponent('Hello Quantum Branding! I am interested in digital growth services for my business. Please share details.')}`,
  location: 'India',
  tagline: 'Build a Brand That Gets Noticed.',
  subheadline: 'Quantum Branding helps businesses build, market and grow their digital presence through websites, social media, SEO, digital marketing, branding and AI-powered solutions.',
};

export const getWhatsAppUrl = (customText?: string) => {
  const message = customText || COMPANY_INFO.defaultWhatsappMessage;
  return `https://wa.me/918878080111?text=${encodeURIComponent(message)}`;
};

export const DIGITAL_PACKAGES: DigitalPackage[] = [
  {
    id: 'starter-package',
    name: 'STARTER PACKAGE',
    price: 15000,
    formattedPrice: '₹15,000',
    tagline: 'Ideal foundation for small businesses & startups starting online.',
    popular: false,
    colorTheme: 'from-blue-500 to-cyan-500',
    ctaText: 'Choose Starter',
    features: [
      'Business Website',
      'WhatsApp Integration',
      'Contact Form',
      'Basic SEO',
    ],
  },
  {
    id: 'growth-package',
    name: 'GROWTH PACKAGE',
    price: 30000,
    formattedPrice: '₹30,000',
    tagline: 'Essential digital transformation for ambitious growing businesses.',
    popular: true,
    colorTheme: 'from-blue-600 via-indigo-600 to-pink-500',
    ctaText: 'Choose Growth',
    features: [
      'Professional Website',
      'Google Business Profile',
      'SEO Setup',
      'Social Media Setup',
      'WhatsApp Integration',
      'Lead Generation Funnel',
    ],
  },
  {
    id: 'premium-package',
    name: 'PREMIUM PACKAGE',
    price: 50000,
    formattedPrice: '₹50,000',
    tagline: 'The complete market-dominating digital growth system.',
    popular: false,
    colorTheme: 'from-blue-600 via-pink-500 to-yellow-400',
    ctaText: 'Choose Premium',
    features: [
      'Premium Website',
      'Complete SEO',
      'Google Ads Setup',
      'Meta Ads Setup',
      'Branding Kit',
      '1 Month Website Maintenance',
      'Priority Dedicated Support',
    ],
  },
];

export const PACKAGE_COMPARISON_MATRIX = [
  { feature: 'Website Level', starter: 'Business Website', growth: 'Professional Website', premium: 'Premium Custom Website' },
  { feature: 'SEO Capabilities', starter: 'Basic SEO', growth: 'SEO Setup', premium: 'Complete SEO' },
  { feature: 'Google Business Profile', starter: '—', growth: 'Included', premium: 'Included' },
  { feature: 'Social Media Setup', starter: '—', growth: 'Included', premium: 'Included' },
  { feature: 'Google Ads Setup', starter: '—', starterCheck: false, growth: '—', premium: 'Included' },
  { feature: 'Meta Ads Setup', starter: '—', growth: '—', premium: 'Included' },
  { feature: 'Branding Kit', starter: '—', growth: '—', premium: 'Included' },
  { feature: 'Website Maintenance', starter: '—', growth: '—', premium: '1 Month Included' },
  { feature: 'WhatsApp Integration', starter: 'Included', growth: 'Included', premium: 'Included' },
  { feature: 'Contact / Lead Form', starter: 'Included', growth: 'Included', premium: 'Included' },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Website Development',
    category: 'Development',
    icon: 'Globe',
    shortDesc: 'Custom high-converting websites engineered for fast load speeds, mobile responsiveness, and client lead generation.',
    deliverables: [
      'Landing Page Website (₹3,000)',
      'Basic Business Website 3-5 Pages (₹8,000)',
      'Professional Business Website (₹15,000)',
      'Premium Business Website (₹25,000)',
      'E-commerce Website (₹35,000)',
      'Custom Web Application (₹50,000+)',
      'WordPress Website (₹10,000)',
      'Website Redesign (₹8,000)',
      'Website Speed Optimization (₹5,000)',
      'Website Maintenance (₹3,000/mo)',
      'Website Security & Backup (₹3,000)',
      'Domain & Hosting Setup (₹3,000)',
    ],
    startingPrice: '₹3,000',
  },
  {
    id: 'seo',
    title: 'SEO Services',
    category: 'Search',
    icon: 'Search',
    shortDesc: 'Rank higher on Google searches and dominate local business listings to get consistent incoming inquiries.',
    deliverables: [
      'Basic SEO Audit (₹3,000)',
      'Local SEO (₹4,000/mo)',
      'On-Page SEO (₹8,000)',
      'Complete SEO (₹15,000/mo)',
      'Google Business Profile Optimization (₹5,000)',
    ],
    startingPrice: '₹3,000',
  },
  {
    id: 'smm',
    title: 'Social Media Management',
    category: 'Marketing',
    icon: 'Share2',
    shortDesc: 'Strategic content, high-retention reels, custom graphics, and influencer outreach that build organic brand authority.',
    deliverables: [
      'Social Media Setup (₹2,000)',
      'Monthly Social Media Management (₹5,000/mo)',
      '15 Custom Posts (₹5,000)',
      '30 Custom Posts (₹8,000)',
      'Reel Editing (₹500/reel)',
      'Monthly Reels Package (₹6,000)',
      'Influencers Promotion (₹4,000 – ₹15,000)',
      'Drone Shots (₹3,000)',
    ],
    startingPrice: '₹2,000',
  },
  {
    id: 'branding',
    title: 'Branding & Design',
    category: 'Design',
    icon: 'Palette',
    shortDesc: 'Memorable brand visual identities, logos, brochures, and creative marketing collateral that build instant trust.',
    deliverables: [
      'Logo Design (₹3,000)',
      'Brand Identity Kit (₹10,000)',
      'Business Card Design (₹3,000)',
      'Flyer / Brochure Design (₹3,000)',
      'Menu Design (₹3,000)',
      'Banner Design (₹3,000)',
    ],
    startingPrice: '₹3,000',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Growth',
    icon: 'TrendingUp',
    shortDesc: 'Data-driven paid ads, email marketing, and WhatsApp marketing campaigns that convert prospects into clients.',
    deliverables: [
      'Google Ads Setup (₹3,000)',
      'Meta Ads Setup (₹3,000)',
      'Monthly Ads Management (₹8,000/mo)',
      'Email Marketing (₹3,000)',
      'WhatsApp Marketing (₹3,000)',
    ],
    startingPrice: '₹3,000',
  },
  {
    id: 'automation',
    title: 'Automation & Solutions',
    category: 'Technology',
    icon: 'Bot',
    shortDesc: 'Automate customer support, lead bookings, and WhatsApp interactions with custom chatbots and CRM systems.',
    deliverables: [
      'WhatsApp Chatbot (₹10,000)',
      'AI Chatbot (₹20,000)',
      'CRM Setup (₹15,000)',
      'Booking System (₹15,000)',
    ],
    startingPrice: '₹10,000',
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    category: 'Media',
    icon: 'Video',
    shortDesc: 'High-quality video editing, promotional shoots, product photo editing, and eye-catching YouTube thumbnails.',
    deliverables: [
      'Product Photo Editing (₹3,000)',
      'Video Editing (₹5,000)',
      'Promotional Video (₹5,000)',
      'YouTube Thumbnail 10 Pack (₹3,000)',
    ],
    startingPrice: '₹3,000',
  },
];

export const PRICING_LIST: PricingItem[] = [
  // WEBSITE DEVELOPMENT
  { category: 'Website Development', name: 'Landing Page Website', price: '₹3,000', description: 'Single high-converting landing page with WhatsApp lead CTA' },
  { category: 'Website Development', name: 'Basic Business Website (3–5 Pages)', price: '₹8,000', description: 'Multi-page website for small businesses & service providers' },
  { category: 'Website Development', name: 'Professional Business Website', price: '₹15,000', description: 'Custom styled, multi-service website with dynamic content' },
  { category: 'Website Development', name: 'Premium Business Website', price: '₹25,000', description: 'Bespoke liquid glass design, animations & custom integrations' },
  { category: 'Website Development', name: 'E-commerce Website', price: '₹35,000', description: 'Full online store with payment gateway, catalog & cart' },
  { category: 'Website Development', name: 'Custom Web Application', price: '₹50,000+', description: 'Full-stack application with dashboard, DB & custom APIs' },
  { category: 'Website Development', name: 'WordPress Website', price: '₹10,000', description: 'Custom WordPress theme build with CMS admin controls' },
  { category: 'Website Development', name: 'Website Redesign', price: '₹8,000', description: 'Complete modernization, UI overhaul & speed optimization' },
  { category: 'Website Development', name: 'Website Speed Optimization', price: '₹5,000', description: 'Core Web Vitals tuning & lightning-fast page loading' },
  { category: 'Website Development', name: 'Website Maintenance', price: '₹3,000/month', description: 'Monthly security, content updates & technical care' },
  { category: 'Website Development', name: 'Website Security & Backup', price: '₹3,000', description: 'SSL setup, anti-malware protection & regular backups' },
  { category: 'Website Development', name: 'Domain & Hosting Setup', price: '₹3,000', description: 'Domain registration, DNS configuration & server deployment' },

  // SEO SERVICES
  { category: 'SEO Services', name: 'Basic SEO Audit', price: '₹3,000', description: 'Detailed technical website SEO diagnostic report' },
  { category: 'SEO Services', name: 'Local SEO', price: '₹4,000/month', description: 'Google Maps & local search ranking strategy' },
  { category: 'SEO Services', name: 'On-Page SEO', price: '₹8,000', description: 'Title tags, meta descriptions, content & keyword optimization' },
  { category: 'SEO Services', name: 'Complete SEO', price: '₹15,000/month', description: 'Full search domination, backlink building & organic growth' },
  { category: 'SEO Services', name: 'Google Business Profile Optimization', price: '₹5,000', description: 'Map listing verification, reviews & local map pack ranking' },

  // SOCIAL MEDIA MANAGEMENT
  { category: 'Social Media Management', name: 'Social Media Setup', price: '₹2,000', description: 'Complete profile optimization, branding & bio setup' },
  { category: 'Social Media Management', name: 'Monthly Social Media Management', price: '₹5,000/month', description: 'Regular posts, content scheduling & community management' },
  { category: 'Social Media Management', name: '15 Custom Posts', price: '₹5,000', description: '15 custom branded graphic design social posts' },
  { category: 'Social Media Management', name: '30 Custom Posts', price: '₹8,000', description: '30 custom branded graphic design social posts' },
  { category: 'Social Media Management', name: 'Reel Editing', price: '₹500/reel', description: 'High-retention short video reel editing with captions' },
  { category: 'Social Media Management', name: 'Monthly Reels Package', price: '₹6,000', description: 'Complete monthly package for viral Instagram reels' },
  { category: 'Social Media Management', name: 'Influencers Promotion', price: '₹4,000 – ₹15,000', description: 'Targeted local influencer outreach & campaign coordination' },
  { category: 'Social Media Management', name: 'Drone Shots', price: '₹3,000', description: 'High-definition aerial video footage for property & venues' },

  // BRANDING & DESIGN
  { category: 'Branding & Design', name: 'Logo Design', price: '₹3,000', description: 'Custom vector logo design with brand variations' },
  { category: 'Branding & Design', name: 'Brand Identity Kit', price: '₹10,000', description: 'Complete brand guidelines, color palettes, fonts & assets' },
  { category: 'Branding & Design', name: 'Business Card Design', price: '₹3,000', description: 'Double-sided premium print-ready business card layout' },
  { category: 'Branding & Design', name: 'Flyer / Brochure Design', price: '₹3,000', description: 'Eye-catching marketing flyer or multi-fold brochure' },
  { category: 'Branding & Design', name: 'Menu Design', price: '₹3,000', description: 'Custom menu card design for cafes, lounges & restaurants' },
  { category: 'Branding & Design', name: 'Banner Design', price: '₹3,000', description: 'Digital & physical banner designs for outdoor & web' },

  // DIGITAL MARKETING
  { category: 'Digital Marketing', name: 'Google Ads Setup', price: '₹3,000', description: 'Search campaign setup, keyword targeting & ad creation' },
  { category: 'Digital Marketing', name: 'Meta Ads Setup', price: '₹3,000', description: 'Instagram & Facebook campaign funnel configuration' },
  { category: 'Digital Marketing', name: 'Monthly Ads Management', price: '₹8,000/month', description: 'Continuous ad optimization, budget tuning & lead reporting' },
  { category: 'Digital Marketing', name: 'Email Marketing', price: '₹3,000', description: 'High-converting email copy & newsletter setup' },
  { category: 'Digital Marketing', name: 'WhatsApp Marketing', price: '₹3,000', description: 'Targeted broadcast messaging & sales automated copy' },

  // AUTOMATION & SOLUTIONS
  { category: 'Automation & Solutions', name: 'WhatsApp Chatbot', price: '₹10,000', description: 'Automated 24/7 WhatsApp reply & lead capture bot' },
  { category: 'Automation & Solutions', name: 'AI Chatbot', price: '₹20,000', description: 'Smart AI customer service agent trained on your business' },
  { category: 'Automation & Solutions', name: 'CRM Setup', price: '₹15,000', description: 'Lead tracking pipeline & automated customer sales CRM' },
  { category: 'Automation & Solutions', name: 'Booking System', price: '₹15,000', description: 'Automated appointment & client calendar scheduling' },

  // CONTENT CREATION
  { category: 'Content Creation', name: 'Product Photo Editing', price: '₹3,000', description: 'E-commerce background removal & color correction' },
  { category: 'Content Creation', name: 'Video Editing', price: '₹5,000', description: 'Professional video cutouts, sound effects & grading' },
  { category: 'Content Creation', name: 'Promotional Video', price: '₹5,000', description: 'High-impact commercial reel/video for social ads' },
  { category: 'Content Creation', name: 'YouTube Thumbnail (10 Pack)', price: '₹3,000', description: '10 click-worthy high-CTR YouTube thumbnails' },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'revolution-academy',
    title: 'Revolution Academy',
    category: 'Education',
    services: ['Website Development', 'SEO', 'Social Media Management'],
    result: 'Complete Digital Transformation & Increased Student Enrollments',
    description: 'Comprehensive digital growth and branding for Revolution Academy. Delivered a fast custom website, rank-boosting local SEO, and continuous strategic social media management.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
    isDemo: false,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Understanding Your Vision',
    description: 'We dive deep into your target audience, existing online assets, business goals, and competitive marketplace positioning.',
    deliverables: ['Brand Audit', 'Goal Mapping', 'Requirement Analysis'],
  },
  {
    number: '02',
    title: 'Strategy',
    subtitle: 'Architecting the Plan',
    description: 'We outline the exact website structure, content funnel, SEO keywords, social media calendar, and conversion hooks needed.',
    deliverables: ['Growth Blueprint', 'Content Strategy', 'Technology Stack Plan'],
  },
  {
    number: '03',
    title: 'Design',
    subtitle: 'Crafting Visual Excellence',
    description: 'Our design team creates sleek, liquid-glass wireframes and modern layouts tailored to position your business as an industry leader.',
    deliverables: ['UI/UX Mockups', 'Brand Collateral', 'Mobile-first Wireframes'],
  },
  {
    number: '04',
    title: 'Develop',
    subtitle: 'Engineering & Integration',
    description: 'We write clean, blazingly fast code, set up responsive styling, integrate WhatsApp forms, and configure search engine fundamentals.',
    deliverables: ['Responsive Web Build', 'WhatsApp System', 'Performance Tuning'],
  },
  {
    number: '05',
    title: 'Launch',
    subtitle: 'Quality Testing & Go-Live',
    description: 'Thorough testing across desktop and mobile devices, security verification, speed optimization, and seamless domain launch.',
    deliverables: ['Cross-device Audit', 'Live Deployment', 'Analytics Setup'],
  },
  {
    number: '06',
    title: 'Grow',
    subtitle: 'Marketing & Ongoing Support',
    description: 'We continuously produce reels, manage social channels, optimize search rankings, and provide continuous technical maintenance.',
    deliverables: ['Monthly Reels & Posts', 'SEO Monitoring', 'Ongoing Support'],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Websites',
    question: 'How much does a website cost?',
    answer: 'Website pricing starts from ₹3,000 for a single conversion landing page, ₹8,000 for a basic business website, ₹15,000 for a professional multi-service website, up to ₹25,000+ for premium custom animated websites. Final pricing depends on specific features and complexity.',
  },
  {
    category: 'Websites',
    question: 'How long does a website take to build?',
    answer: 'A standard landing page or basic business website usually takes 2–3 days. Complete custom professional or e-commerce websites generally take 5–7 days depending on feedback cycles and content readiness.',
  },
  {
    category: 'Websites',
    question: 'Do you provide website maintenance?',
    answer: 'Yes! We offer website maintenance including security updates, performance monitoring, content edits, and server management. Both our Growth and Premium packages include complimentary maintenance periods.',
  },
  {
    category: 'Social Media',
    question: 'Do you manage social media accounts & create reels?',
    answer: 'Yes, social media management and high-retention short reels creation are core specialties of Quantum Branding. Our complete packages include 15 to 30 custom reels, promotional content, captions, and hashtag strategies.',
  },
  {
    category: 'SEO & Marketing',
    question: 'Do you provide SEO & Search Visibility services?',
    answer: 'Absolutely. We offer Local SEO (starting at ₹4,000/mo), Google Business Profile optimization, keyword research, on-page SEO, and technical performance tuning so potential customers find you on Google.',
  },
  {
    category: 'SEO & Marketing',
    question: 'Can you manage digital advertising campaigns?',
    answer: 'Yes, we handle Meta (Instagram & Facebook) ads and Google Ads campaign management (₹8,000/mo) designed specifically to generate qualified sales leads.',
  },
  {
    category: 'Packages & Billing',
    question: 'Can I choose individual services or customize a package?',
    answer: 'Yes! While our "Complete Digital Growth Packages" (Growth ₹30,000 & Premium ₹50,000) offer the maximum cost savings and holistic impact, you can select any individual service from our menu.',
  },
  {
    category: 'Packages & Billing',
    question: 'How do I start a project with Quantum Branding?',
    answer: 'Starting is simple: Click "Start a Project" or "Enquire Now" on the website, fill in your details, or contact Founder Trayam Tiwari directly on WhatsApp (+91 8878080111) or email (hello.quantumbranding@gmail.com) for a free consultation.',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Result-Oriented Strategies',
    desc: 'Data-backed marketing and conversion-focused web design that drive real inquiries, sales leads, and measurable ROI.',
    icon: 'Target',
  },
  {
    title: 'Affordable Pricing',
    desc: 'Transparent pricing menu starting from ₹2,000–₹3,000 with zero hidden charges. High agency quality at accessible rates.',
    icon: 'ShieldCheck',
  },
  {
    title: 'On-Time Delivery',
    desc: 'Fast, dependable turnarounds for websites, social media content, branding kits, and marketing campaigns.',
    icon: 'Sparkles',
  },
  {
    title: 'Dedicated Support',
    desc: 'Direct communication overseen by Founder Trayam Tiwari. Quick responses, clear updates, and continuous assistance.',
    icon: 'UserCheck',
  },
  {
    title: 'Tailored Solutions for Every Business',
    desc: 'No generic cookie-cutter templates. Custom digital plans crafted specifically around your target audience and industry.',
    icon: 'Sliders',
  },
];

export const WEBINAR_OFFERINGS: WebinarItem[] = [
  {
    id: 'free-group-webinar',
    type: 'free',
    title: 'Free Digital Branding & Lead Gen Masterclass',
    subtitle: '60-Minute Interactive Group Masterclass for Business Owners & Entrepreneurs',
    priceFormatted: 'FREE (₹0)',
    priceNumber: 0,
    badge: '100% Free Live Masterclass',
    duration: '60 Minutes',
    format: 'Live Group Stream + Q&A',
    instructor: 'Trayam Tiwari',
    instructorRole: 'Founder & Digital Strategist',
    description: 'Learn the core principles of digital branding, high-converting website layouts, and organic social media lead funnels to grow your business without spending heavily on ads.',
    topics: [
      '5 Must-Have Website Blueprint Features for 3x Lead Conversion',
      'High-Retention Content Formula for Instagram Reels & Shorts',
      'Local Business SEO & Google Business Profile Ranking Tactics',
      'Live Q&A Session with Founder Trayam Tiwari'
    ],
    includes: [
      'Instant On-Demand Video Access & Pass',
      'Downloadable Growth Workbook & Checklist (PDF)',
      'Access to Exclusive Business Networking WhatsApp Group',
      'Free Website Audit Checklist Template'
    ],
    ctaText: 'Register for Free Masterclass',
    colorTheme: 'from-emerald-500 via-teal-600 to-cyan-600',
  },
  {
    id: 'paid-1on1-masterclass',
    type: 'paid_1on1',
    title: '1-on-1 VIP Strategy Workshop',
    subtitle: '90-Minute Private 1-on-1 Consultation & Custom Digital Audit for Your Business',
    priceFormatted: '₹999',
    originalPriceFormatted: '₹2,999',
    priceNumber: 999,
    badge: 'Private 1-on-1 Session (67% OFF)',
    duration: '90 Minutes',
    format: 'Private 1-on-1 Video Call (Zoom / Google Meet)',
    instructor: 'Trayam Tiwari',
    instructorRole: 'Founder — Quantum Branding',
    description: 'Get a private, personalized digital audit and tailored 90-day execution roadmap crafted exclusively for your business niche with Trayam Tiwari.',
    topics: [
      'Live 1-on-1 Live Audit of Your Current Website, SEO & Marketing',
      'Custom 90-Day Digital Growth Roadmap & Budget Optimization',
      'High-ROI Meta Ads & Google Ads Funnel Blueprint',
      'Tailored Content Strategy & Reel Script Templates'
    ],
    includes: [
      'Full HD Session Recording & Custom Presentation Slides',
      '90-Day Tailored Brand Growth Blueprint (PDF Report)',
      '14 Days Direct Founder WhatsApp Q&A Support',
      'VIP Access Pass & Quantum Growth Resource Pack'
    ],
    ctaText: 'Book 1-on-1 VIP Session (₹999)',
    colorTheme: 'from-blue-600 via-pink-600 to-amber-500',
  }
];
