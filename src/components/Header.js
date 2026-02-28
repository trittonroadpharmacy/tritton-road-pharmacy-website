import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Menu, X } from 'lucide-react';

export default function Header({ config, activePage, setActivePage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Top info bar */}
      <div style={{
        backgroundColor: '#1e5631',
        color: 'white',
        padding: '8px 16px',
        fontSize: '14px'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a href={`tel:${config.phone}`} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'white',
              textDecoration: 'none'
            }}>
              <Phone size={14} />
              {config.phone}
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} />
              {config.address.line2}, {config.address.city}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} />
            <span style={{ 
              color: openNow ? '#86efac' : '#fca5a5',
              fontWeight: 500
            }}>
              {openNow ? 'Open Now' : 'Currently Closed'}
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'white',
        boxShadow: isScrolled ? '0 2px 8px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px'
          }}>
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('about')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <img 
                src="/assets/pharmacy-logo.png" 
                alt={config.name}
                style={{ height: '56px', width: 'auto', borderRadius: '8px' }}
              />
              <div style={{ textAlign: 'left' }}>
                <h1 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1e5631',
                  margin: 0
                }}>{config.name}</h1>
                <p style={{
                  fontSize: '12px',
                  color: '#64748b',
                  margin: 0
                }}>Your Local Community Pharmacy</p>
              </div>
              <div style={{
                marginLeft: '8px',
                backgroundColor: '#005eb8',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 600
              }}>
                NHS
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
              <style>{`
                @media (max-width: 768px) { .desktop-nav { display: none !important; } }
              `}</style>
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: activePage === item.id ? '#1e5631' : 'transparent',
                    color: activePage === item.id ? 'white' : '#334155',
                    fontWeight: 600,
                    fontSize: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {item.label}
                </button>
              ))}
              <a href={`tel:${config.phone}`} style={{
                backgroundColor: '#1e5631',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '9999px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginLeft: '8px'
              }}>
                <Phone size={16} />
                Call Us
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                padding: '8px',
                color: '#334155',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              className="mobile-menu-btn"
            >
              <style>{`@media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }`}</style>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: 'white',
            borderTop: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            padding: '16px'
          }} className="mobile-menu">
            <style>{`@media (min-width: 769px) { .mobile-menu { display: none !important; } }`}</style>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '14px 16px',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activePage === item.id ? '#1e5631' : '#f1f5f9',
                  color: activePage === item.id ? 'white' : '#334155',
                  fontWeight: 600,
                  fontSize: '16px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {item.label}
              </button>
            ))}
            <a href={`tel:${config.phone}`} style={{
              display: 'block',
              width: '100%',
              backgroundColor: '#1e5631',
              color: 'white',
              textAlign: 'center',
              padding: '14px',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
              marginTop: '8px'
            }}>
              Call {config.phone}
            </a>
          </div>
        )}
      </header>
    </>
  );
}
