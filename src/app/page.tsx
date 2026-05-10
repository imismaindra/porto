import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProjectList from "@/components/ProjectList";
import WhyMe from "@/components/WhyMe";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

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
        
        {/* FINAL CTA */}
        <section id="contact" className="final-cta">
          <div className="cta-bg-mesh"></div>
          <div className="container">
            <div className="cta-content reveal">
              <span className="kicker">Let's build something</span>
              <h2>Siap Diskusi<br/><em>Proyek Anda?</em></h2>
              <p>Respon maksimal 24 jam. Mari bangun solusi digital yang tepat untuk bisnis Anda.</p>
              <a href="https://wa.me/6285173329189" target="_blank" className="btn btn-primary btn-lg">
                <i className="fab fa-whatsapp"></i> Hubungi Saya Sekarang
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
