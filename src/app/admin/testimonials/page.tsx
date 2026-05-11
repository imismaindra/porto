"use client";
import { useState, useEffect } from 'react';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    X, 
    User, 
    Quote, 
    CheckCircle2,
    AlertCircle,
    Info,
    Loader2,
    Image as ImageIcon,
    Search,
    Upload
} from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    comment: string;
    image: string;
}

export default function TestimonialsAdmin() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<Testimonial | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [formData, setFormData] = useState({ name: '', role: '', comment: '', image: '' });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => { 
        fetchTestimonials(); 
    }, []);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => setStatus(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/testimonials');
            const data = await res.json();
            setTestimonials(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch testimonials:', error);
            setStatus({ type: 'error', message: 'Failed to connect to server.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        setIsUploading(true);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData,
            });

            if (res.ok) {
                const data = await res.json();
                setFormData(prev => ({ ...prev, image: data.url }));
                setStatus({ type: 'success', message: 'Image uploaded successfully!' });
            } else {
                setStatus({ type: 'error', message: 'Upload failed.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'An error occurred during upload.' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/testimonials/${editing.id}` : '/api/testimonials';
        
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus({ type: 'success', message: `Testimonial ${editing ? 'updated' : 'added'} successfully!` });
                setIsModalOpen(false);
                setEditing(null);
                setFormData({ name: '', role: '', comment: '', image: '' });
                fetchTestimonials();
            } else {
                const errData = await res.json();
                setStatus({ type: 'error', message: errData.error || 'Failed to save testimonial.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            try {
                const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    setStatus({ type: 'success', message: 'Testimonial deleted successfully.' });
                    fetchTestimonials();
                } else {
                    setStatus({ type: 'error', message: 'Failed to delete testimonial.' });
                }
            } catch (error) {
                setStatus({ type: 'error', message: 'An error occurred.' });
            }
        }
    };

    const handleEdit = (t: Testimonial) => {
        setEditing(t);
        setFormData({ name: t.name || '', role: t.role || '', comment: t.comment || '', image: t.image || '' });
        setIsModalOpen(true);
    };

    const filteredTestimonials = testimonials.filter(t => 
        (t.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.role || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.comment || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-container animate-fade-in">
            {/* Status Notification */}
            {status && (
                <div className={`status-toast ${status.type}`}>
                    {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span>{status.message}</span>
                </div>
            )}

            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Client <span className="text-gradient">Testimonials</span></h1>
                    <p className="admin-subtitle">Manage the feedback and social proof displayed on your site.</p>
                </div>
                <button className="btn btn-primary btn-lg" onClick={() => { setEditing(null); setFormData({ name: '', role: '', comment: '', image: '' }); setIsModalOpen(true); }}>
                    <Plus size={20} />
                    Add Testimonial
                </button>
            </div>

            {/* Filter Bar */}
            <div className="filter-bar glass">
                <div className="search-box">
                    <Search size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by name, role, or comment..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filter-info">
                    <span>{filteredTestimonials.length} Testimonials</span>
                </div>
            </div>

            <div className="testimonials-grid">
                {isLoading ? (
                    <div className="loading-state glass">
                        <Loader2 className="animate-spin" size={40} />
                        <p>Loading testimonials...</p>
                    </div>
                ) : filteredTestimonials.length === 0 ? (
                    <div className="empty-state glass">
                        <Quote size={48} className="muted-icon" style={{ opacity: 0.2 }} />
                        <p>{searchQuery ? 'No testimonials match your criteria.' : 'No testimonials found. Share your success stories!'}</p>
                    </div>
                ) : (
                    filteredTestimonials.map((t) => (
                        <div key={t.id} className="testimonial-card glass">
                            <div className="testimonial-card-header">
                                <div className="testimonial-avatar">
                                    {t.image ? (
                                        <img src={t.image} alt={t.name} />
                                    ) : (
                                        <div className="avatar-placeholder">
                                            <User size={24} />
                                        </div>
                                    )}
                                </div>
                                <div className="testimonial-info">
                                    <h3>{t.name}</h3>
                                    <p>{t.role}</p>
                                </div>
                                <div className="testimonial-actions">
                                    <button onClick={() => handleEdit(t)} title="Edit">
                                        <Pencil size={14} />
                                    </button>
                                    <button className="delete" onClick={() => handleDelete(t.id)} title="Delete">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="testimonial-content">
                                <Quote className="quote-icon" size={20} />
                                <p>{t.comment}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
                    <div className="admin-card modal-content animate-slide-up">
                        <div className="modal-header">
                            <div>
                                <h2 className="modal-title">
                                    {editing ? 'Refine Testimonial' : 'Capture Feedback'}
                                </h2>
                                <p className="modal-subtitle">
                                    {editing ? 'Update client details and their shared experience.' : 'Add a new client testimonial to your portfolio.'}
                                </p>
                            </div>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-body" style={{ padding: '2rem' }}>
                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Client Name</label>
                                    <input 
                                        className="form-input"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Client Role</label>
                                    <input 
                                        className="form-input"
                                        placeholder="e.g. CEO at TechCorp"
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Client Image</label>
                                <div className="upload-container" style={{ 
                                    display: 'flex', 
                                    gap: '1rem', 
                                    alignItems: 'center',
                                    background: 'rgba(255,255,255,0.02)',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-primary)'
                                }}>
                                    <div className="avatar-preview-box" style={{ 
                                        width: '64px', 
                                        height: '64px', 
                                        borderRadius: '12px', 
                                        overflow: 'hidden',
                                        background: 'rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        border: '1px solid var(--border-primary)'
                                    }}>
                                        {formData.image ? (
                                            <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <ImageIcon size={24} style={{ opacity: 0.3 }} />
                                        )}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <label className="btn btn-outline" style={{ flex: 1, padding: '0.5rem', cursor: 'pointer' }}>
                                                <Upload size={16} />
                                                <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                                                <input type="file" className="hidden" style={{ display: 'none' }} accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                                            </label>
                                            {formData.image && (
                                                <button type="button" className="btn btn-danger" style={{ padding: '0.5rem' }} onClick={() => setFormData({...formData, image: ''})}>
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                        <input 
                                            className="form-input"
                                            placeholder="Or paste image URL here..."
                                            value={formData.image}
                                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                                            style={{ fontSize: '0.8rem' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Testimonial Content</label>
                                <textarea 
                                    className="form-textarea"
                                    placeholder="Write the client's feedback here..."
                                    rows={5}
                                    value={formData.comment}
                                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                                    required
                                ></textarea>
                            </div>

                            <div className="modal-footer" style={{ padding: '1.5rem 0 0 0', borderTop: '1px solid var(--border-primary)', marginTop: '2rem' }}>
                                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
                                    Discard
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={isSaving || isUploading}>
                                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : (editing ? 'Save Changes' : 'Publish Testimonial')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                .text-gradient {
                    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .filter-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    margin-bottom: 2rem;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--border-primary);
                }

                .search-box {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex: 1;
                    max-width: 500px;
                    color: var(--text-muted);
                }

                .search-box input {
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 0.9rem;
                    width: 100%;
                    outline: none;
                }

                .filter-info {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }

                .testimonials-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
                    gap: 1.5rem;
                }

                .testimonial-card {
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 1.25rem;
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .testimonial-card:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.15);
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.5);
                }

                .testimonial-card-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .testimonial-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 1rem;
                    overflow: hidden;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    flex-shrink: 0;
                }

                .testimonial-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .avatar-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255, 255, 255, 0.3);
                }

                .testimonial-info {
                    flex: 1;
                }

                .testimonial-info h3 {
                    font-size: 1rem;
                    font-weight: 600;
                    margin: 0;
                    color: #fff;
                }

                .testimonial-info p {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.5);
                    margin: 0;
                }

                .testimonial-actions {
                    display: flex;
                    gap: 0.5rem;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }

                .testimonial-card:hover .testimonial-actions {
                    opacity: 1;
                }

                .testimonial-actions button {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.6);
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .testimonial-actions button:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                    border-color: rgba(255, 255, 255, 0.2);
                }

                .testimonial-actions button.delete:hover {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border-color: rgba(239, 68, 68, 0.2);
                }

                .testimonial-content {
                    position: relative;
                    padding-left: 0.5rem;
                }

                .quote-icon {
                    color: var(--accent-primary);
                    opacity: 0.4;
                    margin-bottom: 0.5rem;
                }

                .testimonial-content p {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: rgba(255, 255, 255, 0.8);
                    margin: 0;
                    font-style: italic;
                }

                @media (max-width: 768px) {
                    .testimonials-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
