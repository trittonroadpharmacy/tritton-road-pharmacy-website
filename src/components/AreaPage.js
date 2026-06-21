import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, MapPin, ChevronLeft, ShieldCheck, Truck, Pill, Stethoscope } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://www.pharmadpro.co.uk/api';
const SITE_URL = 'https://trittonroadpharmacy.co.uk';

/**
 * Hyper-local landing page for a specific Lincoln area.
 * URL pattern: /areas/{slug}
 *
 * Each page carries:
 *   - Bespoke content from PharmAdPro's /api/areas/{slug}
 *   - LocalBusiness + Service + BreadcrumbList + FAQPage JSON-LD
 *   - Canonical link pointing at the exact URL
 *   - meta description + page title bound to the area
 */
export default function AreaPage({ slug, onBack, onOpenSignup }) {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(`${API_URL}/areas/${encodeURIComponent(slug)}`);
        if (cancelled) return;
        const p = res.data;
        setPage(p);
        setLoading(false);

        document.title = `${p.title} | Tritton Road Pharmacy`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', p.meta_description || '');
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
          canonical = document.createElement('link');
          canonical.rel = 'canonical';
          document.head.appendChild(canonical);
        }
        canonical.href = `${SITE_URL}/areas/${slug}`;
      } catch (e) {
        if (!cancelled) {
          setError(e.response?.status === 404
            ? 'That area page isn\'t live yet.'
            : 'Unable to load this page. Please try again.');
          setLoading(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return <div data-testid="areapage-loading" style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>Loading…</div>;
  }
  if (error || !page) {
    return (
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 20px' }}>
        <button onClick={onBack} data-testid="areapage-back-btn"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: '#1e5631', fontWeight: 600, cursor: 'pointer', marginBottom: '20px' }}>
          <ChevronLeft size={16} /> Back to home
        </button>
        <div data-testid="areapage-error" style={{ padding: '40px', background: '#fef3c7', color: '#854d0e', borderRadius: '12px', textAlign: 'center' }}>
          {error || 'Page unavailable.'}
        </div>
      </div>
    );
  }

  // Schemas
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'Pharmacy',
    name: 'Tritton Road Pharmacy',
    image: `${SITE_URL}/assets/pharmacy-logo.png`,
    url: `${SITE_URL}/areas/${page.slug}`,
    telephone: '+441522537145',
    priceRange: '£',
    address: { '@type': 'PostalAddress', streetAddress: 'Unit 1, Morrisons, Tritton Road', addressLocality: 'Lincoln', postalCode: 'LN6 7QL', addressCountry: 'GB' },
    areaServed: [
      { '@type': 'Place', name: page.area_name },
      { '@type': 'PostalCodeSpecification', postalCode: page.approx_postcode, addressCountry: 'GB' },
    ],
    geo: { '@type': 'GeoCoordinates', latitude: 53.2118, longitude: -0.5728 },
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Pharmacy Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'NHS Prescription Dispensing', areaServed: page.area_name } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Free Prescription Home Delivery', areaServed: page.area_name } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'NHS Pharmacy First', areaServed: page.area_name } },
      ],
    },
  };
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Areas we serve', item: `${SITE_URL}/areas` },
      { '@type': 'ListItem', position: 3, name: page.area_name, item: `${SITE_URL}/areas/${page.slug}` },
    ],
  };
  const faqSchema = (page.faq && page.faq.length > 0) ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: page.faq.map(f => ({
      '@type': 'Question', name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null;

  return (
    <article data-testid="areapage-article" style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 16px 80px' }}>
      <button onClick={onBack} data-testid="areapage-back-btn"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: '#1e5631', fontWeight: 600, cursor: 'pointer', fontSize: '14px', marginBottom: '20px' }}>
        <ChevronLeft size={16} /> Back to home
      </button>

      {/* Visible breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 6px' }}>/</span>
        <span>Areas we serve</span>
        <span style={{ margin: '0 6px' }}>/</span>
        <span style={{ color: '#0f172a', fontWeight: 600 }}>{page.area_name}</span>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e5631, #2d8a4e)', color: 'white', padding: '28px 26px', borderRadius: '16px', marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.18)', padding: '5px 12px', borderRadius: '9999px', fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>
          <MapPin size={14} /> {page.miles_from_pharmacy} miles {page.direction} of LN6 7QL
        </div>
        <h1 data-testid="areapage-title" style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 10px', lineHeight: 1.18 }}>{page.title}</h1>
        {page.hero_tagline && <p style={{ margin: 0, fontSize: '17px', opacity: 0.95 }}>{page.hero_tagline}</p>}
      </div>

      {/* Service quick-strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '26px' }}>
        {[
          { Icon: Pill,        label: 'NHS Prescriptions' },
          { Icon: Truck,       label: 'Free Home Delivery' },
          { Icon: Stethoscope, label: 'NHS Pharmacy First' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
            <s.Icon size={18} color="#1e5631" />
            <p style={{ margin: '6px 0 0', fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Body */}
      <div data-testid="areapage-content"
        dangerouslySetInnerHTML={{ __html: page.content_html }}
        style={{ color: '#1e293b', fontSize: '17px', lineHeight: 1.7 }} />
      <style>{`
        [data-testid="areapage-content"] h2 { font-size: 24px; color: #0f172a; margin: 32px 0 12px; line-height: 1.25; font-weight: 700; }
        [data-testid="areapage-content"] h3 { font-size: 18px; color: #1e5631; margin: 22px 0 8px; font-weight: 700; }
        [data-testid="areapage-content"] p { margin: 0 0 16px; }
        [data-testid="areapage-content"] ul, [data-testid="areapage-content"] ol { margin: 0 0 18px; padding-left: 22px; }
        [data-testid="areapage-content"] li { margin-bottom: 8px; }
        [data-testid="areapage-content"] strong { color: #0f172a; }
      `}</style>

      {/* CTA */}
      <div style={{ marginTop: '36px', padding: '26px 24px', background: 'linear-gradient(135deg, #1e5631, #2d8a4e)', borderRadius: '14px', color: 'white', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 700 }}>Get prescriptions delivered to {page.area_name}</h3>
        <p style={{ margin: '0 0 16px', fontSize: '15px', opacity: 0.92 }}>Sign up online in 2 minutes — or call us today.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onOpenSignup} data-testid="areapage-cta-signup"
            style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '12px 22px', borderRadius: '9999px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} /> Sign up — free
          </button>
          <a href="tel:01522537145" data-testid="areapage-cta-call"
            style={{ backgroundColor: 'white', color: '#1e5631', padding: '12px 22px', borderRadius: '9999px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={16} /> Call 01522 537145
          </a>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    </article>
  );
}
