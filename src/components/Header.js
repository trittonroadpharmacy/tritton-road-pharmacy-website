import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Menu, X } from 'lucide-react';

export default function Header({ config }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCurrentlyOpen = () => {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const todayHours = config.hours.find(h => h.day === day);
    
    if (!todayHours?.isOpen) return false;
    
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const openParts = todayHours.open.replace(' AM', '').replace(' PM', '').split(':');
    const closeParts = todayHours.close.replace(' AM', '').replace(' PM', '').split(':');
    
    let openHour = parseInt(openParts[0]);
    let closeHour = parseInt(closeParts[0]);
    
    if (todayHours.open.includes('PM') && openHour !== 12) openHour += 12;
    if (todayHours.close.includes('PM') && closeHour !== 12) closeHour += 12;
    
    const openTime = openHour * 60 + (parseInt(openParts[1]) || 0);
    const closeTime = closeHour * 60 + (parseInt(closeParts[1]) || 0);
    
    return currentTime >= openTime && currentTime <= closeTime;
  };

  const openNow = isCurrentlyOpen();

  const headerStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    transition: 'all 0.3s',
    backgroundColor: isScrolled ? 'white' : 'rgba(255,255,255,0.95)',
    boxShadow: isScrolled ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
    backdropFilter: !isScrolled ? 'blur(8px)' : 'none'
  };

  return (
    <>
      {/* Top info bar */}
      <div style={{
        backgroundColor: '#1e5631',
        color: 'white',
        padding: '8px 16px',
        fontSize: '14px',
        display: 'none'
      }} className="top-bar">
        <style>{`@media (min-width: 768px) { .top-bar { display: block !important; } }`}</style>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href={`tel:${config.phone}`} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white',
              textDecoration: 'none'
            }}>
              <Phone size={16} />
              {config.phone}
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} />
              {config.address.line2}, {config.address.city}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} />
            <span style={{ color: openNow ? '#86efac' : '#fca5a5' }}>
              {openNow ? 'Open Now' : 'Currently Closed'}
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header style={headerStyle}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px'
          }}>
            {/* Logo */}
            <a href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none'
            }}>
              <img 
                src="/assets/pharmacy-logo.png" 
                alt={config.name}
                style={{
                  height: '64px',
                  width: 'auto',
                  borderRadius: '8px'
                }}
              />
              <div style={{ display: 'none' }} className="logo-text">
                <style>{`@media (min-width: 640px) { .logo-text { display: block !important; } }`}</style>
                <h1 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#1e5631',
                  margin: 0
                }}>{config.name}</h1>
                <p style={{
                  fontSize: '13px',
                  color: '#64748b',
                  margin: 0
                }}>Your Local Independent Community Pharmacy</p>
              </div>
              {/* NHS Badge */}
              <div style={{
                marginLeft: '12px',
                backgroundColor: '#005eb8',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 600,
                display: 'none'
              }} className="nhs-badge">
                <style>{`@media (min-width: 640px) { .nhs-badge { display: block !important; } }`}</style>
                NHS Services
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav style={{ display: 'none' }} className="desktop-nav">
              <style>{`@media (min-width: 768px) { .desktop-nav { display: flex !important; } }`}</style>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <a href="#about" style={{
                  color: '#334155',
                  textDecoration: 'none',
                  fontWeight: 500
                }}>About</a>
                <a href="#services" style={{
                  color: '#334155',
                  textDecoration: 'none',
                  fontWeight: 500
                }}>Services</a>
                <a href="#contact" style={{
                  color: '#334155',
                  textDecoration: 'none',
                  fontWeight: 500
                }}>Contact</a>
                <a href={`tel:${config.phone}`} style={{
                  backgroundColor: '#1e5631',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Phone size={16} />
                  Call Us
                </a>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                padding: '8px',
                color: '#334155',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'block'
              }}
              className="mobile-menu-btn"
            >
              <style>{`@media (min-width: 768px) { .mobile-menu-btn { display: none !important; } }`}</style>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: 'white',
            borderTop: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
          }} className="mobile-menu">
            <style>{`@media (min-width: 768px) { .mobile-menu { display: none !important; } }`}</style>
            <div style={{ padding: '16px' }}>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{
                display: 'block',
                padding: '12px 0',
                color: '#334155',
                fontWeight: 500,
                textDecoration: 'none'
              }}>About</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{
                display: 'block',
                padding: '12px 0',
                color: '#334155',
                fontWeight: 500,
                textDecoration: 'none'
              }}>Services</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{
                display: 'block',
                padding: '12px 0',
                color: '#334155',
                fontWeight: 500,
                textDecoration: 'none'
              }}>Contact</a>
              <a href={`tel:${config.phone}`} style={{
                display: 'block',
                width: '100%',
                backgroundColor: '#1e5631',
                color: 'white',
                textAlign: 'center',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 500,
                textDecoration: 'none',
                marginTop: '8px'
              }}>
                Call {config.phone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
