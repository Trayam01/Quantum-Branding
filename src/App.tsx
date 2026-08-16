import React, { useState, useEffect } from 'react';
import { PageType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIHelperWidget } from './components/AIHelperWidget';
import { SEOHead } from './components/SEOHead';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { PackagesPage } from './pages/PackagesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { ProcessPage } from './pages/ProcessPage';
import { AIHelperPage } from './pages/AIHelperPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { WebinarPage } from './pages/WebinarPage';
import { LegalPage } from './pages/LegalPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const getPageFromHash = (): PageType => {
    const hash = window.location.hash.replace('#', '');
    const validPages: PageType[] = [
      'home', 'services', 'pricing', 'packages', 'portfolio', 
      'about', 'process', 'webinars', 'terms', 'refund-policy', 
      'return-policy', 'disclaimer', 'ai-helper', 'contact', 'faq', 'admin'
    ];
    if (validPages.includes(hash as PageType)) {
      return hash as PageType;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageType>(getPageFromHash);
  const [selectedPackageForContact, setSelectedPackageForContact] = useState<string>('');
  const [aiHelperModalOpen, setAiHelperModalOpen] = useState<boolean>(false);

  // Sync scroll and URL hash on page navigation
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackage = (packageName: string) => {
    setSelectedPackageForContact(packageName);
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFD] text-slate-800 relative selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Dynamic SEO Head Title & Meta Manager */}
      <SEOHead currentPage={currentPage} />

      {/* Immersive Soft White Palette Ambient Glows */}
      <div className="fixed top-[-10%] left-[-5%] w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[130px] pointer-events-none -z-10 animate-float-slow"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-rose-100/25 rounded-full blur-[140px] pointer-events-none -z-10 animate-float-medium"></div>
      <div className="fixed top-[25%] right-[5%] w-[420px] h-[420px] bg-amber-100/25 rounded-full blur-[110px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[20%] left-[8%] w-[450px] h-[450px] bg-white rounded-full blur-[80px] pointer-events-none -z-10"></div>

      {/* Global Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAIHelper={() => setAiHelperModalOpen(true)}
      />

      {/* Main Page Render */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAIHelper={() => setAiHelperModalOpen(true)}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'pricing' && (
          <PricingPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'packages' && (
          <PackagesPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'portfolio' && (
          <PortfolioPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'process' && (
          <ProcessPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'webinars' && (
          <WebinarPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'ai-helper' && (
          <AIHelperPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage initialPackage={selectedPackageForContact} onNavigate={handleNavigate} />
        )}

        {currentPage === 'faq' && (
          <FAQPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'admin' && (
          <AdminPage onNavigate={handleNavigate} />
        )}

        {(currentPage === 'terms' || currentPage === 'refund-policy' || currentPage === 'return-policy' || currentPage === 'disclaimer') && (
          <LegalPage
            initialType={currentPage as 'terms' | 'refund-policy' | 'return-policy' | 'disclaimer'}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* AI Growth Helper Modal */}
      <AIHelperWidget
        isOpen={aiHelperModalOpen}
        onClose={() => setAiHelperModalOpen(false)}
        onNavigate={(page) => {
          setAiHelperModalOpen(false);
          handleNavigate(page);
        }}
      />
    </div>
  );
}
