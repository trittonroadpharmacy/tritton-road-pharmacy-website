import React, { useState, useEffect } from 'react';
import { Star, CheckCircle } from 'lucide-react';

const API_URL = 'https://pharmadpro-backend.onrender.com/api';

// Google logo inline SVG (small version)
const GoogleLogoSmall = () => (
  <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

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
      padding: '10px 0',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Verified badge - fixed on left */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        backgroundColor: '#1e5631',
        zIndex: 2,
        borderRight: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'white',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 600,
          color: '#1a1a1a'
        }}>
          <GoogleLogoSmall />
          <span>Verified Reviews</span>
          <CheckCircle size={12} color="#34A853" fill="#34A853" />
        </div>
      </div>

      {/* Scrolling reviews */}
      <div style={{
        display: 'flex',
        animation: 'tickerScroll 60s linear infinite',
        paddingLeft: '180px'
      }}>
        {displayReviews.map((review, index) => (
          <div 
            key={`${review.author_name}-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0 40px',
              flexShrink: 0
            }}
          >
            {/* Golden Stars */}
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star 
                  key={i} 
                  size={14} 
                  fill="#FBBC05" 
                  color="#FBBC05"
                  style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))' }}
                />
              ))}
            </div>
            
            {/* Review snippet */}
            <span style={{ 
              color: 'white', 
              fontSize: '14px',
              fontWeight: 500,
              maxWidth: '300px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              "{review.text?.length > 60 ? review.text.substring(0, 60) + '...' : review.text}"
            </span>
            
            {/* Author */}
            <span style={{ 
              color: '#bbf7d0', 
              fontSize: '13px',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}>
              — {review.author_name}
            </span>
            
            {/* Separator */}
            <span style={{ 
              color: '#FBBC05', 
              margin: '0 8px',
              fontSize: '16px'
            }}>★</span>
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
