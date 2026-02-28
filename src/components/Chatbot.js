import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send, User, Bot, Loader2, Mail, Shield, AlertTriangle, ExternalLink, Info } from 'lucide-react';

// Health information resources (UK approved sources)
const HEALTH_RESOURCES = {
  'headache': { url: 'https://www.nhs.uk/conditions/headaches/', source: 'NHS' },
  'cold': { url: 'https://www.nhs.uk/conditions/common-cold/', source: 'NHS' },
  'flu': { url: 'https://www.nhs.uk/conditions/flu/', source: 'NHS' },
  'cough': { url: 'https://www.nhs.uk/conditions/cough/', source: 'NHS' },
  'sore throat': { url: 'https://www.nhs.uk/conditions/sore-throat/', source: 'NHS' },
  'fever': { url: 'https://www.nhs.uk/conditions/fever-in-adults/', source: 'NHS' },
  'temperature': { url: 'https://www.nhs.uk/conditions/fever-in-adults/', source: 'NHS' },
  'diarrhoea': { url: 'https://www.nhs.uk/conditions/diarrhoea/', source: 'NHS' },
  'stomach': { url: 'https://www.nhs.uk/conditions/stomach-ache/', source: 'NHS' },
  'pain': { url: 'https://www.nhs.uk/live-well/pain/', source: 'NHS' },
  'allergy': { url: 'https://www.nhs.uk/conditions/allergies/', source: 'NHS' },
  'hay fever': { url: 'https://www.nhs.uk/conditions/hay-fever/', source: 'NHS' },
  'eczema': { url: 'https://www.nhs.uk/conditions/atopic-eczema/', source: 'NHS' },
  'skin': { url: 'https://www.nhs.uk/conditions/skin-conditions/', source: 'NHS' },
  'rash': { url: 'https://www.nhs.uk/conditions/rashes-babies-and-children/', source: 'NHS' },
  'asthma': { url: 'https://www.nhs.uk/conditions/asthma/', source: 'NHS' },
  'diabetes': { url: 'https://www.nhs.uk/conditions/diabetes/', source: 'NHS' },
  'blood pressure': { url: 'https://www.nhs.uk/conditions/high-blood-pressure-hypertension/', source: 'NHS' },
  'cholesterol': { url: 'https://www.nhs.uk/conditions/high-cholesterol/', source: 'NHS' },
  'anxiety': { url: 'https://www.nhs.uk/mental-health/conditions/generalised-anxiety-disorder/', source: 'NHS' },
  'depression': { url: 'https://www.nhs.uk/mental-health/conditions/depression-in-adults/', source: 'NHS' },
  'sleep': { url: 'https://www.nhs.uk/conditions/insomnia/', source: 'NHS' },
  'insomnia': { url: 'https://www.nhs.uk/conditions/insomnia/', source: 'NHS' },
  'constipation': { url: 'https://www.nhs.uk/conditions/constipation/', source: 'NHS' },
  'indigestion': { url: 'https://www.nhs.uk/conditions/indigestion/', source: 'NHS' },
  'heartburn': { url: 'https://www.nhs.uk/conditions/heartburn-and-acid-reflux/', source: 'NHS' },
  'uti': { url: 'https://www.nhs.uk/conditions/urinary-tract-infections-utis/', source: 'NHS' },
  'earache': { url: 'https://www.nhs.uk/conditions/earache/', source: 'NHS' },
  'sinusitis': { url: 'https://www.nhs.uk/conditions/sinusitis/', source: 'NHS' },
  'impetigo': { url: 'https://www.nhs.uk/conditions/impetigo/', source: 'NHS' },
  'shingles': { url: 'https://www.nhs.uk/conditions/shingles/', source: 'NHS' },
  'insect bite': { url: 'https://www.nhs.uk/conditions/insect-bites-and-stings/', source: 'NHS' },
};

// Health disclaimer for chatbot responses - used in bot messages
// eslint-disable-next-line no-unused-vars
const HEALTH_DISCLAIMER = "⚠️ IMPORTANT: This information is for general guidance only and is sourced from NHS.uk. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns. If you have a medical emergency, call 999 or go to A&E.";

