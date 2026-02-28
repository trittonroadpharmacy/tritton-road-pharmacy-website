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

  if (loading || reviews.length === 0) {
    return null;
  }

  const displayReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="review-ticker-container">
      {/* Google Badge */}
      <div className="google-badge">
        <svg viewBox="0 0 24 24" className="google-icon">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span>Google Reviews</span>
      </div>

      {/* Ticker */}
      <div className="ticker-track">
        <div className="ticker-content">
          {displayReviews.map((review, index) => (
            <div key={`review-${index}`} className="review-card">
              <div className="review-header">
                <div className="stars">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="star" />
                  ))}
                </div>
                <span className="verified">Verified Review</span>
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-footer">
                <span className="author">— {review.author_name}</span>
                <span className="time">{review.relative_time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .review-ticker-container {
          background: linear-gradient(135deg, #1a5f2a 0%, #2d8a3e 50%, #1a5f2a 100%);
          padding: 16px 0;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          border-bottom: 3px solid #fbbf24;
        }
        
        .google-badge {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 8px 16px;
          border-radius: 50px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          z-index: 10;
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }
        
        .google-icon {
          width: 20px;
          height: 20px;
        }
        
        .ticker-track {
          overflow: hidden;
          margin-left: 180px;
        }
        
        .ticker-content {
          display: flex;
          animation: scroll 45s linear infinite;
          gap: 24px;
        }
        
        .ticker-content:hover {
          animation-play-state: paused;
        }
        
        .review-card {
          flex-shrink: 0;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 16px 24px;
          min-width: 400px;
          max-width: 500px;
          border: 1px solid rgba(255,255,255,0.2);
        }
        
        .review-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .stars {
          display: flex;
          gap: 3px;
        }
        
        .star {
          width: 18px;
          height: 18px;
          fill: #fbbf24;
          color: #fbbf24;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
        }
        
        .verified {
          font-size: 11px;
          color: #bbf7d0;
          background: rgba(0,0,0,0.2);
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 500;
        }
        
        .review-text {
          color: white;
          font-size: 15px;
          line-height: 1.5;
          margin: 0 0 12px 0;
          font-style: italic;
        }
        
        .review-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .author {
          color: #fef08a;
          font-weight: 600;
          font-size: 14px;
        }
        
        .time {
          color: rgba(255,255,255,0.7);
          font-size: 12px;
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        
        @media (max-width: 768px) {
          .google-badge {
            position: relative;
            left: auto;
            top: auto;
            transform: none;
            margin: 0 auto 12px;
            width: fit-content;
          }
          
          .ticker-track {
            margin-left: 0;
          }
          
          .review-card {
            min-width: 300px;
            max-width: 350px;
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewTicker;
