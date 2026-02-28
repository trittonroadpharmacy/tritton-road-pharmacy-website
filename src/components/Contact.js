import React from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

export default function Contact({ config }) {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 200px)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e5631 0%, #2d7a47 100%)',
        padding: '48px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 800,
          marginBottom: '12px'
        }}>
          Contact Us
        </h1>
        <p style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          We're here to help. Get in touch or visit us in store.
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {/* Phone */}
          <a href={`tel:${config.phone}`} style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            display: 'block'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#1e563115',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Phone size={28} style={{ color: '#1e5631' }} />
            </div>
            <h3 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px', fontSize: '1.1rem' }}>
              Call Us
            </h3>
            <p style={{ fontSize: '1.25rem', color: '#1e5631', fontWeight: 700, margin: 0 }}>
              {config.phone}
            </p>
          </a>

          {/* Email */}
          <a href={`mailto:${config.email}`} style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            display: 'block'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#1e563115',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Mail size={28} style={{ color: '#1e5631' }} />
            </div>
            <h3 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px', fontSize: '1.1rem' }}>
              Email Us
            </h3>
            <p style={{ fontSize: '14px', color: '#1e5631', fontWeight: 600, margin: 0, wordBreak: 'break-all' }}>
              {config.email}
            </p>
          </a>

          {/* Address */}
          <a href={config.googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            display: 'block'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#1e563115',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <MapPin size={28} style={{ color: '#1e5631' }} />
            </div>
            <h3 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px', fontSize: '1.1rem' }}>
              Visit Us
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
              {config.address.line1}<br />
              {config.address.line2}<br />
              {config.address.city}, {config.address.postcode}
            </p>
            <p style={{ 
              fontSize: '13px', 
              color: '#1e5631', 
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <ExternalLink size={14} />
              Open in Google Maps
            </p>
          </a>
        </div>

        {/* Opening Hours */}
        <div style={{
          marginTop: '48px',
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#1e563115',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={24} style={{ color: '#1e5631' }} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>
              Opening Hours
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            {config.hours.map((h, i) => {
              const isToday = h.day === new Date().toLocaleDateString('en-US', { weekday: 'long' });
              return (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: isToday ? '#1e563110' : '#f8fafc',
                  borderRadius: '8px',
                  border: isToday ? '2px solid #1e5631' : '1px solid #e2e8f0'
                }}>
                  <span style={{ 
                    fontWeight: isToday ? 700 : 500, 
                    color: isToday ? '#1e5631' : '#374151',
                    fontSize: '14px'
                  }}>
                    {h.day.substring(0, 3)}
                  </span>
                  <span style={{ 
                    color: h.isOpen ? '#374151' : '#ef4444',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}>
                    {h.isOpen ? `${h.open} - ${h.close}` : 'Closed'}
                  </span>
                </div>
              );
            })}
          </div>

          <p style={{
            marginTop: '20px',
            fontSize: '13px',
            color: '#64748b',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            Hours may vary on bank holidays. Please call ahead to confirm.
          </p>
        </div>

        {/* Map Embed Placeholder */}
        <div style={{
          marginTop: '48px',
          backgroundColor: '#1e5631',
          borderRadius: '16px',
          padding: '48px 32px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
            Find Us Inside Morrisons
          </h3>
          <p style={{ opacity: 0.9, marginBottom: '24px' }}>
            Free parking available. We're located just inside the main entrance.
          </p>
          <a 
            href={config.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'white',
              color: '#1e5631',
              padding: '14px 28px',
              borderRadius: '50px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <MapPin size={18} />
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}
