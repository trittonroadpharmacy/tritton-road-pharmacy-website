import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const API_URL = 'https://pharmadpro-backend.onrender.com/api';

const ReviewTicker = () => {
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

  if (loading || reviews.length === 0) return null;

  const displayReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section style={{
      background: 'linear-gradient(135deg, #1e5631 0%, #2d7a47 100%)',
      padding: '40px 0',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '700', margin: 0 }}>
            What Our Customers Say
          </h2>
          <span style={{ 
            background: '#fbbf24', 
            color: '#1e5631', 
            padding: '4px 12px', 
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Google Reviews
          </span>
        </div>
      </div>
      
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          gap: '20px',
          animation: 'scroll-reviews 40s linear infinite'
        }}>
          {displayReviews.map((review, index) => (
            <div key={index} style={{
              flexShrink: 0,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '20px',
              width: '350px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
              <p style={{ 
                color: 'white', 
                fontSize: '14px', 
                lineHeight: '1.6',
                margin: '0 0 12px 0',
                fontStyle: 'italic'
              }}>
                "{review.text}"
              </p>
              <p style={{ 
                color: '#fef08a', 
                fontSize: '13px', 
                fontWeight: '600',
                margin: 0
              }}>
                — {review.author_name}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scroll-reviews {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
};

export default ReviewTicker;
