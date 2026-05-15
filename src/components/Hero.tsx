"use client";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
    const [text, setText] = useState("");
    const words = ['Scalable.', 'Cepat.', 'Aman.', 'Modern.'];
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    // Typewriter logic
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentWord = words[wordIndex];
            if (!isDeleting) {
                setText(currentWord.substring(0, charIndex + 1));
                setCharIndex(prev => prev + 1);
                if (charIndex + 1 === currentWord.length) {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                setText(currentWord.substring(0, charIndex - 1));
                setCharIndex(prev => prev - 1);
                if (charIndex - 1 === 0) {
                    setIsDeleting(false);
                    setWordIndex((wordIndex + 1) % words.length);
                }
            }
        }, isDeleting ? 60 : 100);
        
        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, wordIndex]);

    // Counter logic
    const statsRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const counters = statsRef.current?.querySelectorAll('.stat-num');
        if (!counters) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const target = parseInt(e.target.getAttribute('data-target') || '0');
                    let count = 0;
                    const step = Math.ceil(target / 40);
                    const interval = setInterval(() => {
                        count = Math.min(count + step, target);
                        e.target.textContent = count.toString();
                        if (count >= target) clearInterval(interval);
                    }, 40);
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="top" className="hero">
            <div className="hero-bg-mesh"></div>
            <div className="container">
                <div className="hero-layout">
                    <div className="hero-text">
                        <div className="hero-badge reveal">
                            <span className="badge-dot"></span>
                            Available for projects
                        </div>
                        <h1 className="hero-title reveal" style={{"--d": "100ms"} as any}>
                            Saya Bangun Website<br />
                            <span className="hero-title-em">Bisnis Yang</span><br />
                            <span className="typewriter-wrap">
                                <span id="typewriter" className="typewriter-text">{text}</span>
                            </span>
                        </h1>
                        <p className="hero-desc reveal" style={{"--d": "200ms"} as any}>
                            Full-stack Developer spesialis <strong>Laravel & REST API di Surabaya</strong> — membangun website bisnis yang scalable, aman, dan berorientasi ROI.
                        </p>
                        <div className="hero-cta reveal" style={{"--d": "300ms"} as any}>
                            <a href="https://wa.me/6285173329189" target="_blank" className="btn btn-primary" rel="nofollow">
                                <i className="fab fa-whatsapp"></i> Konsultasi Gratis Web Dev
                            </a>
                            <a href="#projects" className="btn btn-ghost">
                                Portofolio Proyek Laravel <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                        <div className="hero-stats reveal" style={{"--d": "400ms"} as any} ref={statsRef}>
                            <div className="stat">
                                <span className="stat-num" data-target="4">4</span><span className="stat-plus">+</span>
                                <p>Tahun Pengalaman</p>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat">
                                <span className="stat-num" data-target="15">15</span><span className="stat-plus">+</span>
                                <p>Proyek Berhasil</p>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat">
                                <span className="stat-num" data-target="100">100</span><span className="stat-plus">%</span>
                                <p>Client Satisfied</p>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visual reveal" style={{"--d": "500ms"} as any}>
                        <div className="hero-photo-wrap">
                            <div className="hero-photo-ring"></div>
                            <img 
                                src="/images/profile2.png" 
                                alt="Ahmad Maulana Ismaindra — Full-stack Laravel Developer Surabaya" 
                                className="hero-photo"
                                width="380"
                                height="460"
                                loading="eager"
                                fetchPriority="high"
                            />
                            <div className="hero-photo-tag">
                                <i className="fas fa-code"></i>
                                <span>Laravel Expert</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero-scroll-hint reveal" style={{"--d": "800ms"} as any}>
                <span>Scroll untuk melihat</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    );
}
