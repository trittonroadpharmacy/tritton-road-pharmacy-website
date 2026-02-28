import React from 'react';
import { Heart, Users, Clock, Award, ShieldCheck, Smile } from 'lucide-react';

export default function About({ config }) {
  return (
    <section id="about" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '80px 16px',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: '#1e563120',
            color: '#1e5631',
            padding: '8px 16px',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '16px'
          }}>
            About Us
          </span>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '16px'
          }}>
            Your Neighbourhood Pharmacy
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#64748b',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            More than just a pharmacy – we're part of your community
          </p>
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Left - Story */}
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#1e5631',
              marginBottom: '20px'
            }}>
              Where Every Patient Matters
            </h3>
            <div style={{ color: '#475569', lineHeight: 1.8, fontSize: '16px' }}>
              <p style={{ marginBottom: '16px' }}>
                At <strong>Tritton Road Pharmacy</strong>, we believe healthcare should be personal. 
                As an independent community pharmacy, we have the freedom to put <em>you</em> first – 
                not corporate targets or shareholder expectations.
              </p>
              <p style={{ marginBottom: '16px' }}>
                When you visit us, you'll be greeted by familiar faces who remember your name, 
                understand your health needs, and take the time to listen. We're not here to rush 
                you out the door – we're here to help you feel better and stay healthy.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Our pharmacists live and work in Lincoln. We shop at the same Morrisons, 
                walk the same streets, and care deeply about the wellbeing of our neighbours. 
                That's the difference an independent pharmacy makes.
              </p>
              <p style={{ fontWeight: 500, color: '#1e5631' }}>
                Come in for your prescription, stay for the service you deserve.
              </p>
            </div>
          </div>

          {/* Right - Values */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
          }}>
            <h4 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '24px'
            }}>
              Why Patients Choose Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                {
                  icon: Heart,
                  title: 'Genuinely Personal Care',
                  desc: 'We know our patients by name, not just by prescription number.'
                },
                {
                  icon: Clock,
                  title: 'Time for You',
                  desc: 'No rushed consultations. We take as long as you need to answer your questions.'
                },
                {
                  icon: Users,
                  title: 'Community Focused',
                  desc: 'Proudly serving Lincoln families – many for years.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Trusted Expertise',
                  desc: 'Fully qualified NHS pharmacists with decades of combined experience.'
                },
                {
                  icon: Smile,
                  title: 'Friendly & Welcoming',
                  desc: 'A warm smile and a helpful attitude, every single visit.'
                },
                {
                  icon: Award,
                  title: 'Going the Extra Mile',
                  desc: 'From medication deliveries to health advice calls – we do what it takes.'
                }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: '#1e563115',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <item.icon size={22} style={{ color: '#1e5631' }} />
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px', fontSize: '15px' }}>
                      {item.title}
                    </h5>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: '64px',
          textAlign: 'center',
          backgroundColor: '#1e5631',
          borderRadius: '24px',
          padding: '48px 32px',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '16px' }}>
            Experience the Difference
          </h3>
          <p style={{ 
            fontSize: '1.125rem', 
            opacity: 0.9, 
            maxWidth: '600px', 
            margin: '0 auto 24px',
            lineHeight: 1.6
          }}>
            Whether you need a prescription filled, health advice, or just a friendly chat about 
            your wellbeing – we're here for you. Pop in and see why our patients keep coming back.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`tel:${config.phone}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'white',
                color: '#1e5631',
                padding: '14px 28px',
                borderRadius: '9999px',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '16px'
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
                padding: '14px 28px',
                borderRadius: '9999px',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '16px',
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
