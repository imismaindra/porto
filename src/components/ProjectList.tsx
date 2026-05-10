"use client";
import { useState, useEffect } from 'react';

interface Project {
    id: number;
    title: string;
    category: string;
    badge: string;
    sub_title: string;
    description: string;
    tags: string[] | string;
    impact_value_1: string;
    impact_label_1: string;
    impact_value_2: string;
    impact_label_2: string;
    thumb_icon: string;
    thumb_color: string;
    detail_link: string;
}

export default function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            });
    }, []);

    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);

    if (loading) return <p style={{textAlign: 'center', color: 'var(--muted)'}}>Memuat proyek...</p>;

    return (
        <section className="projects" id="projects">
            <div className="container">
                <div className="pj-header">
                    <div>
                        <div className="section-label">
                            <span className="kicker">Portfolio</span>
                        </div>
                        <h2 className="section-title">Hasil <em>Karya.</em></h2>
                    </div>
                    <div className="pj-filters">
                        {['all', 'web', 'mobile', 'ai', 'saas'].map(cat => (
                            <button 
                                key={cat}
                                className={`pj-filter ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pj-grid">
                    {filteredProjects.map((pj, i) => {
                        let tags: string[] = [];
                        try {
                            tags = typeof pj.tags === 'string' ? JSON.parse(pj.tags) : pj.tags;
                        } catch (e) { tags = []; }

                        return (
                            <div className="pj-card reveal visible" key={pj.id} style={{'--d': `${i * 100}ms`} as any}>
                                <div className={`pj-thumb pj-thumb--${pj.thumb_color || 'teal'}`}>
                                    <i className={pj.thumb_icon || 'fas fa-code'}></i>
                                    <span className="pj-badge">{pj.badge}</span>
                                </div>
                                <div className="pj-body">
                                    <h3>{pj.title}</h3>
                                    <p className="pj-sub">{pj.sub_title}</p>
                                    <div className="pj-tags">
                                        {tags && tags.map((t, idx) => <span className="tag" key={idx}>{t}</span>)}
                                    </div>
                                </div>
                                <div className="pj-hover">
                                    <p>{pj.description}</p>
                                    <div className="pj-impact-row">
                                        <div className="pj-impact-item"><strong>{pj.impact_value_1}</strong><span>{pj.impact_label_1}</span></div>
                                        <div className="pj-impact-item"><strong>{pj.impact_value_2}</strong><span>{pj.impact_label_2}</span></div>
                                    </div>
                                    <a href={pj.detail_link} className="pj-detail-link">Lihat Detail <i className="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
