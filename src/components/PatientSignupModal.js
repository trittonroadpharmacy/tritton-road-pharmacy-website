import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { X, User, Phone, Mail, Heart, Loader2, CheckCircle2 } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_URL || 'https://www.pharmadpro.co.uk/api';

const SERVICE_OPTIONS = [
  'NHS Pharmacy First (free GP-free advice)',
  'Prescription Services',
  'NHS Contraception Service',
  'Flu Vaccination',
  'Blood Pressure Check',
  'Health Advice',
  'Emergency Medicine Supply',
  'Prescription Delivery',
  'Other / not sure yet'
];

/**
 * PatientSignupModal
 *
 * Two ways it opens:
 *   1. Auto-pop after `autoOpenAfterMs` (only once per session — uses
 *      sessionStorage to remember dismissal)
 *   2. Programmatically via `isOpen` prop
 */
export default function PatientSignupModal({ isOpen, onOpen, onClose, autoOpenAfterMs = 6000, accentColor = '#1e5631' }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceInterest, setServiceInterest] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const autoTimerRef = useRef(null);

  // Auto-open exactly once per browser tab session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('trp_signup_dismissed');
    if (dismissed === '1') return;
    autoTimerRef.current = setTimeout(() => {
      if (!sessionStorage.getItem('trp_signup_dismissed')) {
        onOpen?.();
      }
    }, autoOpenAfterMs);
    return () => clearTimeout(autoTimerRef.current);
  }, [onOpen, autoOpenAfterMs]);

  function handleClose() {
    sessionStorage.setItem('trp_signup_dismissed', '1');
    onClose?.();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE}/pharmacy-leads/signup`, {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        service_interest: serviceInterest || null,
        consent_marketing: consent,
        source: 'trittonroadpharmacy.co.uk',
      });
      setSubmitted(true);
      // Close after 3.5 sec
      setTimeout(handleClose, 3500);
    } catch (err) {
      const detail = err.response?.data?.detail;
      const msg = Array.isArray(detail)
        ? (detail[0]?.msg || 'Please check your details')
        : (detail || 'Something went wrong, please try again or call us.');
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sign up to Tritton Road Pharmacy"
      data-testid="patient-signup-modal"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(15,23,42,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'trpFadeIn 200ms ease-out'
      }}
      onClick={handleClose}
    >
      <style>{`
        @keyframes trpFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes trpSlideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .trp-input:focus { outline: none; border-color: ${accentColor}; box-shadow: 0 0 0 3px ${accentColor}22; }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '16px',
          maxWidth: '460px',
          width: '100%',
          maxHeight: '94vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
          animation: 'trpSlideUp 280ms ease-out'
        }}
      >
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
          color: 'white',
          padding: '20px 22px',
          borderRadius: '16px 16px 0 0',
          position: 'relative'
        }}>
          <button
            onClick={handleClose}
            aria-label="Close"
            data-testid="patient-signup-close"
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <Heart size={22} fill="white" stroke="white" />
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>
              {submitted ? "You're all set!" : 'Get Free Health Advice'}
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: '14px', opacity: 0.92 }}>
            {submitted
              ? "Thanks — we'll call you within 24 hours."
              : 'Quick sign-up — our pharmacist will call you back to help.'}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '22px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <CheckCircle2 size={56} color={accentColor} style={{ margin: '0 auto 12px' }} />
              <p style={{ color: '#475569', fontSize: '15px', margin: 0 }}>
                One of our pharmacists will be in touch very shortly. <br />
                In the meantime, walk in any time during opening hours — no appointment needed.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Field label="Your name" icon={<User size={16} />}>
                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={120}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="trp-input"
                  data-testid="patient-name-input"
                  style={inputStyle}
                />
              </Field>

              <Field label="Contact number" icon={<Phone size={16} />}>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07xxx xxx xxx"
                  className="trp-input"
                  data-testid="patient-phone-input"
                  style={inputStyle}
                  pattern="[+\d][\d\s\-()]{6,20}"
                />
              </Field>

              <Field label="Email (optional, but useful)" icon={<Mail size={16} />}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="trp-input"
                  data-testid="patient-email-input"
                  style={inputStyle}
                />
              </Field>

              <div>
                <label style={labelStyle}>What can we help with?</label>
                <select
                  value={serviceInterest}
                  onChange={(e) => setServiceInterest(e.target.value)}
                  className="trp-input"
                  data-testid="patient-service-select"
                  style={{ ...inputStyle, paddingLeft: '12px' }}
                >
                  <option value="">— Choose a service (optional) —</option>
                  {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#475569', marginTop: '4px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  data-testid="patient-consent-checkbox"
                  style={{ marginTop: '3px' }}
                />
                <span>I'm happy to receive occasional health tips and seasonal reminders from Tritton Road Pharmacy.</span>
              </label>

              {error && (
                <div style={{
                  padding: '10px 12px', background: '#fef2f2', border: '1px solid #fecaca',
                  color: '#b91c1c', borderRadius: '8px', fontSize: '13px'
                }} data-testid="patient-signup-error">{error}</div>
              )}

              <button
                type="submit"
                disabled={submitting}
                data-testid="patient-signup-submit"
                style={{
                  marginTop: '4px',
                  background: accentColor,
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: submitting ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: submitting ? 0.7 : 1
                }}
              >
                {submitting ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : 'Sign Up Now'}
              </button>

              <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#94a3b8', textAlign: 'center' }}>
                We'll never share your details. By submitting, you agree to be contacted about your enquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, children }) {
  return (
    <div>
      <label style={labelStyle}>
        {icon && <span style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline-flex' }}>{icon}</span>}
        {label}
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
  padding: '11px 12px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  fontSize: '15px',
  background: '#f8fafc',
  color: '#0f172a',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s, box-shadow 0.15s',
};
