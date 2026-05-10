"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
    return (
        <section id="testimonials" className="testimonials">
            <div className="container">
                <div className="section-label reveal">
                    <span className="kicker">Testimoni</span>
                </div>
                <h2 className="section-title reveal">Apa Kata <em>Mereka</em></h2>
                
                <Swiper
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1}
                    spaceBetween={24}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: { slidesPerView: 2 }
                    }}
                    className="testimonialSwiper"
                >
                    <SwiperSlide>
                        <div className="testi-card">
                            <div className="testi-stars">★★★★★</div>
                            <p className="testi-text">"Ahmad adalah developer yang sangat profesional. Dia memahami kebutuhan proyek kami dengan cepat dan memberikan hasil yang melampaui ekspektasi."</p>
                            <div className="testi-author">
                                <img src="https://i.pravatar.cc/80?img=1" alt="Budi Santoso" />
                                <div>
                                    <h5>Budi Santoso</h5>
                                    <span>Product Manager, PT Universal Big Data</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testi-card">
                            <div className="testi-stars">★★★★★</div>
                            <p className="testi-text">"Sangat terkesan dengan ketajaman teknisnya. Ahmad tidak hanya menulis kode, tapi memberikan saran bisnis yang berharga untuk produk kami."</p>
                            <div className="testi-author">
                                <img src="https://i.pravatar.cc/80?img=3" alt="Reza Pratama" />
                                <div>
                                    <h5>Reza Pratama</h5>
                                    <span>Founder, StartUp Tech</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
}
