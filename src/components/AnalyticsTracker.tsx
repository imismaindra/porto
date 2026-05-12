"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Simple session ID stored in sessionStorage
        let sessionId = sessionStorage.getItem('visitor_session_id');
        if (!sessionId) {
            sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            sessionStorage.setItem('visitor_session_id', sessionId);
        }

        const trackVisit = async () => {
            try {
                await fetch('/api/analytics/track', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        page_path: pathname,
                        session_id: sessionId,
                        referer: document.referrer,
                    }),
                });
            } catch (error) {
                // Silently fail as analytics shouldn't break the UX
                console.error('Analytics error:', error);
            }
        };

        // Track after a small delay to ensure page is loaded
        const timer = setTimeout(trackVisit, 1000);
        return () => clearTimeout(timer);
    }, [pathname]);

    return null; // This component doesn't render anything
}
