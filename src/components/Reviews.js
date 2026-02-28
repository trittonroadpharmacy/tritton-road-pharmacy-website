import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';

const API_URL = 'https://pharmadpro-backend.onrender.com/api';

// Google logo SVG
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// Golden star component
const GoldenStar = ({ filled = true }) => (
  <Star 
    size={20} 
    fill={filled ? '#FBBC05' : 'none'} 
    color="#FBBC05"
    style={{ filter: filled ? 'drop-shadow(0 1px 2px rgba(251, 188, 5, 0.3))' : 'none' }}
  />
);

export default function Reviews({ config }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/google-reviews/public/approved`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 200px)' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1e5631 0%, #2d7a47 100%)',
        padding: '60px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Google badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'white',
            padding: '12px 24px',
            borderRadius: '50px',
            marginBottom: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <GoogleLogo />
            <span style={{ color: '#1a1a1a', fontWeight: 600, fontSize: '16px' }}>
              Verified Google Reviews
            </span>
            <CheckCircle size={18} color="#34A853" fill="#34A853" style={{ marginLeft: '4px' }} />
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            marginBottom: '16px'
          }}>
            What Our Patients Say
          </h1>
          
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Real reviews from real patients. See why {config.name} is trusted by the Lincoln community.
          </p>

          {/* Rating summary */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            padding: '16px 32px',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>{averageRating}</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>out of 5</div>
            </div>
            <div style={{ width: '1px', height: '50px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={24} fill="#FBBC05" color="#FBBC05" />
                ))}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>
                Based on {reviews.length} reviews
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 20px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e2e8f0',
              borderTopColor: '#1e5631',
              borderRadius: '50%',
              margin: '0 auto',
              animation: 'spin 1s linear infinite'
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : reviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <p>No reviews available at the moment.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {reviews.map((review, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  border: '1px solid #e2e8f0',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                }}
              >
                {/* Header with Google badge */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Avatar */}
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1e5631, #2d7a47)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '18px'
                    }}>
                      {review.author_name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: '16px' }}>
                        {review.author_name}
                      </div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <CheckCircle size={12} color="#34A853" />
                        Verified Google Review
                      </div>
                    </div>
                  </div>
                  <GoogleLogo />
                </div>

                {/* Golden Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <GoldenStar key={i} filled={i <= (review.rating || 5)} />
                  ))}
                </div>

                {/* Review text */}
                <p style={{
                  color: '#374151',
                  fontSize: '15px',
                  lineHeight: 1.7,
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "{review.text}"
                </p>

                {/* Date */}
                {review.relative_time && (
                  <div style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid #f1f5f9',
                    fontSize: '13px',
                    color: '#94a3b8'
                  }}>
                    Posted {review.relative_time}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA to Google */}
        <div style={{
          textAlign: 'center',
          marginTop: '48px',
          padding: '32px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#1a1a1a',
            marginBottom: '12px'
          }}>
            Had a great experience?
          </h3>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>
            We'd love to hear from you! Leave us a review on Google.
          </p>
          <a
            href="https://g.page/r/CY_YOUR_PLACE_ID/review"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#1e5631',
              color: 'white',
              padding: '14px 28px',
              borderRadius: '50px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.2s'
            }}
          >
            <GoogleLogo />
            Leave a Review
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
