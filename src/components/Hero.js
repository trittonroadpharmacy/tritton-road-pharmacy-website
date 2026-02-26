import React from 'react';
import { MapPin, Clock, ArrowRight, Shield } from 'lucide-react';

export default function Hero({ config }) {
  const getTodayHours = () => {
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayHours = config.hours.find(h => h.day === day);
    if (!todayHours?.isOpen) return "Closed today";
    return `${todayHours.open} - ${todayHours.close}`;
  };

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1e5631 0%, #2d7a47 50%, #1e5631 100%)'
    }}>
      {/* Pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L30 60M0 30L60 30' stroke='%23fff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`
      }} />

      <div style={{
        position: 'relative',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '64px 16px'
      }}>
        <div style={{
          display: 'grid',
          gap: '48px',
          alignItems: 'center'
        }} className="hero-grid">
          <style>{`
            @media (min-width: 1024px) {
              .hero-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>
          
          {/* Left content */}
          <div style={{ color: 'white' }}>
            {/* NHS Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#005eb8',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '16px'
            }}>
              <Shield size={16} />
              NHS Pharmacy - Providing NHS Services
            </div>
            
            {/* Pharmacy First Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 500,
              marginBottom: '24px',
              marginLeft: '8px'
            }}>
              NHS Pharmacy First Available
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '24px'
            }}>
              {config.name}
            </h1>

            <p style={{
              fontSize: '1.25rem',
              color: '#bbf7d0',
              maxWidth: '560px',
              marginBottom: '32px',
              lineHeight: 1.6
            }}>
              {config.tagline}. Professional healthcare advice and NHS services for you and your family.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '32px'
            }}>
              <a href="#services" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'white',
                color: '#1e5631',
                padding: '16px 32px',
                borderRadius: '9999px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
              }}>
                View Our Services
                <ArrowRight size={20} />
              </a>
              <a href={config.googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '9999px',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(4px)'
              }}>
                <MapPin size={20} />
                Get Directions
              </a>
            </div>

            {/* Quick info */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              color: '#bbf7d0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={20} />
                <span>Inside Morrisons, Lincoln</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={20} />
                <span>Today: {getTodayHours()}</span>
              </div>
            </div>
          </div>

          {/* Right side - Card */}
          <div style={{ display: 'none' }} className="hero-card">
            <style>{`@media (min-width: 1024px) { .hero-card { display: block !important; } }`}</style>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              transform: 'rotate(2deg)',
              transition: 'transform 0.5s'
            }}>
              <img 
                src="/assets/pharmacy-logo.png" 
                alt={config.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  marginBottom: '24px'
                }}
              />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1e5631',
                marginBottom: '16px'
              }}>Why Choose Us?</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Free NHS Pharmacy First consultations',
                  'Convenient location inside Morrisons',
                  'Friendly, professional pharmacists',
                  'No appointment needed for most services'
                ].map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#dcfce7',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg style={{ width: '14px', height: '14px', color: '#1e5631' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span style={{ color: '#334155' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
      }}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