export default function Chatbot({ config, apiUrl, isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: `Hello! Welcome to ${config.name}. I'm here to help with:\n\n• Stock & medication queries\n• Our NHS services\n• Opening hours & directions\n• General health information\n\nHow can I assist you today?`,
      options: [
        'Check stock/medication',
        'Our services',
        'Health advice',
        'Opening hours'
      ],
      showPrivacyNotice: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', query: '' });
  const [consent, setConsent] = useState({ dataProcessing: false, privacyPolicy: false });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (option) => {
    handleSendMessage(option);
  };

  const handleSendMessage = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: text.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const response = generateResponse(text.trim().toLowerCase());
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  const findHealthResource = (query) => {
    for (const [keyword, resource] of Object.entries(HEALTH_RESOURCES)) {
      if (query.includes(keyword)) {
        return { keyword, ...resource };
      }
    }
    return null;
  };

  const generateResponse = (query) => {
    const response = {
      id: Date.now() + 1,
      type: 'bot',
      text: '',
      options: []
    };

    if (query.includes('stock') || query.includes('medication') || query.includes('medicine') || query.includes('availability')) {
      response.text = "I'd be happy to help check medication availability! For stock enquiries, I'll need to pass your question to our pharmacy team.\n\nWould you like to send us your query via email? We typically respond within a few hours.";
      response.showEmailOption = true;
    } else if (query.includes('service') || query.includes('what do you offer')) {
      const services = config.services.filter(s => s.enabled).slice(0, 5);
      response.text = `We offer a range of NHS and private services including:\n\n${services.map(s => `• ${s.name}`).join('\n')}\n\nWould you like more details about any specific service?`;
      response.options = services.map(s => s.name);
    } else if (query.includes('open') || query.includes('hours') || query.includes('time') || query.includes('close')) {
      const hours = config.hours.map(h => `${h.day}: ${h.isOpen ? `${h.open} - ${h.close}` : 'Closed'}`).join('\n');
      response.text = `Our opening hours are:\n\n${hours}\n\n⚠️ Note: Opening hours may differ on bank and public holidays. Please call ${config.phone} to confirm.\n\nWe're located inside Morrisons on Tritton Road, Lincoln.`;
    } else if (query.includes('bank holiday') || query.includes('public holiday') || query.includes('holiday')) {
      response.text = `⚠️ Bank & Public Holidays:\n\nOur opening hours may differ on bank and public holidays. We recommend calling us on ${config.phone} to confirm our hours before visiting.\n\nYou can also check our social media or Google Business page for any holiday updates.`;
      response.isPhone = true;
    } else if (query.includes('direction') || query.includes('location') || query.includes('where') || query.includes('find') || query.includes('address')) {
      response.text = `We're located at:\n\n${config.address.full}\n\nInside Morrisons supermarket - free parking available!`;
      response.isMap = true;
    } else if (query.includes('call') || query.includes('phone') || query.includes('contact') || query.includes('number')) {
      response.text = `You can call us on ${config.phone} during opening hours. Our team is always happy to help!`;
      response.isPhone = true;
    } else if (query.includes('health') || query.includes('advice') || query.includes('symptom') || query.includes('feeling') || query.includes('sick') || query.includes('ill')) {
      // Check if there's a specific health topic mentioned
      const healthResource = findHealthResource(query);
      
      if (healthResource) {
        response.text = `I found some information about ${healthResource.keyword} from ${healthResource.source}:\n\n📋 Click the link below to read trusted NHS guidance on this topic.`;
        response.healthLink = healthResource;
        response.showDisclaimer = true;
      } else {
        response.text = `For health advice, I can provide links to trusted NHS resources. What would you like to know about?\n\nCommon topics:\n• Cold & flu symptoms\n• Headaches\n• Stomach issues\n• Skin conditions\n• Allergies\n\nOr visit us in store to speak with our pharmacists directly.`;
        response.options = ['Cold & flu', 'Headaches', 'Stomach problems', 'Allergies', 'Speak to pharmacist'];
      }
    } 
    // Specific health condition queries
    else if (findHealthResource(query)) {
      const healthResource = findHealthResource(query);
      response.text = `I found NHS guidance on ${healthResource.keyword}:\n\n📋 Click the link below for trusted information from ${healthResource.source}.`;
      response.healthLink = healthResource;
      response.showDisclaimer = true;
    }
    else if (query.includes('nhs pharmacy first') || query.includes('pharmacy first')) {
      response.text = "Under NHS Pharmacy First, we can assess and treat these 7 conditions for FREE without a GP appointment:\n\n• Sore throat\n• Sinusitis\n• Earache\n• Infected insect bites\n• Impetigo\n• Shingles\n• Uncomplicated UTIs (women)\n\nJust walk in during opening hours - no appointment needed!";
      response.options = ['More about Pharmacy First', 'Opening hours'];
    }
    else if (query.includes('email') || query.includes('send') || query.includes('message')) {
      response.showEmailOption = true;
      response.text = "I'll help you send a message to our pharmacy team.";
    } else if (query.includes('privacy') || query.includes('data') || query.includes('gdpr')) {
      response.text = "Your privacy is important to us. We collect your name, email, and query only to respond to your enquiry. Your data is:\n\n• Encrypted for security\n• Automatically deleted after 90 days\n• Never sold to third parties\n\nYou can request deletion of your data at any time.";
      response.options = ['View Privacy Policy', 'Delete my data'];
    } else if (query.includes('speak') || query.includes('pharmacist') || query.includes('talk')) {
      response.text = `To speak with one of our pharmacists:\n\n📞 Call us: ${config.phone}\n🏪 Visit us in store at Morrisons, Tritton Road\n\nNo appointment needed for most consultations!`;
      response.isPhone = true;
    } else {
      response.text = "I can help you with:\n\n• Medication stock enquiries\n• Information about our NHS services\n• Opening hours and directions\n• General health information\n\nWhat would you like to know?";
      response.options = ['Check stock', 'Our services', 'Health advice', 'Opening hours'];
    }

    return response;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    // Validate consent
    if (!consent.dataProcessing || !consent.privacyPolicy) {
      alert('Please accept the data processing consent and privacy policy to continue.');
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/pharmacy-chatbot/email-query`, {
        pharmacy_email: config.email,
        customer_name: emailForm.name,
        customer_email: emailForm.email,
        query: emailForm.query,
        pharmacy_name: config.name,
        consent: {
          data_processing_consent: consent.dataProcessing,
          privacy_policy_accepted: consent.privacyPolicy,
          consent_timestamp: new Date().toISOString(),
          consent_version: "1.0"
        }
      });

      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        text: `Thanks ${emailForm.name}! Your message has been sent.\n\n📋 Reference: ${response.data.reference_id || 'N/A'}\n📧 We'll respond to ${emailForm.email} soon.\n🗓️ ${response.data.data_retention_notice || 'Your data will be deleted after 90 days.'}`
      }]);

      setShowEmailForm(false);
      setEmailForm({ name: '', email: '', query: '' });
      setConsent({ dataProcessing: false, privacyPolicy: false });
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'There was an error sending your message.';
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        text: `Sorry, ${errorMessage}\n\nPlease call us on ${config.phone} or email ${config.email} directly.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 50,
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    backgroundColor: isOpen ? '#ef4444' : '#1e5631'
  };

  return (
    <>
      {/* Toggle button */}
      <button onClick={onToggle} style={buttonStyle} data-testid="chatbot-toggle">
        {isOpen ? <X size={28} color="white" /> : <MessageCircle size={28} color="white" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          zIndex: 50,
          width: '380px',
          maxWidth: 'calc(100vw - 48px)',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#1e5631',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={24} style={{ color: '#1e5631' }} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: 'white', fontWeight: 600, margin: 0 }}>{config.name}</h3>
              <p style={{ color: '#bbf7d0', fontSize: '14px', margin: 0 }}>Pharmacy Assistant</p>
            </div>
            <a 
              href="/privacy" 
              target="_blank"
              style={{ color: '#bbf7d0', fontSize: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Shield size={14} /> Privacy
            </a>
          </div>

          {/* Messages */}
          <div style={{
            height: '400px',
            overflowY: 'auto',
            padding: '16px',
            backgroundColor: '#f8fafc'
          }}>
            {messages.map((message) => (
              <div key={message.id} style={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '16px'
              }}>
                <div style={{ maxWidth: '85%' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '8px',
                    flexDirection: message.type === 'user' ? 'row-reverse' : 'row'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      backgroundColor: message.type === 'user' ? '#1e5631' : 'white',
                      border: message.type === 'bot' ? '1px solid #e2e8f0' : 'none'
                    }}>
                      {message.type === 'user' ? (
                        <User size={16} color="white" />
                      ) : (
                        <Bot size={16} color="#1e5631" />
                      )}
                    </div>
                    <div style={{
                      borderRadius: '16px',
                      padding: '12px 16px',
                      backgroundColor: message.type === 'user' ? '#1e5631' : 'white',
                      color: message.type === 'user' ? 'white' : '#0f172a',
                      boxShadow: message.type === 'bot' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                    }}>
                      <p style={{ margin: 0, whiteSpace: 'pre-line', fontSize: '14px' }}>{message.text}</p>
                    </div>
                  </div>

                  {/* Privacy Notice for first message */}
                  {message.showPrivacyNotice && (
                    <div style={{
                      marginTop: '8px',
                      marginLeft: '40px',
                      padding: '8px 12px',
                      backgroundColor: '#fef3c7',
                      border: '1px solid #fcd34d',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#92400e'
                    }}>
                      <p style={{ margin: 0, display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Shield size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Your data is protected. <a href="/privacy" target="_blank" style={{ color: '#92400e' }}>Privacy Policy</a></span>
                      </p>
                    </div>
                  )}

                  {/* Health Resource Link */}
                  {message.healthLink && (
                    <div style={{ marginTop: '8px', marginLeft: '40px' }}>
                      <a
                        href={message.healthLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '14px',
                          backgroundColor: '#005eb8',
                          color: 'white',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          textDecoration: 'none'
                        }}
                      >
                        <ExternalLink size={16} />
                        Read NHS Guidance
                      </a>
                      <a
                        href="https://patient.info"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '14px',
                          backgroundColor: '#6b7280',
                          color: 'white',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          marginLeft: '8px',
                          marginTop: '8px'
                        }}
                      >
                        <ExternalLink size={16} />
                        Patient.info
                      </a>
                    </div>
                  )}

                  {/* Health Disclaimer */}
                  {message.showDisclaimer && (
                    <div style={{
                      marginTop: '12px',
                      marginLeft: '40px',
                      padding: '12px',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#7f1d1d'
                    }}>
                      <p style={{ margin: 0, display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Info size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>Disclaimer:</strong> This information is for general guidance only from NHS.uk. It is not a substitute for professional medical advice. Always consult a healthcare professional for medical concerns. For emergencies, call 999.</span>
                      </p>
                    </div>
                  )}

                  {/* Options */}
                  {message.options?.length > 0 && (
                    <div style={{ marginTop: '8px', marginLeft: '40px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {message.options.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionClick(option)}
                          style={{
                            fontSize: '12px',
                            backgroundColor: 'white',
                            border: '1px solid #1e5631',
                            color: '#1e5631',
                            padding: '6px 12px',
                            borderRadius: '9999px',
                            cursor: 'pointer'
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Email option */}
                  {message.showEmailOption && (
                    <div style={{ marginTop: '8px', marginLeft: '40px' }}>
                      <button
                        onClick={() => setShowEmailForm(true)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '14px',
                          backgroundColor: '#1e5631',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '9999px',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <Mail size={16} />
                        Send Email to Pharmacy
                      </button>
                    </div>
                  )}

                  {/* Map link */}
                  {message.isMap && (
                    <div style={{ marginTop: '8px', marginLeft: '40px' }}>
                      <a
                        href={config.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '14px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '9999px',
                          textDecoration: 'none'
                        }}
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  )}

                  {/* Phone link */}
                  {message.isPhone && (
                    <div style={{ marginTop: '8px', marginLeft: '40px' }}>
                      <a
                        href={`tel:${config.phone}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '14px',
                          backgroundColor: '#22c55e',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '9999px',
                          textDecoration: 'none'
                        }}
                      >
                        Call {config.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                  <Loader2 size={16} style={{ color: '#1e5631', animation: 'spin 1s linear infinite' }} />
                  <span style={{ fontSize: '14px', color: '#64748b' }}>Typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Email form overlay - GDPR Compliant */}
          {showEmailForm && (
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'white',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                backgroundColor: '#1e5631',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <h3 style={{ color: 'white', fontWeight: 600, margin: 0 }}>Send us a message</h3>
                <button onClick={() => setShowEmailForm(false)} style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer'
                }}>
                  <X size={20} />
                </button>
              </div>
              
              {/* Sensitive Data Warning */}
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#fef2f2',
                borderBottom: '1px solid #fecaca',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <AlertTriangle size={18} style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ margin: 0, fontSize: '12px', color: '#7f1d1d', lineHeight: 1.4 }}>
                  <strong>Do NOT include:</strong> Prescription details, NHS numbers, medical history, or sensitive health information. For such queries, please call us directly.
                </p>
              </div>
              
              <form onSubmit={handleEmailSubmit} style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '4px' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={emailForm.name}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, name: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '4px' }}>Your Email *</label>
                  <input
                    type="email"
                    required
                    value={emailForm.email}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, email: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="john@example.com"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '4px' }}>Your Query *</label>
                  <textarea
                    required
                    minLength={10}
                    maxLength={2000}
                    value={emailForm.query}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, query: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      resize: 'none',
                      minHeight: '80px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="E.g., Do you have ibuprofen 400mg in stock?"
                  />
                </div>
                
                {/* GDPR Consent Checkboxes */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={consent.dataProcessing}
                      onChange={(e) => setConsent(prev => ({ ...prev, dataProcessing: e.target.checked }))}
                      style={{ marginTop: '3px' }}
                      required
                    />
                    <span style={{ fontSize: '12px', color: '#334155', lineHeight: 1.4 }}>
                      I consent to my personal data being processed to respond to my enquiry. 
                      Data will be automatically deleted after 90 days. *
                    </span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={consent.privacyPolicy}
                      onChange={(e) => setConsent(prev => ({ ...prev, privacyPolicy: e.target.checked }))}
                      style={{ marginTop: '3px' }}
                      required
                    />
                    <span style={{ fontSize: '12px', color: '#334155', lineHeight: 1.4 }}>
                      I have read and accept the <a href="/privacy" target="_blank" style={{ color: '#1e5631' }}>Privacy Policy</a>. *
                    </span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !consent.dataProcessing || !consent.privacyPolicy}
                  style={{
                    width: '100%',
                    backgroundColor: (consent.dataProcessing && consent.privacyPolicy) ? '#1e5631' : '#94a3b8',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 500,
                    border: 'none',
                    cursor: (consent.dataProcessing && consent.privacyPolicy) ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: isLoading ? 0.5 : 1
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
                
                <p style={{ fontSize: '11px', color: '#64748b', textAlign: 'center', margin: 0 }}>
                  Your data is encrypted and protected. <a href="/privacy" target="_blank" style={{ color: '#1e5631' }}>Learn more</a>
                </p>
              </form>
            </div>
          )}

          {/* Input */}
          {!showEmailForm && (
            <div style={{
              padding: '16px',
              borderTop: '1px solid #e2e8f0',
              backgroundColor: 'white'
            }}>
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{
                display: 'flex',
                gap: '8px'
              }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '9999px',
                    fontSize: '14px'
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#1e5631',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    opacity: (!input.trim() || isLoading) ? 0.5 : 1
                  }}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
    <style>
      {`
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 0 0 rgba(30, 86, 49, 0.7);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 20px 10px rgba(30, 86, 49, 0.4);
            transform: scale(1.05);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(30, 86, 49, 0);
            transform: scale(1);
          }
        }
      `}
    </style>
    </>
  );
}
