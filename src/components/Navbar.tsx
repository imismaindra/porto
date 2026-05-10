"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="container">
                <div className="nav-wrapper">
                    <a href="#top" className="logo" onClick={closeMenu}>
                        Ismaindra<span>.</span>
                    </a>
                    <ul id="nav-menu" className={`nav-menu ${isOpen ? 'open' : ''}`}>
                        <li><a href="#top" className="nav-link" onClick={closeMenu}>Beranda</a></li>
                        <li><a href="#services" className="nav-link" onClick={closeMenu}>Layanan</a></li>
                        <li><a href="#projects" className="nav-link" onClick={closeMenu}>Proyek</a></li>
                        <li><a href="#why-me" className="nav-link" onClick={closeMenu}>Keunggulan</a></li>
                        <li><a href="#contact" className="nav-link" onClick={closeMenu}>Kontak</a></li>
                    </ul>
                    <button 
                        className={`hamburger ${isOpen ? 'open' : ''}`} 
                        id="hamburger" 
                        aria-label="Menu"
                        onClick={toggleMenu}
                    >
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
