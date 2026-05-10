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
                            <li><a href="#top">Beranda</a></li>
                            <li><a href="#services">Layanan</a></li>
                            <li><a href="#projects">Proyek</a></li>
                            <li><a href="#contact">Kontak</a></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h4>Kontak</h4>
                        <ul>
                            <li>imismaindra@gmail.com</li>
                            <li>+62 851-7332-9189</li>
                            <li>Surabaya, Indonesia</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Ahmad Maulana Ismaindra. Dibuat dengan fokus pada performa.</p>
                </div>
            </div>
        </footer>
    );
}
