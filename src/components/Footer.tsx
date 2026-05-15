export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <span className="logo">Ismaindra<span>.</span></span>
                        <p>Membangun sistem digital yang skalabel dan berorientasi pada hasil.</p>
                        <div className="social-row">
                            <a href="https://www.linkedin.com/in/ismaindra" target="_blank" className="social-btn" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://github.com/imismaindra" target="_blank" className="social-btn" aria-label="GitHub"><i className="fab fa-github"></i></a>
                            <a href="mailto:imismaindra@gmail.com" className="social-btn" aria-label="Email"><i className="fas fa-envelope"></i></a>
                        </div>
                    </div>
                    <div className="footer-nav">
                        <h4>Navigasi</h4>
                        <ul>
                            <li><a href="#top">Beranda Portfolio</a></li>
                            <li><a href="#services">Layanan Web Development</a></li>
                            <li><a href="#projects">Portofolio Proyek Laravel</a></li>
                            <li><a href="#contact">Kontak Web Developer</a></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h4>Kontak</h4>
                        <address style={{ fontStyle: 'normal', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.8' }}>
                            <strong>Ahmad Maulana Ismaindra</strong><br />
                            Full-stack Web Developer<br />
                            <span>Surabaya, Jawa Timur, Indonesia</span><br />
                            <a href="tel:+6285173329189" style={{ color: 'var(--primary)' }}>+62 851-7332-9189</a><br />
                            <a href="mailto:imismaindra@gmail.com" style={{ color: 'var(--primary)' }}>imismaindra@gmail.com</a>
                        </address>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Ahmad Maulana Ismaindra. Dibuat dengan fokus pada performa.</p>
                </div>
            </div>
        </footer>
    );
}
