import React from 'react';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';

export default function Footer({ config }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#1a1a1a',
      color: 'white'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px 16px'
      }}>
        <div style={{
          display: 'grid',
          gap: '32px'
        }} className="footer-grid">
          <style>{`
            @media (min-width: 768px) { .footer-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (min-width: 1024px) { .footer-grid { grid-template-columns: 2fr 1fr 1fr !important; } }
          `}</style>
          
          {/* Logo & About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img 
                src="/assets/pharmacy-logo.png" 
                alt={config.name}
                style={{
                  height: '48px',
                  width: 'auto',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  padding: '4px'
                }}
              />
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{config.name}</h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Your Community Pharmacy</p>
              </div>
            </div>
            <p style={{ color: '#9ca3af', maxWidth: '400px', marginBottom: '16px', lineHeight: 1.6 }}>
              Providing professional pharmacy services to the Lincoln community. Conveniently located inside Morrisons on Tritton Road.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '14px' }}>
              <Shield size={16} style={{ color: '#005eb8' }} />
              GPhC Registered Pharmacy
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '16px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'Our Services', href: '#services' },
                { label: 'Contact Us', href: '#contact' },
                { label: 'NHS Services Info', href: 'https://www.nhs.uk/nhs-services/prescriptions-and-pharmacies/pharmacies/how-your-pharmacy-can-help/', external: true },
                { label: 'GPhC Website', href: 'https://www.pharmacyregulation.org/', external: true }
              ].map((link, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>
                  <a 
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    style={{ color: '#9ca3af', textDecoration: 'none' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '16px' }}>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Phone size={16} style={{ color: '#4a9c5d' }} />
                <a href={`tel:${config.phone}`} style={{ color: '#9ca3af', textDecoration: 'none' }}>
                  {config.phone}
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Mail size={16} style={{ color: '#4a9c5d' }} />
                <a href={`mailto:${config.email}`} style={{ color: '#9ca3af', textDecoration: 'none' }}>
                  {config.email}
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin size={16} style={{ color: '#4a9c5d', flexShrink: 0, marginTop: '4px' }} />
                <span style={{ color: '#9ca3af' }}>
                  {config.address.line1}<br />
                  {config.address.city}, {config.address.postcode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: '48px',
          paddingTop: '32px',
          borderTop: '1px solid #374151'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }} className="footer-bottom">
            <style>{`@media (min-width: 768px) { .footer-bottom { flex-direction: row !important; justify-content: space-between !important; } }`}</style>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
              © {currentYear} {config.name}. All rights reserved.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px' }}>
              <a href="/privacy-policy" style={{ color: '#6b7280', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="/terms-of-service" style={{ color: '#6b7280', textDecoration: 'none' }}>Terms of Service</a>
              <a href="/accessibility" style={{ color: '#6b7280', textDecoration: 'none' }}>Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
