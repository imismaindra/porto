"use client";
import { useEffect } from 'react';

export default function ScrollReveal() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Once visible, stop observing
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Function to observe elements
        const observeElements = () => {
            const elements = document.querySelectorAll('.reveal');
            elements.forEach(el => observer.observe(el));
        };

        // Initial observation
        observeElements();

        // Re-observe if DOM changes (important for dynamic content like projects)
        const mutationObserver = new MutationObserver(() => {
            observeElements();
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    return null; // This component doesn't render anything
}
