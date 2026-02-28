import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import GoogleReviews from './components/GoogleReviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookieConsent from './components/CookieConsent';
import ReviewTicker from './components/ReviewTicker';
import useAnalytics from './hooks/useAnalytics';

// API URL for backend services (PharmAdPro backend)
// Uses environment variable for deployment, falls back to production PharmAdPro API
const API_URL = process.env.REACT_APP_API_URL || 'https://www.pharmadpro.co.uk/api';

// SEO: Lincoln Area Keywords (15-mile radius targeting)
const LINCOLN_SEO_KEYWORDS = [
  'pharmacy Lincoln',
  'pharmacy near me Lincoln',
  'NHS pharmacy Lincoln',
  'prescription services Lincoln',
  'Tritton Road pharmacy',
  'pharmacy LN6',
  'community pharmacy Lincolnshire',
  'pharmacy flu jab Lincoln',
  'NHS Pharmacy First Lincoln',
  'blood pressure check Lincoln',
  'prescription collection Lincoln',
  'emergency medicine supply Lincoln',
  'pharmacy North Hykeham',
  'pharmacy Waddington',
  'pharmacy Bracebridge Heath',
  'pharmacy Washingborough',
  'pharmacy Skellingthorpe',
  'pharmacy Branston Lincoln'
];

// Default pharmacy configuration
const DEFAULT_CONFIG = {
  name: "Tritton Road Pharmacy",
  tagline: "Your Local Independent Community Pharmacy",
  address: {
    line1: "U1 Morrisons Supermarket",
    line2: "Tritton Road",
    city: "Lincoln",
    postcode: "LN6 7QL",
    full: "U1 Morrisons Supermarket, Tritton Road, Lincoln, LN6 7QL"
  },
  phone: "01522 537145",
  email: "trittonroadpharmacy@gmail.com",
  googleMapsUrl: "https://www.google.com/maps/search/Tritton+Road+Pharmacy+U1+MORRISONS+SUPERMARKET+TRITTON+ROAD+LINCOLN+++LN6+7QL",
  bankHolidayNotice: "Opening hours may differ on bank and public holidays. Please call to confirm.",
  hours: [
    { day: "Monday", open: "9:00 AM", close: "6:00 PM", isOpen: true },
    { day: "Tuesday", open: "9:00 AM", close: "6:00 PM", isOpen: true },
    { day: "Wednesday", open: "9:00 AM", close: "6:00 PM", isOpen: true },
    { day: "Thursday", open: "9:00 AM", close: "6:00 PM", isOpen: true },
    { day: "Friday", open: "9:00 AM", close: "6:00 PM", isOpen: true },
    { day: "Saturday", open: "9:00 AM", close: "1:00 PM", isOpen: true },
    { day: "Sunday", open: "", close: "", isOpen: false }
  ],
  services: [
    { id: "nhs-pharmacy-first", name: "NHS Pharmacy First", description: "Get treatment for 7 common conditions without a GP appointment. Free NHS service.", icon: "Stethoscope", enabled: true, isNHS: true },
    { id: "prescriptions", name: "Prescription Services", description: "Collect your NHS and private prescriptions. We offer a free prescription collection service from local GP surgeries.", icon: "FileText", enabled: true, isNHS: true },
    { id: "contraception", name: "NHS Contraception Service", description: "Free confidential contraception advice and supply. No appointment needed.", icon: "Heart", enabled: true, isNHS: true },
    { id: "flu-vaccination", name: "Flu Vaccination", description: "Protect yourself this winter. Free for eligible NHS patients or available privately.", icon: "Syringe", enabled: true, isNHS: true },
    { id: "blood-pressure", name: "Blood Pressure Check", description: "Free NHS blood pressure check service. Walk in, no appointment required.", icon: "Activity", enabled: true, isNHS: true },
    { id: "health-advice", name: "Health Advice", description: "Speak to our pharmacists for professional advice on minor ailments and medications.", icon: "MessageCircle", enabled: true, isNHS: false },
    { id: "medicine-reviews", name: "Medicines Use Review", description: "Free NHS service to help you get the most from your medicines.", icon: "ClipboardList", enabled: true, isNHS: true },
    { id: "emergency-supply", name: "Emergency Medicine Supply", description: "Run out of your regular medication? We can help with emergency supplies.", icon: "AlertCircle", enabled: true, isNHS: false },
    { id: "new-medicine-service", name: "New Medicine Service", description: "Free NHS support when you start a new medicine for a long-term condition.", icon: "Pill", enabled: true, isNHS: true }
  ]
};

