"use client";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    comment: string;
    image: string;
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/testimonials')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTestimonials(data);
                } else {
                    console.error('Expected array from /api/testimonials, got:', data);
                    setTestimonials([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch testimonials:', err);
                setTestimonials([]);
                setLoading(false);
            });
    }, []);

    if (loading || testimonials.length === 0) return null;

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
                    loop={testimonials.length > 1}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: { slidesPerView: 2 }
                    }}
                    className="testimonialSwiper"
                >
                    {testimonials.map((t) => (
                        <SwiperSlide key={t.id}>
                            <div className="testi-card">
                                <div className="testi-stars">★★★★★</div>
                                <p className="testi-text">"{t.comment}"</p>
                                <div className="testi-author">
                                    <img src={t.image || `https://i.pravatar.cc/80?u=${t.id}`} alt={t.name} />
                                    <div>
                                        <h5>{t.name}</h5>
                                        <span>{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
