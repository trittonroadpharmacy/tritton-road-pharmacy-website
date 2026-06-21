import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, ArrowRight, BookOpen, Tag, ChevronLeft } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://www.pharmadpro.co.uk/api';
const SITE_URL = 'https://trittonroadpharmacy.co.uk';

/**
 * Blog index page — lists every published article from PharmAdPro's
 * /api/blog/posts endpoint. Server-rendered HTML on Cloudflare Pages
 * isn't possible (this is a CRA build), but Googlebot will index the
 * client-rendered content because we keep page content stable and
 * minimise client-side conditions. We also inject a BlogPosting + ItemList
 * JSON-LD block for rich snippets.
 */
export default function Blog({ onBack }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    document.title = 'Pharmacy Health Blog — Tritton Road Pharmacy Lincoln';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content',
      'NHS pharmacy advice, local health guides and seasonal updates from Tritton Road Pharmacy in Lincoln. Updated weekly.'
    );

    (async () => {
      try {
        const res = await axios.get(`${API_URL}/blog/posts?limit=50`);
        if (!cancelled) {
          setPosts(res.data.posts || []);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError('Unable to load articles right now. Please try again later.');
          setLoading(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 16px 80px' }}>
      <button
        onClick={onBack}
        data-testid="blog-back-home-btn"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'transparent', border: 'none', color: '#1e5631',
          fontWeight: 600, cursor: 'pointer', fontSize: '14px', marginBottom: '20px'
        }}
      >
        <ChevronLeft size={16} /> Back to home
      </button>

      <header style={{ marginBottom: '40px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          backgroundColor: '#e8f5e9', color: '#1e5631',
          padding: '6px 14px', borderRadius: '9999px', fontSize: '13px', fontWeight: 600,
          marginBottom: '14px'
        }}>
          <BookOpen size={14} /> Pharmacy Health Blog
        </div>
        <h1 style={{ fontSize: '36px', color: '#0f172a', margin: '0 0 12px', fontWeight: 800, lineHeight: 1.1 }}>
          Trusted NHS-Pharmacist Health Advice for Lincoln
        </h1>
        <p style={{ fontSize: '17px', color: '#475569', maxWidth: '720px', margin: 0, lineHeight: 1.55 }}>
          Local health guides, NHS service explainers and seasonal tips —
          written by our pharmacy team for patients across Lincoln, North
          Hykeham, Waddington and the surrounding villages.
        </p>
      </header>

      {loading && (
        <div data-testid="blog-loading" style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
          Loading articles…
        </div>
      )}

      {error && (
        <div data-testid="blog-error" style={{ padding: '20px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px' }}>
          {error}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div data-testid="blog-empty" style={{
          padding: '60px 20px', textAlign: 'center', color: '#64748b',
          background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '12px'
        }}>
          <p style={{ margin: 0, fontSize: '16px' }}>Our pharmacists are writing the first articles right now — please check back soon.</p>
        </div>
      )}

      <div data-testid="blog-list" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {posts.map((p) => (
          <article
            key={p.id || p.slug}
            data-testid={`blog-card-${p.slug}`}
            style={{
              background: 'white', borderRadius: '14px', overflow: 'hidden',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              display: 'flex', flexDirection: 'column',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(30,86,49,0.10)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
            }}
          >
            <div style={{
              height: '8px',
              background: 'linear-gradient(90deg, #1e5631, #2d8a4e, #1e5631)'
            }} />
            <div style={{ padding: '22px 22px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              {p.category && (
                <span style={{
                  alignSelf: 'flex-start',
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  fontSize: '12px', fontWeight: 600, color: '#1e5631',
                  background: '#e8f5e9', padding: '4px 10px', borderRadius: '6px', marginBottom: '12px'
                }}>
                  <Tag size={11} /> {p.category}
                </span>
              )}
              <h2 style={{
                fontSize: '19px', fontWeight: 700, color: '#0f172a',
                lineHeight: 1.3, margin: '0 0 10px'
              }}>{p.title}</h2>
              <p style={{
                fontSize: '14px', color: '#64748b', lineHeight: 1.55, margin: '0 0 16px', flex: 1
              }}>{p.excerpt}</p>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: '14px', borderTop: '1px solid #f1f5f9'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#94a3b8' }}>
                  <Calendar size={12} />
                  {p.published_at ? new Date(p.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                </span>
                <a
                  href={`/blog/${p.slug}`}
                  data-testid={`blog-read-${p.slug}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    color: '#1e5631', fontWeight: 600, fontSize: '14px',
                    textDecoration: 'none'
                  }}
                >
                  Read article <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* JSON-LD: ItemList of articles — helps rich snippets */}
      {posts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: posts.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${SITE_URL}/blog/${p.slug}`,
                name: p.title,
              })),
            }),
          }}
        />
      )}
    </div>
  );
}
