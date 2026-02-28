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
  const [activePage, setActivePage] = useState('about');

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

  // Update page title
  useEffect(() => {
    document.title = `${config.name} | NHS Pharmacy Services in Lincoln | LN6`;
  }, [config.name]);

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
      <Header config={config} activePage={activePage} setActivePage={setActivePage} />
      
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
    </div>
  );
}

export default App;
