import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Gemini AI initialization failed:', err);
  }
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    agency: 'Quantum Branding',
    founder: 'Trayam Tiwari',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
  });
});

// AI Growth Helper Endpoint
app.post('/api/ai-helper', async (req, res) => {
  try {
    const { businessType, websiteStatus, primaryProblem, mainGoal, budgetRange } = req.body;

    // Fallback logic generator if Gemini isn't configured or fails
    const generateFallbackRecommendation = () => {
      const isHighBudget = budgetRange === '₹50,000+' || budgetRange === '₹25,000–₹50,000';
      const needsWeb = websiteStatus?.toLowerCase().includes('no') || websiteStatus?.toLowerCase().includes('redesign');

      let recPackage = 'Growth Package (₹30,000)';
      let mainServ = 'Website Development & Social Media';
      let reasoning = `Based on your business type (${businessType || 'General Business'}) and your primary goal (${mainGoal || 'Growth'}), a multi-channel digital presence will deliver the highest ROI.`;

      if (isHighBudget) {
        recPackage = 'Premium Package (₹50,000)';
        reasoning = `With your budget range and goal to ${mainGoal || 'scale'}, the Premium Package provides complete market dominance with 30 Reels, 4 Promotional Reels, 2 months of social media management, and full branding support.`;
      } else if (budgetRange === '₹3,000–₹10,000') {
        recPackage = needsWeb ? 'Basic Business Website (₹8,000+)' : 'Social Media Setup & Reels (₹8,000)';
        mainServ = needsWeb ? 'Website Development' : 'Social Media Content';
        reasoning = 'For immediate lead capture on a focused budget, establishing a strong, high-converting core asset is the best starting step.';
      }

      return {
        recommendedPackage: recPackage,
        primaryService: mainServ,
        additionalServices: [
          'WhatsApp Enquiry System Integration',
          'Local SEO Optimization',
          'Social Media Reels Creation',
        ],
        summaryReasoning: reasoning,
        estimatedTimeline: '7 – 14 Days',
        actionPlan: [
          'Schedule a 15-minute discovery call with Founder Trayam Tiwari',
          'Define your target customer demographic and brand positioning',
          'Execute the initial design wireframes and content strategy',
          'Launch the digital assets and initiate lead generation campaigns',
        ],
      };
    };

    if (!ai) {
      return res.json({
        success: true,
        recommendation: generateFallbackRecommendation(),
        source: 'demo-engine',
      });
    }

    // Call Gemini 3.6 Flash
    const prompt = `You are Quantum AI Growth Helper, an expert B2B digital agency consultant for Quantum Branding (founded by Trayam Tiwari).
Analyze the following client scenario and recommend the best service or package:
- Business Type: ${businessType || 'Not specified'}
- Website Status: ${websiteStatus || 'Not specified'}
- Biggest Challenge/Problem: ${primaryProblem || 'Not specified'}
- Main Goal: ${mainGoal || 'Not specified'}
- Budget Range: ${budgetRange || 'Not specified'}

Available Packages & Services at Quantum Branding:
1. GROWTH PACKAGE (₹30,000): Website + 15 Reels + 2 Promo Reels + 1Mo Maintenance + 1Mo SMM + Basic SEO + WhatsApp System.
2. PREMIUM PACKAGE (₹50,000 - Most Complete): Premium Web + 30 Reels + 4 Promo Reels + 2Mo Maintenance + 2Mo SMM + Advanced Strategy + SEO + WhatsApp System + Branding Support.
3. Individual Services: Landing Page Website (₹3,000+), Basic Website (₹8,000+), Professional Website (₹15,000+), Local SEO (₹4,000/mo), Monthly SMM (₹5,000/mo), 30 Posts (₹8,000), Meta/Google Ads (₹8,000/mo).

Respond ONLY with a valid JSON object matching this schema:
{
  "recommendedPackage": "Exact package or service name",
  "primaryService": "Primary focus area",
  "additionalServices": ["Service 1", "Service 2"],
  "summaryReasoning": "Concise 2-3 sentence strategic explanation of why this is the ideal recommendation for them.",
  "estimatedTimeline": "e.g. 7-10 Days",
  "actionPlan": ["Step 1", "Step 2", "Step 3"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    let parsedRecommendation;
    try {
      parsedRecommendation = JSON.parse(text);
    } catch {
      parsedRecommendation = generateFallbackRecommendation();
    }

    return res.json({
      success: true,
      recommendation: parsedRecommendation,
      source: 'gemini-ai',
    });
  } catch (error) {
    console.error('Error in AI Helper:', error);
    // Fallback on error
    return res.json({
      success: true,
      recommendation: {
        recommendedPackage: 'GROWTH PACKAGE (₹30,000)',
        primaryService: 'Complete Digital Transformation',
        additionalServices: ['Website Development', 'Reels Creation', 'Social Media Management'],
        summaryReasoning: 'Quantum Branding recommends starting with our flagship Growth Package to establish a high-converting website paired with engaging video content.',
        estimatedTimeline: '7 – 10 Days',
        actionPlan: [
          'Contact Trayam Tiwari directly on WhatsApp (+91 8878080111)',
          'Review brand requirements and visual direction',
          'Deploy custom web and social media strategy',
        ],
      },
      source: 'fallback-error',
    });
  }
});

// In-Memory persistent data store for Enquiries & Webinar Registrations
interface ServerEnquiry {
  id: string;
  name: string;
  business?: string;
  phone: string;
  email?: string;
  service: string;
  budget?: string;
  message?: string;
  status: string;
  source: string;
  createdAt: string;
}

interface ServerWebinarRegistration {
  id: string;
  name: string;
  phone: string;
  email?: string;
  businessName?: string;
  preferredSlot: string;
  webinarId: string;
  webinarTitle: string;
  webinarType: string;
  ticketNumber: string;
  status: string;
  createdAt: string;
}

// Pre-seeded verified records
const serverEnquiries: ServerEnquiry[] = [
  {
    id: 'enq-seed-1',
    name: 'Alok Verma',
    business: 'Revolution Academy (Re-admission Phase)',
    phone: '9826194720',
    email: 'alok.revolution@gmail.com',
    service: 'Complete Growth Package (₹30,000)',
    budget: '₹25,000–₹50,000',
    message: 'We achieved 400+ admissions last session. Looking to scale to 600+ with 30 reels and digital ad funnels.',
    status: 'In Progress',
    source: 'website',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'enq-seed-2',
    name: 'Priya Sundaram',
    business: 'Apex Fitness Studio',
    phone: '9123456780',
    email: 'priya@apexfitness.in',
    service: 'Social Media Management & Reels (₹8,000/mo)',
    budget: '₹10,000–₹25,000',
    message: 'Need 15 high-converting Instagram Reels and local gym member acquisition campaign.',
    status: 'New',
    source: 'website',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'enq-seed-3',
    name: 'Rohan Deshmukh',
    business: 'Deshmukh Solar Systems',
    phone: '9425012345',
    email: 'rohan@deshmukhsolar.com',
    service: 'Professional Website (₹15,000+)',
    budget: '₹25,000–₹50,000',
    message: 'Require high-speed responsive website with WhatsApp lead capture and solar ROI calculator.',
    status: 'Contacted',
    source: 'website',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  }
];

const serverWebinarRegistrations: ServerWebinarRegistration[] = [
  {
    id: 'web-seed-1',
    name: 'Vikramaditya Rathore',
    phone: '9893012984',
    email: 'vikram.rathore@gmail.com',
    businessName: 'Rathore Jewelers & Fine Craft',
    preferredSlot: 'This Saturday at 7:00 PM IST',
    webinarId: 'scale-0-to-10x',
    webinarTitle: 'Digital Dominance Masterclass: Scale from 0 to 10X',
    webinarType: 'free',
    ticketNumber: 'QB-101-948201',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'web-seed-2',
    name: 'Kavita Chawla',
    phone: '9827011928',
    email: 'kavita@chawlaexim.com',
    businessName: 'Chawla Handloom Exports',
    preferredSlot: 'Tomorrow at 4:00 PM IST',
    webinarId: 'vip-1on1-growth',
    webinarTitle: '1-on-1 VIP Strategy Audit with Trayam Tiwari',
    webinarType: 'paid_1on1',
    ticketNumber: 'QB-101-729104',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  }
];

// Enquiry Form Endpoint
app.post('/api/enquire', (req, res) => {
  const { name, businessName, business, phone, email, businessType, requiredService, service, budget, message, status, source } = req.body;

  const newEnquiry: ServerEnquiry = {
    id: `enq-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    name: name || 'Anonymous Client',
    business: businessName || business || '',
    phone: phone || '',
    email: email || '',
    service: requiredService || service || 'Complete Growth Package (₹30,000)',
    budget: budget || '₹25,000–₹50,000',
    message: message || '',
    status: status || 'New',
    source: source || 'website',
    createdAt: new Date().toISOString(),
  };

  serverEnquiries.unshift(newEnquiry);

  const textMessage = `Hello Quantum Branding! I'm submitting an enquiry through your website:
📌 Name: ${newEnquiry.name}
🏢 Business: ${newEnquiry.business || 'N/A'}
📞 Phone: ${newEnquiry.phone}
✉️ Email: ${newEnquiry.email || 'N/A'}
💼 Type: ${businessType || 'N/A'}
🎯 Service Required: ${newEnquiry.service}
💰 Budget: ${newEnquiry.budget}
💬 Message: ${newEnquiry.message || 'Looking forward to discussing our project.'}`;

  const encodedText = encodeURIComponent(textMessage);
  const whatsappUrl = `https://wa.me/918878080111?text=${encodedText}`;

  res.json({
    success: true,
    message: 'Enquiry processed and saved successfully!',
    enquiry: newEnquiry,
    whatsappUrl,
    contactInfo: {
      phone: '8878080111',
      email: 'hello.quantumbranding@gmail.com',
      whatsapp: '+91 8878080111',
      founder: 'Trayam Tiwari',
    },
  });
});

