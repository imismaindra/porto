export default function WhyMe() {
    return (
        <section id="why-me" className="why-me">
            <div className="container">
                <div className="section-label reveal">
                    <span className="kicker">Mengapa Saya?</span>
                </div>
                <h2 className="section-title light reveal">Mengapa Pilih <em>Web Developer Laravel</em> Surabaya Ini?</h2>
                <div className="why-grid">
                    <div className="why-card reveal">
                        <div className="why-icon"><i className="fas fa-code"></i></div>
                        <h4>Struktur Kode Scalable</h4>
                        <p>Kode yang mudah dibaca dan siap dikembangkan seiring pertumbuhan bisnis tanpa perlu rombak total.</p>
                    </div>
                    <div className="why-card reveal" style={{"--d": "100ms"} as any}>
                        <div className="why-icon"><i className="fas fa-comments"></i></div>
                        <h4>Komunikasi Proaktif</h4>
                        <p>Update berkala dengan bahasa yang mudah dipahami, tanpa jargon teknis yang membingungkan.</p>
                    </div>
                    <div className="why-card reveal" style={{"--d": "200ms"} as any}>
                        <div className="why-icon"><i className="fas fa-chart-line"></i></div>
                        <h4>Fokus ke ROI</h4>
                        <p>Setiap baris kode bertujuan meningkatkan efisiensi atau profit bisnis Anda secara nyata.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
