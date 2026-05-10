"use client";
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

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

export default function AdminPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'web',
        badge: '',
        sub_title: '',
        description: '',
        tags: '',
        impact_value_1: '',
        impact_label_1: '',
        impact_value_2: '',
        impact_label_2: '',
        thumb_icon: 'fas fa-code',
        thumb_color: 'teal',
        detail_link: '#'
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingProject ? 'PUT' : 'POST';
        const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
        
        const dataToSend = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim())
        };

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });

        if (res.ok) {
            setIsModalOpen(false);
            setEditingProject(null);
            setFormData({
                title: '', category: 'web', badge: '', sub_title: '', description: '',
                tags: '', impact_value_1: '', impact_label_1: '', impact_value_2: '',
                impact_label_2: '', thumb_icon: 'fas fa-code', thumb_color: 'teal', detail_link: '#'
            });
            fetchProjects();
        }
    };

    const handleEdit = (pj: Project) => {
        setEditingProject(pj);
        let tagsStr = '';
        try {
            const tagsArr = typeof pj.tags === 'string' ? JSON.parse(pj.tags) : pj.tags;
            tagsStr = tagsArr.join(', ');
        } catch (e) { tagsStr = ''; }

        setFormData({
            title: pj.title,
            category: pj.category,
            badge: pj.badge,
            sub_title: pj.sub_title,
            description: pj.description,
            tags: tagsStr,
            impact_value_1: pj.impact_value_1,
            impact_label_1: pj.impact_label_1,
            impact_value_2: pj.impact_value_2,
            impact_label_2: pj.impact_label_2,
            thumb_icon: pj.thumb_icon,
            thumb_color: pj.thumb_color,
            detail_link: pj.detail_link
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Yakin ingin menghapus proyek ini?')) {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            if (res.ok) fetchProjects();
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingTop: '100px' }}>
            <Navbar />
            <div className="container" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontFamily: 'var(--display)', fontSize: '2.5rem' }}>Admin <em>Panel</em></h1>
                    <button className="btn btn-primary" onClick={() => { setEditingProject(null); setIsModalOpen(true); }}>
                        <i className="fas fa-plus"></i> Tambah Proyek
                    </button>
                </div>

                <div style={{ background: 'var(--bg-e)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text)' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-s)', borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Judul</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Kategori</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(pj => (
                                <tr key={pj.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem' }}>{pj.title}</td>
                                    <td style={{ padding: '1rem' }}><span className="kicker" style={{ fontSize: '0.6rem' }}>{pj.category}</span></td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button onClick={() => handleEdit(pj)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginRight: '1rem' }}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(pj.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal - Simplified styling here, ideally use a component */}
            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: 'var(--bg-e)', padding: '2rem', borderRadius: 'var(--r-lg)', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>{editingProject ? 'Edit Proyek' : 'Tambah Proyek'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--muted)' }}>Judul</label>
                                    <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-s)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: '#fff' }} required />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--muted)' }}>Kategori</label>
                                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-s)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: '#fff' }}>
                                        <option value="web">Web</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="ai">AI</option>
                                        <option value="saas">SaaS</option>
                                    </select>
                                </div>
                            </div>
                            {/* ... more fields similarly ... */}
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--muted)' }}>Deskripsi</label>
                                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-s)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: '#fff', height: '100px' }}></textarea>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Simpan Proyek</button>
                                <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
