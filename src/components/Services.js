import React from 'react';
import { 
  Stethoscope, FileText, Heart, Syringe, Activity,
  MessageCircle, ClipboardList, AlertCircle, Pill, Shield
} from 'lucide-react';

const iconMap = {
  Stethoscope, FileText, Heart, Syringe, Activity,
  MessageCircle, ClipboardList, AlertCircle, Pill
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
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        borderLeft: `4px solid ${accentColor}`,
        border: '1px solid #e2e8f0',
        borderLeftWidth: '4px',
        borderLeftColor: accentColor
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            backgroundColor: `${accentColor}15`,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <IconComponent size={26} style={{ color: accentColor }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#1a1a1a',
                margin: 0
              }}>{service.name}</h4>
              {isNHS && (
                <span style={{
                  fontSize: '11px',
                  backgroundColor: '#005eb8',
                  color: 'white',
                  padding: '3px 10px',
                  borderRadius: '50px',
                  fontWeight: 600
                }}>FREE NHS</span>
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
          Our Pharmacy Services
        </h1>
        <p style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          We provide a wide range of NHS and private healthcare services to support your health and wellbeing.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 20px' }}>
        {/* NHS Pharmacy First Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #005eb8 0%, #003d7a 100%)',
          borderRadius: '20px',
          padding: '32px',
          color: 'white',
          marginBottom: '48px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Shield size={28} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
              NHS Pharmacy First
            </h2>
          </div>
          <p style={{ color: '#bfdbfe', marginBottom: '20px', maxWidth: '600px' }}>
            Get FREE treatment for 7 common conditions without needing to see a GP:
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            {['Sore throat', 'Sinusitis', 'Earache', 'Infected insect bites', 'Impetigo', 'Shingles', 'UTIs (women)'].map((condition, i) => (
              <span key={i} style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 500
              }}>
                ✓ {condition}
              </span>
            ))}
          </div>
          <p style={{ 
            marginTop: '20px', 
            fontSize: '14px', 
            color: '#93c5fd',
            fontStyle: 'italic'
          }}>
            No appointment needed – just walk in during opening hours!
          </p>
        </div>

        {/* NHS Services */}
        {nhsServices.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              marginBottom: '24px' 
            }}>
              <div style={{
                backgroundColor: '#005eb8',
                padding: '8px',
                borderRadius: '8px'
              }}>
                <Shield size={20} style={{ color: 'white' }} />
              </div>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#005eb8',
                margin: 0
              }}>Free NHS Services</h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '20px'
            }}>
              {nhsServices.map(service => (
                <ServiceCard key={service.id} service={service} isNHS={true} />
              ))}
            </div>
          </div>
        )}

        {/* Other Services */}
        {otherServices.length > 0 && (
          <div>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#1e5631',
              marginBottom: '24px'
            }}>Additional Services</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '20px'
            }}>
              {otherServices.map(service => (
                <ServiceCard key={service.id} service={service} isNHS={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
