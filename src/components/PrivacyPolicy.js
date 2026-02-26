import React from 'react';
import { Shield, Lock, Eye, Trash2, Download, Mail, Phone } from 'lucide-react';

export default function PrivacyPolicy({ config }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1e5631',
        color: 'white',
        padding: '48px 16px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <Shield size={48} style={{ marginBottom: '16px' }} />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '8px' }}>Privacy Policy</h1>
          <p style={{ color: '#bbf7d0' }}>{config?.name || 'Tritton Road Pharmacy'}</p>
          <p style={{ color: '#bbf7d0', fontSize: '14px', marginTop: '8px' }}>Last updated: February 2026</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 16px' }}>
        {/* Introduction */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e5631', marginBottom: '16px' }}>
            Introduction
          </h2>
          <p style={{ color: '#334155', lineHeight: 1.7, marginBottom: '16px' }}>
            {config?.name || 'Tritton Road Pharmacy'} ("we", "us", "our") is committed to protecting your privacy and 
            complying with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, 
            and other applicable data protection legislation.
          </p>
          <p style={{ color: '#334155', lineHeight: 1.7 }}>
            This Privacy Policy explains how we collect, use, store, and protect your personal information 
            when you use our website and chatbot service.
          </p>
        </section>

        {/* Data Controller */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e5631', marginBottom: '16px' }}>
            Data Controller
          </h2>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <p style={{ color: '#334155', marginBottom: '8px' }}><strong>Name:</strong> {config?.name || 'Tritton Road Pharmacy'}</p>
            <p style={{ color: '#334155', marginBottom: '8px' }}><strong>Address:</strong> {config?.address?.line1 || 'U1 Morrisons Supermarket'}, {config?.address?.line2 || 'Tritton Road'}, {config?.address?.city || 'Lincoln'}, {config?.address?.postcode || 'LN6 7QL'}</p>
            <p style={{ color: '#334155', marginBottom: '8px' }}><strong>Email:</strong> {config?.email || 'trittonroadpharmacy@gmail.com'}</p>
            <p style={{ color: '#334155' }}><strong>Phone:</strong> {config?.phone || '01522 537145'}</p>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '16px' }}>
              We are registered with the Information Commissioner's Office (ICO).
            </p>
          </div>
        </section>

        {/* What Data We Collect */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e5631', marginBottom: '16px' }}>
            What Personal Data We Collect
          </h2>
          <p style={{ color: '#334155', lineHeight: 1.7, marginBottom: '16px' }}>
            When you use our website chatbot to send us a query, we collect:
          </p>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { icon: '👤', title: 'Your Name', desc: 'So we can address you personally in our response' },
              { icon: '📧', title: 'Your Email Address', desc: 'So we can send you a reply' },
              { icon: '💬', title: 'Your Query/Message', desc: 'The question or information you send us' },
              { icon: '🕐', title: 'Timestamp', desc: 'When you submitted your query' },
              { icon: '🌐', title: 'Technical Information', desc: 'IP address and browser type for security and audit purposes' }
            ].map((item, i) => (
              <div key={i} style={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                padding: '16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>{item.title}</p>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Important Warning */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{
            backgroundColor: '#fef2f2',
            border: '2px solid #ef4444',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#dc2626', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span> Important: Sensitive Health Data
            </h3>
            <p style={{ color: '#7f1d1d', lineHeight: 1.7, marginBottom: '12px' }}>
              <strong>Please DO NOT include the following in your chatbot messages:</strong>
            </p>
            <ul style={{ color: '#7f1d1d', marginLeft: '20px', lineHeight: 1.8 }}>
              <li>Prescription details or medication names you take</li>
              <li>NHS numbers</li>
              <li>Medical history or diagnoses</li>
              <li>Any other sensitive health information</li>
            </ul>
            <p style={{ color: '#7f1d1d', lineHeight: 1.7, marginTop: '12px' }}>
              For prescription queries, please call us directly or visit the pharmacy in person where we can 
              ensure proper confidentiality and verification.
            </p>
          </div>
        </section>

        {/* How We Use Your Data */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e5631', marginBottom: '16px' }}>
            How We Use Your Data
          </h2>
          <p style={{ color: '#334155', lineHeight: 1.7, marginBottom: '16px' }}>
            We use your personal data to:
          </p>
          <ul style={{ color: '#334155', marginLeft: '20px', lineHeight: 1.8 }}>
            <li>Respond to your enquiries about pharmacy services, stock availability, or health questions</li>
            <li>Provide you with information you have requested</li>
            <li>Improve our services based on feedback</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        {/* Legal Basis */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e5631', marginBottom: '16px' }}>
            Legal Basis for Processing
          </h2>
          <p style={{ color: '#334155', lineHeight: 1.7 }}>
            We process your personal data based on your <strong>explicit consent</strong> (UK GDPR Article 6(1)(a)). 
            You provide this consent when you tick the consent checkbox before submitting your query through our chatbot.
          </p>
          <p style={{ color: '#334155', lineHeight: 1.7, marginTop: '12px' }}>
            You may withdraw your consent at any time by contacting us or using the data deletion feature.
          </p>
        </section>

        {/* Data Security */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e5631', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={24} /> Data Security
          </h2>
          <p style={{ color: '#334155', lineHeight: 1.7, marginBottom: '16px' }}>
            We take the security of your personal data seriously:
          </p>
          <ul style={{ color: '#334155', marginLeft: '20px', lineHeight: 1.8 }}>
            <li>All data is transmitted over secure, encrypted connections (HTTPS/TLS)</li>
            <li>Personal data is encrypted at rest using industry-standard encryption</li>
            <li>Access to personal data is restricted to authorized personnel only</li>
            <li>We regularly review our security practices</li>
          </ul>
        </section>

        {/* Data Retention */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e5631', marginBottom: '16px' }}>
            Data Retention
          </h2>
          <div style={{ backgroundColor: '#f0f7f1', borderRadius: '12px', padding: '24px', border: '1px solid #1e563130' }}>
            <p style={{ color: '#334155', lineHeight: 1.7, fontSize: '1.1rem' }}>
              <strong>Your chatbot queries are automatically deleted after 90 days.</strong>
            </p>
            <p style={{ color: '#64748b', lineHeight: 1.7, marginTop: '12px' }}>
              We retain your data only for as long as necessary to respond to your query and for our legitimate 
              business purposes. After 90 days, your data is permanently and automatically deleted from our systems.
            </p>
          </div>
        </section>

        {/* Your Rights */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e5631', marginBottom: '16px' }}>
            Your Rights Under UK GDPR
          </h2>
          <p style={{ color: '#334155', lineHeight: 1.7, marginBottom: '16px' }}>
            You have the following rights regarding your personal data:
          </p>
          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { icon: Eye, title: 'Right of Access', desc: 'Request a copy of the personal data we hold about you' },
              { icon: Shield, title: 'Right to Rectification', desc: 'Request correction of inaccurate personal data' },
              { icon: Trash2, title: 'Right to Erasure', desc: 'Request deletion of your personal data ("right to be forgotten")' },
              { icon: Download, title: 'Right to Data Portability', desc: 'Receive your data in a structured, machine-readable format' },
              { icon: Lock, title: 'Right to Withdraw Consent', desc: 'Withdraw your consent at any time' }
            ].map((item, i) => (
              <div key={i} style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#1e563115',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <item.icon size={24} style={{ color: '#1e5631' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>{item.title}</p>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: '#334155', lineHeight: 1.7, marginTop: '24px' }}>
            To exercise any of these rights, please contact us using the details below. We will respond to your 
            request within one month as required by law.
          </p>
        </section>

        {/* Cookies */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e5631', marginBottom: '16px' }}>
            Cookies
          </h2>
          <p style={{ color: '#334155', lineHeight: 1.7 }}>
            Our website uses only essential cookies required for the website to function. We do not use 
            tracking cookies or analytics that collect personal data. No consent is required for essential 
            cookies under UK law.
          </p>
        </section>

        {/* Third Parties */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e5631', marginBottom: '16px' }}>
            Third Party Sharing
          </h2>
          <p style={{ color: '#334155', lineHeight: 1.7 }}>
            We do not sell, trade, or rent your personal data to third parties. Your data is only shared with:
          </p>
          <ul style={{ color: '#334155', marginLeft: '20px', lineHeight: 1.8, marginTop: '12px' }}>
            <li><strong>Email service providers</strong> - to deliver our response to your query (data processed in accordance with their privacy policies)</li>
            <li><strong>Hosting providers</strong> - who store our website data securely within the UK/EEA</li>
          </ul>
        </section>

        {/* Complaints */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e5631', marginBottom: '16px' }}>
            Complaints
          </h2>
          <p style={{ color: '#334155', lineHeight: 1.7 }}>
            If you are unhappy with how we have handled your personal data, you have the right to lodge a 
            complaint with the Information Commissioner's Office (ICO):
          </p>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginTop: '16px' }}>
            <p style={{ color: '#334155', marginBottom: '8px' }}><strong>Information Commissioner's Office</strong></p>
            <p style={{ color: '#334155', marginBottom: '8px' }}>Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</p>
            <p style={{ color: '#334155', marginBottom: '8px' }}>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#1e5631' }}>ico.org.uk</a></p>
            <p style={{ color: '#334155' }}>Helpline: 0303 123 1113</p>
          </div>
        </section>

        {/* Contact Us */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e5631', marginBottom: '16px' }}>
            Contact Us
          </h2>
          <p style={{ color: '#334155', lineHeight: 1.7, marginBottom: '16px' }}>
            If you have any questions about this Privacy Policy or wish to exercise your data protection rights, 
            please contact us:
          </p>
          <div style={{ backgroundColor: '#1e5631', borderRadius: '12px', padding: '24px', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Mail size={20} />
              <a href={`mailto:${config?.email || 'trittonroadpharmacy@gmail.com'}`} style={{ color: 'white' }}>
                {config?.email || 'trittonroadpharmacy@gmail.com'}
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Phone size={20} />
              <a href={`tel:${config?.phone || '01522 537145'}`} style={{ color: 'white' }}>
                {config?.phone || '01522 537145'}
              </a>
            </div>
            <p style={{ color: '#bbf7d0', fontSize: '14px', marginTop: '16px' }}>
              We aim to respond to all data protection queries within 72 hours.
            </p>
          </div>
        </section>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a 
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1e5631',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '9999px',
              fontWeight: 500,
              textDecoration: 'none'
            }}
          >
            ← Back to Home
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: '#1a1a1a',
        color: '#9ca3af',
        padding: '24px 16px',
        textAlign: 'center',
        fontSize: '14px'
      }}>
        <p>© {new Date().getFullYear()} {config?.name || 'Tritton Road Pharmacy'}. All rights reserved.</p>
        <p style={{ marginTop: '8px' }}>Registered with the Information Commissioner's Office (ICO)</p>
      </div>
    </div>
  );
}
