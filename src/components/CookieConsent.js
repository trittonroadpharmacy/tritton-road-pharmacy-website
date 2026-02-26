import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already responded to cookie consent
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      essential: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const handleClose = () => {
    // Even if they close without accepting, essential cookies are still used
    localStorage.setItem('cookie_consent', JSON.stringify({
      essential: true,
      dismissed: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
      zIndex: 100,
      animation: 'slideUp 0.3s ease-out'
    }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }} className="cookie-banner-content">
        <style>{`
          @media (min-width: 768px) {
            .cookie-banner-content {
              flex-direction: row !important;
              align-items: center !important;
            }
          }
        `}</style>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
          <Cookie size={24} style={{ color: '#1e5631', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
              Cookie Notice
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>
              This website uses only <strong>essential cookies</strong> required for the site to function properly. 
              We do not use tracking or analytics cookies. Essential cookies do not require consent under UK law. 
              See our <a href="/privacy" style={{ color: '#1e5631', textDecoration: 'underline' }}>Privacy Policy</a> for more details.
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={handleAccept}
            style={{
              backgroundColor: '#1e5631',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '9999px',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}
          >
            Got it
          </button>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              color: '#64748b'
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
