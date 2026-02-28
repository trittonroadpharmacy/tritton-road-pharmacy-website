import React from 'react';
import { Phone, Mail, MapPin, Clock, Navigation } from 'lucide-react';

export default function Contact({ config }) {
  return (
    <section id="contact" style={{
      minHeight: '100vh',
      padding: '64px 16px',
      backgroundColor: 'white'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: '#1e563115',
            color: '#1e5631',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '16px'
          }}>Find Us</span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#1e5631',
            marginBottom: '16px'
          }}>Visit Our Pharmacy</h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#64748b',
            maxWidth: '640px',
            margin: '0 auto'
          }}>
            Conveniently located inside Morrisons supermarket on Tritton Road, Lincoln
          </p>
        </div>

        <div style={{
          display: 'grid',
          gap: '48px'
        }} className="contact-grid">
          <style>{`@media (min-width: 1024px) { .contact-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
          
          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Address Card */}
            <div style={{
              backgroundColor: '#f0f7f1',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#1e5631',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin size={24} style={{ color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>Address</h3>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                    {config.address.line1}<br />
                    {config.address.line2}<br />
                    {config.address.city}, {config.address.postcode}
                  </p>
                  <a 
                    href={config.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '12px',
                      color: '#1e5631',
                      fontWeight: 500,
                      textDecoration: 'none'
                    }}
                  >
                    <Navigation size={16} />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div style={{
              backgroundColor: '#f0f7f1',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#1e5631',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone size={24} style={{ color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>Phone</h3>
                  <a 
                    href={`tel:${config.phone}`}
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#1e5631',
                      textDecoration: 'none'
                    }}
                  >
                    {config.phone}
                  </a>
                  <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
                    Call us for enquiries or advice
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div style={{
              backgroundColor: '#f0f7f1',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#1e5631',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Mail size={24} style={{ color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>Email</h3>
                  <a 
                    href={`mailto:${config.email}`}
                    style={{
                      color: '#1e5631',
                      fontWeight: 500,
                      textDecoration: 'none'
                    }}
                  >
                    {config.email}
                  </a>
                  <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <div style={{
              backgroundColor: 'white',
              border: '2px solid #1e563130',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <div style={{
                backgroundColor: '#1e5631',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Clock size={24} style={{ color: 'white' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', margin: 0 }}>Opening Hours</h3>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {config.hours.map((schedule, i) => {
                    const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === schedule.day;
                    return (
                      <div 
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          backgroundColor: isToday ? '#1e563115' : '#f8fafc',
                          borderLeft: isToday ? '4px solid #1e5631' : '4px solid transparent'
                        }}
                      >
                        <span style={{
                          fontWeight: 500,
                          color: isToday ? '#1e5631' : '#334155',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          {schedule.day}
                          {isToday && (
                            <span style={{
                              fontSize: '11px',
                              backgroundColor: '#1e5631',
                              color: 'white',
                              padding: '2px 8px',
                              borderRadius: '9999px'
                            }}>Today</span>
                          )}
                        </span>
                        <span style={{ color: schedule.isOpen ? '#0f172a' : '#ef4444' }}>
                          {schedule.isOpen ? `${schedule.open} - ${schedule.close}` : 'Closed'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div style={{
                  marginTop: '24px',
                  padding: '16px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '12px',
                  border: '1px solid #fcd34d'
                }}>
                  <p style={{ color: '#92400e', fontSize: '14px', margin: 0, marginBottom: '8px' }}>
                    <strong>⚠️ Bank & Public Holidays:</strong>
                  </p>
                  <p style={{ color: '#92400e', fontSize: '14px', margin: 0 }}>
                    Opening hours may differ on bank and public holidays. Please call {config.phone} to confirm before visiting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div style={{
          marginTop: '48px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          height: '400px'
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2403.9087071089547!2d-0.5578637!3d53.2243843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48785d52d1e0d7d9%3A0x7c9b0d7c5d0e9c0a!2sMorrisons%2C%20Tritton%20Rd%2C%20Lincoln!5e0!3m2!1sen!2suk!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Tritton Road Pharmacy Location"
          />
        </div>
      </div>
    </section>
  );
}
