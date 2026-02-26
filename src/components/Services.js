import React from 'react';
import { 
  Stethoscope, FileText, Heart, Syringe, Activity, Plane,
  MessageCircle, ClipboardList, Ban, AlertCircle, Truck, Pill, Shield
} from 'lucide-react';

const iconMap = {
  Stethoscope, FileText, Heart, Syringe, Activity, Plane,
  MessageCircle, ClipboardList, Ban, AlertCircle, Truck, Pill
};

export default function Services({ config }) {
  const enabledServices = config.services.filter(s => s.enabled);
  const nhsServices = enabledServices.filter(s => s.isNHS);
  const otherServices = enabledServices.filter(s => !s.isNHS);

  const ServiceCard = ({ service, isNHS }) => {
    const IconComponent = iconMap[service.icon] || Pill;
    const accentColor = isNHS ? '#005eb8' : '#1e5631';
    
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        borderLeft: `4px solid ${accentColor}`,
        transition: 'box-shadow 0.3s'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            backgroundColor: `${accentColor}15`,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <IconComponent size={28} style={{ color: accentColor }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#0f172a',
                margin: 0
              }}>{service.name}</h4>
              {isNHS && (
                <span style={{
                  fontSize: '11px',
                  backgroundColor: '#005eb8',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '9999px'
                }}>NHS</span>
              )}
            </div>
            <p style={{
              color: '#64748b',
              fontSize: '14px',
              margin: 0,
              lineHeight: 1.5
            }}>{service.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="services" style={{
      padding: '64px 16px',
      backgroundColor: '#f0f7f1'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: '#1e5631',
            color: 'white',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '16px'
          }}>What We Offer</span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#1e5631',
            marginBottom: '16px'
          }}>Our Pharmacy Services</h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#64748b',
            maxWidth: '640px',
            margin: '0 auto'
          }}>
            We provide a wide range of NHS and private healthcare services to support your health and wellbeing.
          </p>
        </div>

        {/* NHS Services */}
        {nhsServices.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                backgroundColor: '#005eb8',
                padding: '8px',
                borderRadius: '8px'
              }}>
                <Shield size={20} style={{ color: 'white' }} />
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#005eb8',
                margin: 0
              }}>Free NHS Services</h3>
            </div>
            <div style={{
              display: 'grid',
              gap: '24px'
            }} className="services-grid">
              <style>{`
                @media (min-width: 768px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (min-width: 1024px) { .services-grid { grid-template-columns: repeat(3, 1fr) !important; } }
              `}</style>
              {nhsServices.map(service => (
                <ServiceCard key={service.id} service={service} isNHS={true} />
              ))}
            </div>
          </div>
        )}

        {/* Other Services */}
        {otherServices.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#1e5631',
              marginBottom: '24px'
            }}>Additional Services</h3>
            <div style={{
              display: 'grid',
              gap: '24px'
            }} className="services-grid">
              {otherServices.map(service => (
                <ServiceCard key={service.id} service={service} isNHS={false} />
              ))}
            </div>
          </div>
        )}

        {/* Pharmacy First Info Box */}
        <div style={{
          background: 'linear-gradient(135deg, #005eb8 0%, #003d7a 100%)',
          borderRadius: '24px',
          padding: 'clamp(24px, 5vw, 48px)',
          color: 'white'
        }}>
          <div style={{
            display: 'grid',
            gap: '32px',
            alignItems: 'center'
          }} className="pharmacy-first-grid">
            <style>{`@media (min-width: 768px) { .pharmacy-first-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
            <div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                marginBottom: '16px'
              }}>NHS Pharmacy First</h3>
              <p style={{
                color: '#bfdbfe',
                marginBottom: '24px'
              }}>
                Get free treatment for 7 common conditions without needing to see a GP. Our trained pharmacists can assess and treat:
              </p>
              <ul style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '14px'
              }}>
                {[
                  'Sore throat', 'Sinusitis', 'Earache', 'Infected insect bites',
                  'Impetigo', 'Shingles', 'Uncomplicated UTIs (women)'
                ].map((condition, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg style={{ width: '16px', height: '16px', color: '#4ade80' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-block',
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                padding: '32px'
              }}>
                <p style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '8px' }}>FREE</p>
                <p style={{ color: '#bfdbfe', marginBottom: '8px' }}>No appointment needed</p>
                <p style={{ color: '#bfdbfe', fontSize: '14px' }}>Just walk in during opening hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
