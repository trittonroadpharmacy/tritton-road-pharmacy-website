import React, { useState, useEffect } from 'react';
import { Star, CheckCircle } from 'lucide-react';

const API_URL = 'https://pharmadpro-backend.onrender.com/api';

// Tunable timing (ms)
const DISPLAY_MS = 5500;   // how long each review stays on-screen
const TRANSITION_MS = 600; // fade-in / fade-out duration

// Google logo inline SVG (small)
const GoogleLogoSmall = () => (
  <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const ReviewTicker = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('enter'); // 'enter' | 'show' | 'exit'

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

  // Auto-rotate through reviews
  useEffect(() => {
    if (reviews.length === 0) return;
    if (reviews.length === 1) { setPhase('show'); return; }

    setPhase('enter');
    const enterTimer = setTimeout(() => setPhase('show'), TRANSITION_MS);
    const showTimer = setTimeout(() => setPhase('exit'), DISPLAY_MS - TRANSITION_MS);
    const nextTimer = setTimeout(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, DISPLAY_MS);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(showTimer);
      clearTimeout(nextTimer);
    };
  }, [index, reviews]);

  if (loading || reviews.length === 0) return null;

  const review = reviews[index];
  const fullText = review.text || '';
  // Reasonable snippet length so it's readable in the strip
  const snippet = fullText.length > 140 ? fullText.substring(0, 137).trim() + '…' : fullText;

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stateStyles = reduceMotion
    ? { opacity: 1, transform: 'none', filter: 'none' }
    : phase === 'enter'
    ? { opacity: 0, transform: 'translateY(14px) scale(0.985)', filter: 'blur(6px)' }
    : phase === 'exit'
    ? { opacity: 0, transform: 'translateY(-14px) scale(1.015)', filter: 'blur(6px)' }
    : { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' };

  return (
    <div
      data-testid="review-ticker"
      style={{
        background: 'linear-gradient(90deg, #1e5631 0%, #2d7a47 50%, #1e5631 100%)',
        padding: '14px 0',
        overflow: 'hidden',
        position: 'relative',
        minHeight: '56px',
      }}
    >
      {/* Subtle shimmer behind the green */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(900px circle at 25% 50%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(900px circle at 75% 50%, rgba(255,255,255,0.06), transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Verified badge - fixed left */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          backgroundColor: '#1e5631',
          zIndex: 2,
          borderRight: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#1a1a1a',
          }}
        >
          <GoogleLogoSmall />
          <span>Verified Reviews</span>
          <CheckCircle size={12} color="#34A853" fill="#34A853" />
        </div>
      </div>

      {/* Rotating review */}
      <div
        style={{
          paddingLeft: '180px',
          paddingRight: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          key={index}
          data-testid="review-current"
          aria-live="polite"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease, filter ${TRANSITION_MS}ms ease`,
            willChange: 'opacity, transform, filter',
            ...stateStyles,
          }}
        >
          {/* Golden stars */}
          <div style={{ display: 'flex', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={16}
                fill="#FBBC05"
                color="#FBBC05"
                style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))' }}
              />
            ))}
          </div>

          {/* Review text */}
          <span
            style={{
              color: 'white',
              fontSize: '15px',
              fontWeight: 500,
              maxWidth: '720px',
              textAlign: 'center',
              lineHeight: 1.35,
            }}
          >
            “{snippet}”
          </span>

          {/* Author */}
          <span
            style={{
              color: '#bbf7d0',
              fontSize: '14px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            — {review.author_name}
          </span>
        </div>
      </div>

      {/* Bottom progress bar — depletes during display, restarts each cycle */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 180,
          right: 0,
          bottom: 0,
          height: '2px',
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <div
          key={`progress-${index}`}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #FBBC05, #ffd54a)',
            width: '100%',
            transformOrigin: 'left center',
            animation: reduceMotion ? 'none' : `reviewProgress ${DISPLAY_MS}ms linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes reviewProgress {
          0%   { transform: scaleX(0); opacity: 0.95; }
          100% { transform: scaleX(1); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default ReviewTicker;
