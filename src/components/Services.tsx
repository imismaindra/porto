"use client";
import { useEffect, useState } from "react";

interface Service {
    id: number;
    title: string;
    icon: string;
    description: string;
}

export default function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
            });
    }, []);

    if (loading) return null;

    return (
        <section id="services" className="services">
            <div className="container">
                <div className="section-label reveal">
                    <span className="kicker">Layanan Utama</span>
                </div>
                <h2 className="section-title reveal">Solusi Digital yang<br /><em>Memberikan Hasil</em></h2>
                <div className="bento-grid">
                    {services.map((service, i) => (
                        <div 
                            key={service.id} 
                            className={`bento-card ${i === 0 ? 'bento-wide' : ''} reveal`}
                            style={{"--d": `${i * 100}ms`} as any}
                        >
                            <div className="bento-icon"><i className={service.icon}></i></div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="bento-arrow"><i className="fas fa-arrow-up-right"></i></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
