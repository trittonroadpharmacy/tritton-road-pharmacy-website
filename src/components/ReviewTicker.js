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

  // Triple the reviews for seamless infinite scroll
  const displayReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div style={{
      background: 'linear-gradient(90deg, #1e5631 0%, #2d7a47 50%, #1e5631 100%)',
      padding: '12px 0',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{
        display: 'flex',
        animation: 'tickerScroll 45s linear infinite',
        whiteSpace: 'nowrap'
      }}>
        {displayReviews.map((review, index) => (
          <div 
            key={`${review.author_name}-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 32px',
              flexShrink: 0
            }}
          >
            {/* Stars */}
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(review.rating || 5)].map((_, i) => (
                <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
            
            {/* Review snippet */}
            <span style={{ 
              color: 'white', 
              fontSize: '14px',
              fontWeight: 500
            }}>
              "{review.text?.length > 70 ? review.text.substring(0, 70) + '...' : review.text}"
            </span>
            
            {/* Author */}
            <span style={{ 
              color: '#bbf7d0', 
              fontSize: '13px',
              fontWeight: 600
            }}>
              — {review.author_name}
            </span>
            
            {/* Separator */}
            <span style={{ color: '#4ade80', margin: '0 16px' }}>★</span>
          </div>
        ))}
      </div>
      
      {/* CSS Animation */}
      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};

export default ReviewTicker;