// Page tracker component - tracks page views
function PageTracker({ trackEvent }) {
  const location = useLocation();
  
  useEffect(() => {
    // Track page navigation
    trackEvent('page_navigation', { path: location.pathname });
  }, [location.pathname, trackEvent]);
  
  return null;
}

// Home page component
function HomePage({ config, chatOpen, setChatOpen, trackEvent }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <ReviewTicker />
      <Header config={config} />
      <Hero config={config} trackEvent={trackEvent} />
      <About config={config} />
      <Services config={config} />
      <GoogleReviews config={config} />
      <Contact config={config} trackEvent={trackEvent} />
      <Footer config={config} />
      <Chatbot 
        config={config}
        apiUrl={API_URL}
        isOpen={chatOpen}
        onToggle={() => {
          setChatOpen(!chatOpen);
          if (!chatOpen) {
            trackEvent('chatbot_opened', {});
          }
        }}
      />
      <CookieConsent />
    </div>
  );
}

function App() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Scroll to About section on page load for better first impression
    const scrollTimer = setTimeout(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
    
    return () => clearTimeout(scrollTimer);
  }, []);

  useEffect(() => {
    // Try to fetch settings from admin panel
    const fetchConfig = async () => {
      try {
        const res = await axios.get(`${API_URL}/pharmacy-admin/settings/public`);
        if (res.data) {
          setConfig(prev => ({
            ...prev,
            ...res.data,
            address: {
              ...prev.address,
              ...res.data.address,
              full: `${res.data.address?.line1 || prev.address.line1}, ${res.data.address?.line2 || prev.address.line2}, ${res.data.address?.city || prev.address.city}, ${res.data.address?.postcode || prev.address.postcode}`
            }
          }));
        }
      } catch (error) {
        console.log('Using default config');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // Update SEO meta tags dynamically
  useEffect(() => {
    // Update document title for SEO
    document.title = `${config.name} | NHS Pharmacy Services in Lincoln, Lincolnshire | LN6`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        `${config.name} - Your trusted NHS community pharmacy in Lincoln, LN6. ${config.tagline}. Offering NHS Pharmacy First, prescriptions, flu jabs, blood pressure checks. Serving Lincoln, North Hykeham, Waddington, and surrounding areas within 15 miles.`
      );
    }
    
    // Update keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', LINCOLN_SEO_KEYWORDS.join(', '));
    
    // Add geo meta tags for local SEO
    const addGeoMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    addGeoMeta('geo.region', 'GB-LCN');
    addGeoMeta('geo.placename', 'Lincoln');
    addGeoMeta('geo.position', '53.2119;-0.5471');
    addGeoMeta('ICBM', '53.2119, -0.5471');
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://trittonroadpharmacy.co.uk');
    
  }, [config]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#1e5631',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderTopColor: 'white',
            borderRadius: '50%',
            margin: '0 auto 16px',
            animation: 'spin 1s linear infinite'
          }} />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <PageTracker trackEvent={trackEvent} />
      <Routes>
        <Route path="/" element={<HomePage config={config} chatOpen={chatOpen} setChatOpen={setChatOpen} trackEvent={trackEvent} />} />
        <Route path="/privacy" element={<PrivacyPolicy config={config} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
