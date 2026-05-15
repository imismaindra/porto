import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProjectList from "@/components/ProjectList";
import WhyMe from "@/components/WhyMe";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ProjectList />
        <WhyMe />
        <Testimonials />
        
        {/* FINAL CTA / CONTACT */}
        <section id="contact" className="final-cta">
          <div className="cta-bg-mesh"></div>
          <div className="container">
            <div className="contact-grid">
              <div className="cta-content reveal">
                <span className="kicker">Let's build something</span>
                <h2 className="reveal" style={{"--d": "100ms"} as any}>Konsultasi Gratis dengan<br/><em>Web Developer Surabaya</em></h2>
                <p className="reveal" style={{"--d": "150ms"} as any}>Respon maksimal 24 jam. Mari bangun solusi digital yang tepat untuk bisnis Anda.</p>
                <div className="contact-info-list reveal" style={{"--d": "200ms"} as any}>
                  <a href="https://wa.me/6285173329189" className="info-item" rel="nofollow" target="_blank">
                    <i className="fab fa-whatsapp"></i>
                    <div>
                      <span>WhatsApp (Konsultasi Gratis)</span>
                      <p>+62 851-7332-9189</p>
                    </div>
                  </a>
                  <div className="info-item">
                    <i className="fas fa-envelope"></i>
                    <div>
                      <span>Email</span>
                      <p>imismaindra@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="reveal" style={{ transitionDelay: '0.2s' }}>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

    </>
  );
}
