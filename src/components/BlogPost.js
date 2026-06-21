import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Phone, ChevronLeft, ArrowRight, ShieldCheck, UserPlus } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://www.pharmadpro.co.uk/api';
const SITE_URL = 'https://trittonroadpharmacy.co.uk';

/**
 * Single blog post page — rendered at /blog/{slug}.
 * Sets the right page title / meta description for SEO and injects
 * BlogPosting + BreadcrumbList + FAQPage JSON-LD when an FAQ is present.
 */
export default function BlogPost({ slug, onBack, onOpenSignup }) {
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(`${API_URL}/blog/posts/${encodeURIComponent(slug)}`);
        if (cancelled) return;
        setPost(res.data.post);
        setRelated(res.data.related || []);
        setLoading(false);

        // SEO meta updates
        document.title = `${res.data.post.title} | Tritton Road Pharmacy Lincoln`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', res.data.post.meta_description || res.data.post.excerpt || '');

        // Canonical update
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
          canonical = document.createElement('link');
          canonical.rel = 'canonical';
          document.head.appendChild(canonical);
        }
        canonical.href = `${SITE_URL}/blog/${slug}`;
      } catch (e) {
        if (!cancelled) {
          if (e.response && e.response.status === 404) {
            setError('Sorry — that article doesn\'t exist or has been unpublished.');
          } else {
            setError('Unable to load the article right now. Please try again.');
          }
          setLoading(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div data-testid="blogpost-loading" style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
        Loading article…
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 20px' }}>
        <button
          onClick={onBack}
          data-testid="blogpost-back-btn"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'transparent', border: 'none', color: '#1e5631',
            fontWeight: 600, cursor: 'pointer', marginBottom: '20px'
          }}
        >
          <ChevronLeft size={16} /> Back to blog
        </button>
        <div data-testid="blogpost-error" style={{
          padding: '40px', background: '#fef3c7', color: '#854d0e',
          borderRadius: '12px', textAlign: 'center'
        }}>
          {error || 'Article unavailable.'}
        </div>
      </div>
    );
  }

  const publishedDate = post.published_at ? new Date(post.published_at) : null;
  const publishedISO = publishedDate ? publishedDate.toISOString() : '';
  const publishedDisplay = publishedDate
    ? publishedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  // Schema markup
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: `${SITE_URL}/assets/pharmacy-logo.png`,
    datePublished: publishedISO,
    dateModified: post.updated_at ? new Date(post.updated_at).toISOString() : publishedISO,
    author: { '@type': 'Organization', name: 'Tritton Road Pharmacy', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Tritton Road Pharmacy',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/pharmacy-logo.png` }
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    keywords: (post.keywords || []).join(', ')
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` }
    ]
  };

  const faqSchema = (post.faq && post.faq.length > 0) ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  } : null;

  return (
    <article data-testid="blogpost-article" style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 16px 80px' }}>
      <button
        onClick={onBack}
        data-testid="blogpost-back-btn"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'transparent', border: 'none', color: '#1e5631',
          fontWeight: 600, cursor: 'pointer', fontSize: '14px', marginBottom: '20px'
        }}
      >
        <ChevronLeft size={16} /> Back to all articles
      </button>

      {/* Visible breadcrumbs (matches schema) */}
      <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 6px' }}>/</span>
        <a href="/blog" style={{ color: '#64748b', textDecoration: 'none' }}>Blog</a>
        <span style={{ margin: '0 6px' }}>/</span>
        <span style={{ color: '#0f172a', fontWeight: 600 }}>{post.category}</span>
      </nav>

      <header style={{ marginBottom: '32px' }}>
        {post.category && (
          <span style={{
            display: 'inline-block', backgroundColor: '#e8f5e9', color: '#1e5631',
            padding: '5px 12px', borderRadius: '6px', fontSize: '13px',
            fontWeight: 600, marginBottom: '14px'
          }}>{post.category}</span>
        )}
        <h1 data-testid="blogpost-title" style={{
          fontSize: '34px', color: '#0f172a', margin: '0 0 14px',
          lineHeight: 1.18, fontWeight: 800
        }}>{post.title}</h1>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap',
          fontSize: '14px', color: '#64748b'
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <ShieldCheck size={14} color="#1e5631" /> Reviewed by Tritton Road Pharmacy team
          </span>
          {publishedDisplay && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Calendar size={14} /> {publishedDisplay}
            </span>
          )}
        </div>
      </header>

      {/* Article body */}
      <div
        data-testid="blogpost-content"
        dangerouslySetInnerHTML={{ __html: post.content_html }}
        style={{
          color: '#1e293b', fontSize: '17px', lineHeight: 1.7,
        }}
      />
      <style>{`
        [data-testid="blogpost-content"] h2 { font-size: 24px; color: #0f172a; margin: 32px 0 12px; line-height: 1.25; font-weight: 700; }
        [data-testid="blogpost-content"] h3 { font-size: 19px; color: #1e5631; margin: 24px 0 8px; font-weight: 700; }
        [data-testid="blogpost-content"] p { margin: 0 0 18px; }
        [data-testid="blogpost-content"] ul, [data-testid="blogpost-content"] ol { margin: 0 0 18px; padding-left: 22px; }
        [data-testid="blogpost-content"] li { margin-bottom: 8px; }
        [data-testid="blogpost-content"] strong { color: #0f172a; }
      `}</style>

      {/* CTA — drives leads into PatientSignup */}
      <div style={{
        marginTop: '40px',
        padding: '28px 24px',
        background: 'linear-gradient(135deg, #1e5631, #2d8a4e)',
        borderRadius: '14px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 700 }}>Need pharmacist advice?</h3>
        <p style={{ margin: '0 0 18px', fontSize: '15px', opacity: 0.92 }}>
          Sign up online or call us today — our team in Lincoln (LN6) is here to help.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenSignup}
            data-testid="blogpost-cta-signup"
            style={{
              backgroundColor: '#f59e0b', color: 'white', border: 'none',
              padding: '12px 22px', borderRadius: '9999px',
              fontWeight: 700, fontSize: '15px', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '8px'
            }}
          >
            <UserPlus size={16} /> Sign up for free advice
          </button>
          <a href="tel:01522537145" style={{
            backgroundColor: 'white', color: '#1e5631',
            padding: '12px 22px', borderRadius: '9999px',
            fontWeight: 700, fontSize: '15px', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '8px'
          }} data-testid="blogpost-cta-call">
            <Phone size={16} /> Call 01522 537145
          </a>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section style={{ marginTop: '48px' }}>
          <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 20px', fontWeight: 700 }}>
            More from the blog
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {related.map(r => (
              <a
                key={r.slug}
                href={`/blog/${r.slug}`}
                data-testid={`blogpost-related-${r.slug}`}
                style={{
                  display: 'block', padding: '16px', borderRadius: '10px',
                  border: '1px solid #e2e8f0', textDecoration: 'none',
                  background: 'white'
                }}
              >
                <h4 style={{ margin: '0 0 6px', fontSize: '15px', color: '#0f172a', fontWeight: 700, lineHeight: 1.3 }}>
                  {r.title}
                </h4>
                <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                  {(r.excerpt || '').substring(0, 90)}…
                </p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#1e5631', fontWeight: 600, fontSize: '13px' }}>
                  Read more <ArrowRight size={12} />
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Schema markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
    </article>
  );
}
