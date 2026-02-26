// Analytics tracking hook for Tritton Road Pharmacy website
import { useEffect, useRef, useCallback } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'https://www.pharmadpro.co.uk/api';

export function useAnalytics() {
  const sessionIdRef = useRef(localStorage.getItem('trp_session_id') || null);
  const hasTrackedPageView = useRef(false);

  useEffect(() => {
    // Track page view on mount
    const trackPageView = async () => {
      if (hasTrackedPageView.current) return;
      hasTrackedPageView.current = true;
      
      try {
        const response = await fetch(`${API_URL}/website-analytics/track/pageview`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page_url: window.location.href,
            page_title: document.title,
            referrer: document.referrer,
            session_id: sessionIdRef.current,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.session_id && !sessionIdRef.current) {
            sessionIdRef.current = data.session_id;
            localStorage.setItem('trp_session_id', data.session_id);
          }
        }
      } catch (error) {
        // Silent fail - analytics should not break the site
        console.debug('Analytics tracking error:', error);
      }
    };

    trackPageView();
  }, []);

  // Function to track custom events
  const trackEvent = useCallback(async (eventType, eventData = {}) => {
    try {
      await fetch(`${API_URL}/website-analytics/track/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: eventType,
          page_url: window.location.href,
          session_id: sessionIdRef.current,
          event_data: eventData,
        }),
      });
    } catch (error) {
      console.debug('Event tracking error:', error);
    }
  }, []);

  return { trackEvent, sessionId: sessionIdRef.current };
}

// Analytics wrapper component that tracks page views automatically
export function AnalyticsTracker({ children }) {
  useAnalytics();
  return children;
}

export default useAnalytics;
