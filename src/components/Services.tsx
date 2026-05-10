export default function Services() {
    return (
        <section id="services" className="services">
            <div className="container">
                <div className="section-label reveal">
                    <span className="kicker">Layanan Utama</span>
                </div>
                <h2 className="section-title reveal">Solusi Digital yang<br /><em>Memberikan Hasil</em></h2>
                <div className="bento-grid">
                    <div className="bento-card bento-wide reveal">
                        <div className="bento-icon"><i className="fas fa-laptop-code"></i></div>
                        <h3>Web App Development</h3>
                        <p>Aplikasi web kustom yang responsif, cepat, dan mudah dioperasikan — dibangun untuk scale.</p>
                        <div className="bento-arrow"><i className="fas fa-arrow-up-right"></i></div>
                    </div>
                    <div className="bento-card reveal" style={{"--d": "100ms"} as any}>
                        <div className="bento-icon"><i className="fas fa-server"></i></div>
                        <h3>Backend & API</h3>
                        <p>Arsitektur API yang kokoh untuk integrasi antar platform yang mulus.</p>
                        <div className="bento-arrow"><i className="fas fa-arrow-up-right"></i></div>
                    </div>
                    <div className="bento-card reveal" style={{"--d": "200ms"} as any}>
                        <div className="bento-icon"><i className="fas fa-database"></i></div>
                        <h3>System Optimization</h3>
                        <p>Optimasi query dan skema database untuk kecepatan dan efisiensi maksimal.</p>
                        <div className="bento-arrow"><i className="fas fa-arrow-up-right"></i></div>
                    </div>
                    <div className="bento-card bento-accent reveal" style={{"--d": "300ms"} as any}>
                        <div className="bento-icon"><i className="fas fa-tools"></i></div>
                        <h3>Maintenance & Support</h3>
                        <p>Monitoring dan pembaruan rutin untuk memastikan sistem tetap aman dan up-to-date.</p>
                        <div className="bento-arrow"><i className="fas fa-arrow-up-right"></i></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
