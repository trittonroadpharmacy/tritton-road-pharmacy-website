import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import About from './components/About';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import CookieConsent from './components/CookieConsent';
import ReviewTicker from './components/ReviewTicker';
import PatientSignupModal from './components/PatientSignupModal';
import SignupPage from './components/SignupPage';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import AreaPage from './components/AreaPage';

// API URL for backend services
const API_URL = process.env.REACT_APP_API_URL || 'https://www.pharmadpro.co.uk/api';

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
    { id: "prescriptions", name: "Prescription Services", description: "Collect your NHS and private prescriptions. Free collection from local GP surgeries.", icon: "FileText", enabled: true, isNHS: true },
    { id: "contraception", name: "NHS Contraception Service", description: "Free confidential contraception advice and supply. No appointment needed.", icon: "Heart", enabled: true, isNHS: true },
    { id: "flu-vaccination", name: "Flu Vaccination", description: "Protect yourself this winter. Free for eligible NHS patients or available privately.", icon: "Syringe", enabled: true, isNHS: true },
    { id: "blood-pressure", name: "Blood Pressure Check", description: "Free NHS blood pressure check service. Walk in, no appointment required.", icon: "Activity", enabled: true, isNHS: true },
    { id: "health-advice", name: "Health Advice", description: "Speak to our pharmacists for professional advice on minor ailments.", icon: "MessageCircle", enabled: true, isNHS: false },
    { id: "medicine-reviews", name: "Medicines Use Review", description: "Free NHS service to help you get the most from your medicines.", icon: "ClipboardList", enabled: true, isNHS: true },
    { id: "emergency-supply", name: "Emergency Medicine Supply", description: "Run out of your regular medication? We can help with emergency supplies.", icon: "AlertCircle", enabled: true, isNHS: false },
    { id: "new-medicine-service", name: "New Medicine Service", description: "Free NHS support when you start a new medicine for a long-term condition.", icon: "Pill", enabled: true, isNHS: true }
  ]
};

function App() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [signupOpen, setSignupOpen] = useState(false);
  // useReducer(x => x + 1, 0) returns [_, bump]. The bump value is unused
  // (we never read it) — we only need the rerender it triggers. Using
  // useReducer here keeps both CRA's CI lint AND modern eslint happy.
  const [, bumpRoute] = React.useReducer(x => x + 1, 0);

  // Re-render whenever the browser URL changes (back / forward / pushState)
  useEffect(() => {
    const onPop = () => bumpRoute();
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Detect /signup path — used as a dedicated landing page for social campaigns
  const isSignupPage = typeof window !== 'undefined' &&
    (window.location.pathname === '/signup' || window.location.pathname === '/signup/');

  // Detect /blog and /blog/{slug} paths
  const blogMatch = typeof window !== 'undefined'
    ? window.location.pathname.match(/^\/blog\/?(.*?)\/?$/)
    : null;
  const isBlogList = blogMatch && !blogMatch[1];
  const blogSlug = blogMatch && blogMatch[1] ? blogMatch[1] : null;

  // Detect /areas/{slug} (local SEO landing pages)
  const areaMatch = typeof window !== 'undefined'
    ? window.location.pathname.match(/^\/areas\/([^/]+)\/?$/)
    : null;
  const areaSlug = areaMatch ? areaMatch[1] : null;

  // Derive activePage from the URL — every tab is now a real route so:
  //   1. Each tab change fires a real pushState → website-analytics tracker
  //      records a fresh pageview (fixes the 100% bounce rate bug).
  //   2. Googlebot crawls /about, /services, /reviews, /contact as
  //      distinct, indexable pages (helps local SEO).
  const activePage = (() => {
    if (typeof window === 'undefined') return 'about';
    const p = window.location.pathname.replace(/\/$/, '');
    if (p === '/services') return 'services';
    if (p === '/reviews') return 'reviews';
    if (p === '/contact') return 'contact';
    if (p === '/about' || p === '' || p === '/') return 'about';
    return 'about';
  })();

  const setActivePage = (page) => {
    const path = page === 'about' ? '/' : `/${page}`;
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get(`${API_URL}/pharmacy-admin/settings/public`);
        if (res.data) {
          setConfig(prev => ({ ...prev, ...res.data }));
        }
      } catch (error) {
        console.log('Using default config');
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  // Update page title — set per active tab so each pushState pageview the
  // tracker sends is tagged with a distinct, meaningful page_title.
  useEffect(() => {
    if (isSignupPage) {
      document.title = `Sign Up — NHS Prescriptions & Services | ${config.name}`;
    } else if (isBlogList) {
      document.title = `Pharmacy Health Blog — ${config.name} Lincoln`;
    } else if (blogSlug) {
      document.title = `Loading article… | ${config.name}`;
    } else if (areaSlug) {
      // AreaPage component overrides the title once loaded
      document.title = `Loading… | ${config.name}`;
    } else if (activePage === 'services') {
      document.title = `Services & NHS Treatments | ${config.name} Lincoln`;
    } else if (activePage === 'reviews') {
      document.title = `Patient Reviews | ${config.name} Lincoln`;
    } else if (activePage === 'contact') {
      document.title = `Contact Us | ${config.name} Lincoln LN6 7QL`;
    } else {
      document.title = `${config.name} | NHS Pharmacy Services in Lincoln | LN6`;
    }
  }, [config.name, isSignupPage, isBlogList, blogSlug, areaSlug, activePage]);

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
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const renderPage = () => {
    if (isSignupPage) {
      return <SignupPage />;
    }
    if (areaSlug) {
      return (
        <AreaPage
          slug={areaSlug}
          onBack={() => { window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}
          onOpenSignup={() => setSignupOpen(true)}
        />
      );
    }
    if (blogSlug) {
      return (
        <BlogPost
          slug={blogSlug}
          onBack={() => { window.history.pushState({}, '', '/blog'); window.dispatchEvent(new PopStateEvent('popstate')); }}
          onOpenSignup={() => setSignupOpen(true)}
        />
      );
    }
    if (isBlogList) {
      return (
        <Blog
          onBack={() => { window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}
        />
      );
    }
    switch (activePage) {
      case 'about':
        return <About config={config} />;
      case 'services':
        return <Services config={config} />;
      case 'reviews':
        return <Reviews config={config} />;
      case 'contact':
        return <Contact config={config} />;
      default:
        return <About config={config} />;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f8fafc'
    }}>
      {/* Header with navigation */}
      <Header
        config={config}
        activePage={activePage}
        setActivePage={setActivePage}
        onSignupClick={() => {
          if (isSignupPage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            setSignupOpen(true);
          }
        }}
      />
      
      {/* Persistent Review Ticker - Always visible below header */}
      <ReviewTicker />
      
      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      
      {/* Footer */}
      <Footer config={config} />
      
      {/* Chatbot */}
      <Chatbot 
        config={config}
        apiUrl={API_URL}
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
      />
      
      {/* Cookie Consent */}
      <CookieConsent />

      {/* Patient sign-up modal — auto-opens after 6s, also triggered by Header button.
          Skipped on /signup and /blog* since those pages have their own CTAs. */}
      {!isSignupPage && !isBlogList && !blogSlug && !areaSlug && (
        <PatientSignupModal
          isOpen={signupOpen}
          onOpen={() => setSignupOpen(true)}
          onClose={() => setSignupOpen(false)}
          autoOpenAfterMs={6000}
        />
      )}
    </div>
  );
}

export default App;
