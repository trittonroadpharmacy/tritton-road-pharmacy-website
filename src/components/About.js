import React from 'react';
import { Heart, Users, Clock, ShieldCheck, MapPin, Phone } from 'lucide-react';

export default function About({ config }) {
  const getTodayHours = () => {
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayHours = config.hours.find(h => h.day === day);
    if (!todayHours?.isOpen) return "Closed today";
    return `${todayHours.open} - ${todayHours.close}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e5631 0%, #2d7a47 100%)',
        padding: '60px 20px',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            {/* Left content */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#005eb8',
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '20px'
              }}>
                <ShieldCheck size={16} />
                NHS Pharmacy Services
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '20px'
              }}>
                {config.name}
              </h1>

              <p style={{
                fontSize: '1.1rem',
                color: '#bbf7d0',
                marginBottom: '28px',
                lineHeight: 1.6
              }}>
                {config.tagline}. Professional healthcare advice and NHS services for you and your family.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '28px' }}>
                <a href={`tel:${config.phone}`} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'white',
                  color: '#1e5631',
                  padding: '14px 24px',
                  borderRadius: '50px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}>
                  <Phone size={18} />
                  {config.phone}
                </a>
                <a href={config.googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  padding: '14px 24px',
                  borderRadius: '50px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  <MapPin size={18} />
                  Get Directions
                </a>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', color: '#bbf7d0', fontSize: '14px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} />
                  Inside Morrisons, Lincoln
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={16} />
                  Today: {getTodayHours()}
                </span>
              </div>
            </div>

            {/* Right - Logo Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <img 
                src="/assets/pharmacy-logo.png" 
                alt={config.name}
                style={{ maxWidth: '200px', height: 'auto', marginBottom: '20px' }}
              />
              <h3 style={{ color: '#1e5631', fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
                Your Community Pharmacy
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px' }}>
                Proudly serving Lincoln since establishment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section style={{ padding: '60px 20px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: '12px'
            }}>
              Where Every Patient Matters
            </h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              More than just a pharmacy – we're part of your community
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            {[
              { icon: Heart, title: 'Personal Care', desc: 'We know you by name, not prescription number.' },
              { icon: Clock, title: 'Time for You', desc: 'No rushed consultations. We take time to listen.' },
              { icon: Users, title: 'Community Focused', desc: 'Proudly serving Lincoln families for years.' },
              { icon: ShieldCheck, title: 'Trusted Expertise', desc: 'Qualified NHS pharmacists you can rely on.' }
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#1e563115',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <item.icon size={24} style={{ color: '#1e5631' }} />
                </div>
                <h3 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px', fontSize: '1.1rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section style={{ padding: '60px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#1a1a1a',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            Opening Hours
          </h2>
          
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0'
          }}>
            {config.hours.map((h, i) => {
              const isToday = h.day === new Date().toLocaleDateString('en-US', { weekday: 'long' });
              return (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '16px 24px',
                  backgroundColor: isToday ? '#1e563110' : 'transparent',
                  borderBottom: i < config.hours.length - 1 ? '1px solid #e2e8f0' : 'none'
                }}>
                  <span style={{ 
                    fontWeight: isToday ? 700 : 500, 
                    color: isToday ? '#1e5631' : '#374151'
                  }}>
                    {h.day} {isToday && '(Today)'}
                  </span>
                  <span style={{ 
                    color: h.isOpen ? '#374151' : '#ef4444',
                    fontWeight: 500
                  }}>
                    {h.isOpen ? `${h.open} - ${h.close}` : 'Closed'}
                  </span>
                </div>
              );
            })}
          </div>
          
          <p style={{
            textAlign: 'center',
            marginTop: '16px',
            fontSize: '14px',
            color: '#64748b'
          }}>
            Hours may vary on bank holidays. Please call to confirm.
          </p>
        </div>
      </section>
    </div>
  );
}
