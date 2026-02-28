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

  const displayReviews = [...reviews, ...reviews];

  return (
    <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white py-2 overflow-hidden">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {displayReviews.map((review, index) => (
            <div 
              key={`${review.author_name}-${index}`}
              className="ticker-item"
            >
              <div className="stars">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star key={i} className="star-icon" />
                ))}
              </div>
              <span className="review-text">
                "{review.text?.length > 80 ? review.text.substring(0, 80) + '...' : review.text}"
              </span>
              <span className="author-name">
                — {review.author_name}
              </span>
              <span className="separator">★</span>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .ticker-wrapper {
          overflow: hidden;
          width: 100%;
        }
        .ticker-content {
          display: flex;
          animation: ticker 30s linear infinite;
        }
        .ticker-content:hover {
          animation-play-state: paused;
        }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 32px;
          white-space: nowrap;
        }
        .stars {
          display: flex;
          gap: 2px;
        }
        .star-icon {
          width: 12px;
          height: 12px;
          fill: #facc15;
          color: #facc15;
        }
        .review-text {
          font-size: 14px;
          font-weight: 500;
        }
        .author-name {
          color: #bbf7d0;
          font-size: 14px;
        }
        .separator {
          color: #4ade80;
          margin: 0 16px;
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default ReviewTicker;