// Admin Enquiries API
app.get('/api/admin/enquiries', (req, res) => {
  res.json({
    success: true,
    count: serverEnquiries.length,
    enquiries: serverEnquiries,
  });
});

app.patch('/api/admin/enquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const found = serverEnquiries.find(e => e.id === id);
  if (found) {
    if (status) found.status = status;
    return res.json({ success: true, enquiry: found });
  }
  return res.status(404).json({ success: false, message: 'Enquiry not found' });
});

app.delete('/api/admin/enquiries/:id', (req, res) => {
  const { id } = req.params;
  const index = serverEnquiries.findIndex(e => e.id === id);
  if (index !== -1) {
    serverEnquiries.splice(index, 1);
    return res.json({ success: true, message: 'Enquiry deleted' });
  }
  return res.status(404).json({ success: false, message: 'Enquiry not found' });
});

// Webinar Registration API
app.post('/api/webinar/register', (req, res) => {
  const { name, phone, email, businessName, preferredSlot, webinarId, webinarTitle, webinarType, ticketNumber } = req.body;

  const generatedTicket = ticketNumber || `QB-101-${Math.floor(100000 + Math.random() * 900000)}`;
  const newRegistration: ServerWebinarRegistration = {
    id: `web-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    name: name || 'Attendee',
    phone: phone || '',
    email: email || '',
    businessName: businessName || '',
    preferredSlot: preferredSlot || 'Instant On-Demand Access',
    webinarId: webinarId || 'digital-masterclass',
    webinarTitle: webinarTitle || 'Digital Dominance Masterclass',
    webinarType: webinarType || 'free',
    ticketNumber: generatedTicket,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };

  serverWebinarRegistrations.unshift(newRegistration);

  res.json({
    success: true,
    ticketNumber: generatedTicket,
    registration: newRegistration,
  });
});

app.get('/api/admin/webinars', (req, res) => {
  res.json({
    success: true,
    count: serverWebinarRegistrations.length,
    registrations: serverWebinarRegistrations,
  });
});

app.patch('/api/admin/webinars/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const found = serverWebinarRegistrations.find(w => w.id === id);
  if (found) {
    if (status) found.status = status;
    return res.json({ success: true, registration: found });
  }
  return res.status(404).json({ success: false, message: 'Registration not found' });
});

app.delete('/api/admin/webinars/:id', (req, res) => {
  const { id } = req.params;
  const index = serverWebinarRegistrations.findIndex(w => w.id === id);
  if (index !== -1) {
    serverWebinarRegistrations.splice(index, 1);
    return res.json({ success: true, message: 'Registration deleted' });
  }
  return res.status(404).json({ success: false, message: 'Registration not found' });
});

// Sitemap XML Route for SEO Crawlers
app.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  const baseUrl = 'https://quantumbranding.agency';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/#services</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#portfolio</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#packages</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#pricing</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#webinars</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#faq</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;
  res.send(xml);
});

// Robots.txt Route
app.get('/robots.txt', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /#admin

Sitemap: https://quantumbranding.agency/sitemap.xml`);
});

// Vite or Static Middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Quantum Branding Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
