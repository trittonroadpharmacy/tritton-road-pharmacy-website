import React, { useState } from 'react';
import axios from 'axios';
import { User, Phone, Mail, Heart, Loader2, CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_URL || 'https://www.pharmadpro.co.uk/api';

const SERVICE_OPTIONS = [
  'NHS Electronic Prescription Service (nominate us)',
  'NHS Pharmacy First (free GP-free advice)',
  'Prescription Services & Repeat Prescriptions',
  'Prescription Delivery',
  'NHS Contraception Service',
  'Flu Vaccination',
  'Blood Pressure Check',
  'New Medicine Service',
  'Health Advice',
  'Emergency Medicine Supply',
  'Other / not sure yet',
];

/**
 * SignupPage — full-page version of PatientSignupModal.
 * Designed as a direct landing target for social media campaigns.
 * URL: https://trittonroadpharmacy.co.uk/signup
 */
export default function SignupPage({ accentColor = '#1e5631' }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceInterest, setServiceInterest] = useState('');
  const [consentService, setConsentService] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Capture the marketing campaign tag from query string (?utm_source=facebook etc.)
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const utmSource = params.get('utm_source') || params.get('source') || null;
  const utmCampaign = params.get('utm_campaign') || params.get('campaign') || null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    if (!consentService) {
      setError('Please tick the consent box so we can contact you about your enquiry.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE}/pharmacy-leads/signup`, {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        service_interest: serviceInterest || null,
        consent_marketing: consentMarketing,
        note: [
          'Patient confirmed consent to data processing for service request and any required NHS notifications.',
          utmSource ? `Campaign source: ${utmSource}` : null,
          utmCampaign ? `Campaign: ${utmCampaign}` : null,
        ].filter(Boolean).join(' | '),
        source: `trittonroadpharmacy.co.uk/signup${utmSource ? ` (${utmSource})` : ''}`,
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const detail = err.response?.data?.detail;
      const msg = Array.isArray(detail)
        ? (detail[0]?.msg || 'Please check your details')
        : (detail || 'Something went wrong, please try again or call us on 01522 537145.');
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 200px)',
      background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 60%)',
      padding: '32px 16px 64px',
    }}>
      <style>{`
        .trp-su-input:focus {
          outline: none;
          border-color: ${accentColor};
          box-shadow: 0 0 0 4px ${accentColor}1f;
        }
      `}</style>

      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#475569',
            textDecoration: 'none',
            fontSize: '14px',
            marginBottom: '20px',
          }}
        >
          <ArrowLeft size={14} /> Back to home
        </a>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '6px',
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Heart size={22} fill="white" stroke="white" />
          </div>
          <h1 style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.2,
          }}>
            Sign up to our services
          </h1>
        </div>
        <p style={{
          color: '#475569',
          fontSize: '17px',
          lineHeight: 1.55,
          marginBottom: '28px',
          maxWidth: '620px',
        }}>
          Including the <strong>NHS Electronic Prescription Service</strong>, prescription delivery,
          NHS Pharmacy First and more. Fill in the short form below and our expert team member will
          call you soon to help further.
        </p>

        {/* Trust strip */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '24px',
        }}>
          {['NHS Pharmacy', 'GPhC Registered', 'Free for NHS Patients', 'Lincoln + Surrounding Villages'].map((t) => (
            <span key={t} style={{
              fontSize: '12px',
              fontWeight: 600,
              padding: '6px 10px',
              borderRadius: '999px',
              background: '#ecfdf5',
              color: '#065f46',
              border: '1px solid #a7f3d0',
            }}>
              {t}
            </span>
          ))}
        </div>

        {submitted ? (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px 28px',
            border: '1px solid #d1fae5',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
          }} data-testid="signup-success">
            <CheckCircle2 size={64} color={accentColor} style={{ margin: '0 auto 18px' }} />
            <h2 style={{ margin: '0 0 8px', color: '#0f172a', fontSize: '22px' }}>
              Thanks {name.split(' ')[0] || 'so much'} — you're all set!
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', margin: '0 auto 24px', maxWidth: '440px', lineHeight: 1.55 }}>
              Our expert team member will call you soon to help with{' '}
              {serviceInterest ? <strong>{serviceInterest.split(' (')[0]}</strong> : 'your enquiry'}.
              In the meantime you can call us on{' '}
              <a href="tel:01522537145" style={{ color: accentColor, fontWeight: 600 }}>
                01522 537145
              </a>{' '}
              or pop in during opening hours — no appointment needed.
            </p>
            <a
              href="/"
              style={{
                display: 'inline-block',
                background: accentColor,
                color: 'white',
                padding: '12px 22px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '15px',
              }}
            >
              Explore our services
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
            data-testid="signup-page-form"
          >
            <Field label="Your name" icon={<User size={16} />} required>
              <input
                type="text" required minLength={2} maxLength={120}
                value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className="trp-su-input"
                data-testid="signup-name"
                style={inputStyle}
              />
            </Field>

            <Field label="Contact number" icon={<Phone size={16} />} required>
              <input
                type="tel" required
                value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="07xxx xxx xxx"
                pattern="[+\d][\d\s\-()]{6,20}"
                className="trp-su-input"
                data-testid="signup-phone"
                style={inputStyle}
              />
            </Field>

            <Field label="Email (optional — useful for reminders)" icon={<Mail size={16} />}>
              <input
                type="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="trp-su-input"
                data-testid="signup-email"
                style={inputStyle}
              />
            </Field>

            <div>
              <label style={labelStyle}>What can we help with?</label>
              <select
                value={serviceInterest}
                onChange={(e) => setServiceInterest(e.target.value)}
                className="trp-su-input"
                data-testid="signup-service"
                style={{ ...inputStyle, paddingLeft: '12px' }}
              >
                <option value="">— Choose a service (optional) —</option>
                {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Consent block */}
            <div style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              padding: '14px 16px',
              marginTop: '4px',
            }}>
              <p style={{
                margin: '0 0 10px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#1e293b',
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <ShieldCheck size={14} /> Consent & how we use your details
              </p>

              <label style={consentLabelStyle}>
                <input
                  type="checkbox" required
                  checked={consentService}
                  onChange={(e) => { setConsentService(e.target.checked); if (e.target.checked) setError(null); }}
                  data-testid="signup-consent-service"
                  style={{ marginTop: '3px', flexShrink: 0 }}
                />
                <span>
                  <strong>I consent</strong> to Tritton Road Pharmacy storing and using the details
                  above to contact me about my enquiry, register me for the service I've selected
                  (including, where relevant, nominating Tritton Road Pharmacy as my dispenser on the{' '}
                  <strong>NHS Electronic Prescription Service</strong>), and to share the minimum
                  information required with the NHS, my GP surgery, or other authorised healthcare
                  professionals to deliver that service. I understand my data will be handled in line
                  with the Data Protection Act 2018, UK GDPR, and NHS confidentiality rules.{' '}
                  <span style={{ color: '#dc2626' }}>(required)</span>
                </span>
              </label>

              <label style={{ ...consentLabelStyle, marginBottom: 0 }}>
                <input
                  type="checkbox"
                  checked={consentMarketing}
                  onChange={(e) => setConsentMarketing(e.target.checked)}
                  data-testid="signup-consent-marketing"
                  style={{ marginTop: '3px', flexShrink: 0 }}
                />
                <span>
                  I'm happy to receive occasional health tips, seasonal reminders (flu jabs,
                  contraception, blood pressure checks etc.) and service updates from Tritton Road
                  Pharmacy by phone, SMS or email. I can withdraw this consent at any time by
                  replying STOP, emailing the pharmacy, or asking in store.{' '}
                  <span style={{ color: '#64748b' }}>(optional)</span>
                </span>
              </label>
            </div>

            {error && (
              <div style={{
                padding: '12px 14px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                borderRadius: '10px',
                fontSize: '14px',
              }} data-testid="signup-error">{error}</div>
            )}

            <button
              type="submit"
              disabled={submitting}
              data-testid="signup-submit"
              style={{
                marginTop: '4px',
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
                color: 'white',
                padding: '14px 18px',
                borderRadius: '12px',
                border: 'none',
                fontWeight: 700,
                fontSize: '16px',
                cursor: submitting ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: submitting ? 0.7 : 1,
                boxShadow: `0 8px 20px ${accentColor}33`,
              }}
            >
              {submitting ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : 'Sign Up Now'}
            </button>

            <p style={{
              margin: '4px 0 0',
              fontSize: '12px',
              color: '#94a3b8',
              textAlign: 'center',
              lineHeight: 1.5,
            }}>
              We treat your details confidentially under UK GDPR and NHS confidentiality rules. You can
              request deletion at any time by emailing{' '}
              <a href="mailto:trittonroadpharmacy@gmail.com" style={{ color: '#64748b' }}>
                trittonroadpharmacy@gmail.com
              </a>{' '}
              or calling{' '}
              <a href="tel:01522537145" style={{ color: '#64748b' }}>01522 537145</a>.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, icon, required, children }) {
  return (
    <div>
      <label style={labelStyle}>
        {icon && <span style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline-flex' }}>{icon}</span>}
        {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#334155',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid #cbd5e1',
  borderRadius: '10px',
  fontSize: '16px',
  background: '#f8fafc',
  color: '#0f172a',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s, box-shadow 0.15s',
};

const consentLabelStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  fontSize: '13px',
  color: '#334155',
  marginBottom: '10px',
  cursor: 'pointer',
  lineHeight: 1.5,
};
