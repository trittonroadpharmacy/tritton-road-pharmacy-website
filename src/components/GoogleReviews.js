import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://www.pharmadpro.co.uk/api';

// Google logo SVG
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" className="inline-block">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// Star rating display
const StarRating = ({ rating = 5 }) => (
  <div className="flex gap-0.5">
    {[...Array(rating)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

// Individual review card
const ReviewCard = ({ review, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <div 
      className={`bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-green-100 mb-3" />
      
      {/* Review text */}
      <p className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">
        "{review.review_text}"
      </p>
      
      {/* Service mentioned badge */}
      {review.service_mentioned && (
        <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full mb-3">
          {review.service_mentioned}
        </span>
      )}
      
      {/* Reviewer info */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <p className="font-semibold text-gray-900">{review.reviewer_name}</p>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={5} />
            <span className="text-gray-400 text-sm">{review.review_date}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <GoogleLogo />
          <span>Google</span>
        </div>
      </div>
    </div>
  );
};

// Main Reviews Section Component
const GoogleReviews = ({ config }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/pharmacy-admin/reviews/public`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Unable to load reviews');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);
  
  // Don't render if no reviews
  if (!loading && reviews.length === 0) {
    return null;
  }
  
  return (
    <section id="reviews" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            5-Star Reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're proud to serve our community. Here's what patients have to say about their experience at {config?.name || 'Tritton Road Pharmacy'}.
          </p>
        </div>
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="text-center py-8 text-gray-500">
            {error}
          </div>
        )}
        
        {/* Reviews Grid */}
        {!loading && reviews.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <ReviewCard 
                  key={review.review_id || index} 
                  review={review} 
                  index={index}
                />
              ))}
            </div>
            
            {/* Google Review CTA */}
            <div className="mt-12 text-center">
              <a 
                href="https://www.google.com/search?q=Tritton+Road+Pharmacy+Lincoln+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-green-600 text-gray-700 hover:text-green-700 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <GoogleLogo />
                See all reviews on Google
              </a>
            </div>
          </>
        )}
        
        {/* Schema.org Review markup for SEO */}
        {!loading && reviews.length > 0 && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": config?.name || "Tritton Road Pharmacy",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": reviews.length.toString(),
                "bestRating": "5",
                "worstRating": "5"
              },
              "review": reviews.map(r => ({
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": r.reviewer_name
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": r.review_text
              }))
            })
          }} />
        )}
      </div>
    </section>
  );
};

export default GoogleReviews;
