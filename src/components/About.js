import React from 'react';
import { Heart, Users, Clock, ShieldCheck } from 'lucide-react';

export default function About({ config }) {
  return (
    <section id="about" style={{
      padding: '40px 16px',
      backgroundColor: '#f8fafc',
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Section Header - More compact */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: '#1e563120',
            color: '#1e5631',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 500,
            marginBottom: '12px'
          }}>
            About Us
          </span>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '8px'
          }}>
            Your Neighbourhood Pharmacy
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#64748b',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.5
          }}>
            More than just a pharmacy – we're part of your community
          </p>
        </div>

        {/* Main Content - More compact */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* Left - Story */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#1e5631',
              marginBottom: '12px'
            }}>
              Where Every Patient Matters
            </h3>
            <div style={{ color: '#475569', lineHeight: 1.6, fontSize: '14px' }}>
              <p style={{ marginBottom: '10px' }}>
                At <strong>Tritton Road Pharmacy</strong>, we believe healthcare should be personal. 
                As an independent community pharmacy, we put <em>you</em> first.
              </p>
              <p style={{ marginBottom: '10px' }}>
                When you visit us, you'll be greeted by familiar faces who remember your name 
                and understand your health needs.
              </p>
              <p style={{ fontWeight: 500, color: '#1e5631' }}>
                Come in for your prescription, stay for the service you deserve.
              </p>
            </div>
          </div>

          {/* Right - Values - More compact */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
          }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '16px'
            }}>
              Why Patients Choose Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                {
                  icon: Heart,
                  title: 'Personal Care',
                  desc: 'We know you by name, not prescription number.'
                },
                {
                  icon: Clock,
                  title: 'Time for You',
                  desc: 'No rushed consultations.'
                },
                {
                  icon: Users,
                  title: 'Community Focused',
                  desc: 'Proudly serving Lincoln families.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Trusted Expertise',
                  desc: 'Qualified NHS pharmacists.'
                }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: '#1e563115',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <item.icon size={18} style={{ color: '#1e5631' }} />
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '2px', fontSize: '13px' }}>
                      {item.title}
                    </h5>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA - More compact */}
        <div style={{
          marginTop: '32px',
          textAlign: 'center',
          backgroundColor: '#1e5631',
          borderRadius: '16px',
          padding: '24px',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
            Experience the Difference
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            opacity: 0.9, 
            maxWidth: '600px', 
            margin: '0 auto 16px',
            lineHeight: 1.5
          }}>
            Pop in and see why our patients keep coming back.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`tel:${config.phone}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'white',
                color: '#1e5631',
                padding: '10px 20px',
                borderRadius: '9999px',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              Call Us: {config.phone}
            </a>
            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '9999px',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '14px',
                border: '2px solid white'
              }}
            >
              Find Us in Morrisons
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
