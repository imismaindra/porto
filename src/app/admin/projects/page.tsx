"use client";
import { useState, useEffect } from 'react';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    X, 
    Info, 
    LayoutGrid, 
    CheckCircle2, 
    Link as LinkIcon, 
    Code2, 
    Layers, 
    Award,
    Search,
    Loader2,
    Eye,
    ExternalLink,
    Upload,
    Image as ImageIcon,
    Zap,
    Globe
} from 'lucide-react';

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
    image: string;
    detail_link: string;
}

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<Project | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        category: 'web',
        badge: 'NEW',
        sub_title: '',
        description: '',
        tags: '',
        impact_value_1: '',
        impact_label_1: '',
        impact_value_2: '',
        impact_label_2: '',
        thumb_icon: 'fas fa-code',
        thumb_color: '#6366F1',
        image: '',
        detail_link: '#'
    });

    useEffect(() => { 
        fetchProjects(); 
    }, []);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => setStatus(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/projects');
            if (res.ok) {
                const data = await res.json();
                setProjects(Array.isArray(data) ? data : []);
            } else {
                setStatus({ type: 'error', message: 'Failed to fetch projects.' });
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setStatus({ type: 'error', message: 'Connection error while fetching projects.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/projects/${editing.id}` : '/api/projects';
        
        const processedData = {
            ...formData,
            tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t !== '') : []
        };

        setIsSaving(true);
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(processedData)
            });

            if (res.ok) {
                setStatus({ type: 'success', message: `Project ${editing ? 'updated' : 'created'} successfully!` });
                setIsModalOpen(false);
                setEditing(null);
                resetForm();
                fetchProjects();
            } else {
                const errData = await res.json();
                setStatus({ type: 'error', message: errData.error || 'Failed to save project' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Connection error. Please try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            category: 'web',
            badge: 'NEW',
            sub_title: '',
            description: '',
            tags: '',
            impact_value_1: '',
            impact_label_1: '',
            impact_value_2: '',
            impact_label_2: '',
            thumb_icon: 'fas fa-code',
            thumb_color: '#6366F1',
            image: '',
            detail_link: '#'
        });
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
                const err = await res.json();
                setStatus({ type: 'error', message: err.error || 'Upload failed' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Connection error during upload.' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleEdit = (pj: Project) => {
        setEditing(pj);
        let tagsStr = '';
        try {
            const tags = typeof pj.tags === 'string' ? JSON.parse(pj.tags) : pj.tags;
            tagsStr = Array.isArray(tags) ? tags.join(', ') : '';
        } catch(e) { tagsStr = ''; }

        setFormData({
            ...pj,
            tags: tagsStr
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            try {
                const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    setStatus({ type: 'success', message: 'Project deleted successfully!' });
                    fetchProjects();
                }
            } catch (error) {
                setStatus({ type: 'error', message: 'Failed to delete project.' });
            }
        }
    };

    const filteredProjects = projects.filter(pj => 
        pj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pj.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pj.sub_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-container animate-fade-in">
            {/* Status Notification */}
            {status && (
                <div className={`status-toast ${status.type}`}>
                    {status.type === 'success' ? <CheckCircle2 size={18} /> : <Info size={18} />}
                    <span>{status.message}</span>
                </div>
            )}

            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Project <span className="text-gradient">Showcase</span></h1>
                    <p className="admin-subtitle">Curate and manage your high-impact professional portfolio.</p>
                </div>
                <button className="btn btn-primary btn-lg" onClick={() => { setEditing(null); resetForm(); setIsModalOpen(true); }}>
                    <Plus size={20} />
                    New Project
                </button>
            </div>

            {/* Filter Bar */}
            <div className="filter-bar glass">
                <div className="search-box">
                    <Search size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by title, category, or subtitle..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filter-info">
                    <span>{filteredProjects.length} Projects</span>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
                {loading ? (
                    <div className="loading-container glass">
                        <Loader2 className="spin" size={40} />
                        <p>Synchronizing project data...</p>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="empty-state glass">
                        <LayoutGrid size={48} className="muted-icon" />
                        <p>{searchQuery ? 'No projects match your search.' : 'Your portfolio is empty. Add your first project!'}</p>
                    </div>
                ) : (
                    filteredProjects.map((pj) => (
                        <div key={pj.id} className="project-card glass">
                            <div className="project-card-header">
                                {pj.image ? (
                                    <div className="project-image-box">
                                        <img src={pj.image} alt={pj.title} />
                                    </div>
                                ) : (
                                    <div className="project-icon-box" style={{ color: pj.thumb_color }}>
                                        <i className={pj.thumb_icon || 'fas fa-code'}></i>
                                    </div>
                                )}
                                <div className="project-header-info">
                                    <div className="category-tag">{pj.category}</div>
                                    <h3 className="project-title-text">{pj.title}</h3>
                                </div>
                                <div className="card-actions">
                                    <button className="btn-icon" onClick={() => handleEdit(pj)} title="Edit">
                                        <Pencil size={14} />
                                    </button>
                                    <button className="btn-icon danger" onClick={() => handleDelete(pj.id)} title="Delete">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="project-card-body">
                                <p className="project-sub">{pj.sub_title}</p>
                                
                                <div className="impact-stats">
                                    {pj.impact_value_1 && (
                                        <div className="impact-item">
                                            <span className="impact-val">{pj.impact_value_1}</span>
                                            <span className="impact-label">{pj.impact_label_1}</span>
                                        </div>
                                    )}
                                    {pj.impact_value_2 && (
                                        <div className="impact-item">
                                            <span className="impact-val">{pj.impact_value_2}</span>
                                            <span className="impact-label">{pj.impact_label_2}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="project-card-footer">
                                <div className="tags-preview">
                                    {typeof pj.tags === 'string' ? 
                                        JSON.parse(pj.tags || '[]').slice(0, 3).map((tag: string, i: number) => (
                                            <span key={i} className="mini-tag">{tag}</span>
                                        )) : 
                                        (Array.isArray(pj.tags) ? pj.tags : []).slice(0, 3).map((tag: string, i: number) => (
                                            <span key={i} className="mini-tag">{tag}</span>
                                        ))
                                    }
                                    {((typeof pj.tags === 'string' ? JSON.parse(pj.tags || '[]').length : (Array.isArray(pj.tags) ? pj.tags.length : 0)) > 3) && (
                                        <span className="mini-tag more">...</span>
                                    )}
                                </div>
                                {pj.badge && <span className="project-badge"><Award size={12} /> {pj.badge}</span>}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Premium Modal Form */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
                    <div className="admin-card modal-content-large animate-slide-up">
                        <div className="modal-header">
                            <div>
                                <h2 className="modal-title">
                                    {editing ? 'Refine Project Details' : 'Configure New Showcase'}
                                </h2>
                                <p className="modal-subtitle">
                                    {editing ? 'Update the metrics, description, and visual representation.' : 'Define the core attributes and impact of your project.'}
                                </p>
                            </div>
                            <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-body scrollable">
                            {/* Grid Layout for Form */}
                            <div className="form-grid-layout">
                                {/* Left Column: Core Info */}
                                <div className="form-column">
                                    <div className="form-section-title">
                                        <Info size={16} /> Identity & Context
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="form-label">Project Title</label>
                                        <input 
                                            className="form-input"
                                            placeholder="e.g. Element Bike E-commerce"
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Subtitle / Hook</label>
                                        <input 
                                            className="form-input"
                                            placeholder="A short, catchy description"
                                            value={formData.sub_title}
                                            onChange={(e) => setFormData({...formData, sub_title: e.target.value})}
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group flex-1">
                                            <label className="form-label">Category</label>
                                            <select 
                                                className="form-select"
                                                value={formData.category}
                                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                            >
                                                <option value="web">Web Development</option>
                                                <option value="mobile">Mobile Application</option>
                                                <option value="ai">AI / ML Project</option>
                                                <option value="saas">SaaS Platform</option>
                                                <option value="design">UI/UX Design</option>
                                            </select>
                                        </div>
                                        <div className="form-group flex-1">
                                            <label className="form-label">Status Badge</label>
                                            <input 
                                                className="form-input"
                                                placeholder="e.g. NEW, FEATURED"
                                                value={formData.badge}
                                                onChange={(e) => setFormData({...formData, badge: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Full Description</label>
                                        <textarea 
                                            className="form-textarea"
                                            placeholder="Describe the challenges, solutions, and results..."
                                            rows={6}
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Right Column: Tech & Impact */}
                                <div className="form-column">
                                    <div className="form-section-title">
                                        <Zap size={16} /> Tech Stack & Visuals
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Technologies (Comma separated)</label>
                                        <div className="input-icon-group">
                                            <Code2 size={18} />
                                            <input 
                                                className="form-input"
                                                placeholder="React, Node.js, AWS, etc."
                                                value={formData.tags}
                                                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Project Visual</label>
                                        <div className="upload-container">
                                            {formData.image ? (
                                                <div className="image-preview-wrapper">
                                                    <img src={formData.image} alt="Preview" className="image-preview" />
                                                    <button type="button" className="btn-remove-image" onClick={() => setFormData({...formData, image: ''})}>
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="upload-dropzone">
                                                    <input 
                                                        type="file" 
                                                        className="hidden-input" 
                                                        accept="image/*"
                                                        onChange={handleFileUpload}
                                                        disabled={isUploading}
                                                    />
                                                    {isUploading ? (
                                                        <Loader2 className="spin" size={24} />
                                                    ) : (
                                                        <>
                                                            <Upload size={24} />
                                                            <span>Upload Image</span>
                                                        </>
                                                    )}
                                                </label>
                                            )}
                                        </div>
                                        
                                        <div className="input-icon-group" style={{ marginTop: '1rem' }}>
                                            <ImageIcon size={18} />
                                            <input 
                                                className="form-input"
                                                placeholder="Or paste image URL here..."
                                                value={formData.image}
                                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                            />
                                        </div>
                                        <p className="form-help">Recommended: 1200x800px. Fallback to icon if empty.</p>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group flex-1">
                                            <label className="form-label">Fallback Icon</label>
                                            <input 
                                                className="form-input"
                                                placeholder="fas fa-code"
                                                value={formData.thumb_icon}
                                                onChange={(e) => setFormData({...formData, thumb_icon: e.target.value})}
                                            />
                                        </div>
                                        <div className="form-group flex-1">
                                            <label className="form-label">Accent Color</label>
                                            <div className="color-picker-wrapper">
                                                <input 
                                                    type="color"
                                                    className="color-input"
                                                    value={formData.thumb_color}
                                                    onChange={(e) => setFormData({...formData, thumb_color: e.target.value})}
                                                />
                                                <span className="color-hex">{formData.thumb_color}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="impact-section">
                                        <div className="form-section-title secondary">
                                            <Award size={16} /> Performance Metrics
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group flex-1">
                                                <label className="form-label">Metric 1 (Value)</label>
                                                <input className="form-input" placeholder="e.g. 98%" value={formData.impact_value_1} onChange={(e) => setFormData({...formData, impact_value_1: e.target.value})} />
                                            </div>
                                            <div className="form-group flex-1">
                                                <label className="form-label">Metric 1 (Label)</label>
                                                <input className="form-input" placeholder="e.g. SEO Score" value={formData.impact_label_1} onChange={(e) => setFormData({...formData, impact_label_1: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group flex-1">
                                                <label className="form-label">Metric 2 (Value)</label>
                                                <input className="form-input" placeholder="e.g. < 2s" value={formData.impact_value_2} onChange={(e) => setFormData({...formData, impact_value_2: e.target.value})} />
                                            </div>
                                            <div className="form-group flex-1">
                                                <label className="form-label">Metric 2 (Label)</label>
                                                <input className="form-input" placeholder="e.g. Load Time" value={formData.impact_label_2} onChange={(e) => setFormData({...formData, impact_label_2: e.target.value})} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">External Link</label>
                                        <div className="input-icon-group">
                                            <Globe size={18} />
                                            <input 
                                                className="form-input"
                                                placeholder="https://project-url.com"
                                                value={formData.detail_link}
                                                onChange={(e) => setFormData({...formData, detail_link: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer sticky-footer">
                                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
                                    Discard Changes
                                </button>
                                <button type="submit" className="btn btn-primary btn-wide" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="spin" size={20} /> : (editing ? 'Update Project' : 'Publish Project')}
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
                    margin-bottom: 2.5rem;
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

                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
                    gap: 2rem;
                }

                .project-card {
                    display: flex;
                    flex-direction: column;
                    padding: 1.5rem;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-primary);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .project-card:hover {
                    border-color: var(--accent-primary);
                    transform: translateY(-8px);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
                }

                .project-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .project-card:hover::before {
                    opacity: 1;
                }

                .project-card-header {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .project-image-box {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }

                .project-image-box img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .project-icon-box {
                    width: 48px;
                    height: 48px;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }

                .project-header-info {
                    flex: 1;
                }

                .category-tag {
                    font-size: 0.65rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: var(--accent-primary);
                    letter-spacing: 0.05em;
                    margin-bottom: 0.25rem;
                }

                .project-title-text {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: white;
                    margin: 0;
                }

                .card-actions {
                    display: flex;
                    gap: 0.4rem;
                }

                .btn-icon {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--border-primary);
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-icon:hover {
                    background: var(--accent-primary);
                    color: white;
                    border-color: var(--accent-primary);
                }

                .btn-icon.danger:hover {
                    background: var(--accent-danger);
                    border-color: var(--accent-danger);
                }

                .project-card-body {
                    margin-bottom: 1.5rem;
                }

                .project-sub {
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    margin-bottom: 1.25rem;
                    line-height: 1.5;
                }

                .impact-stats {
                    display: flex;
                    gap: 1.5rem;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 12px;
                }

                .impact-item {
                    display: flex;
                    flex-direction: column;
                }

                .impact-val {
                    font-size: 1rem;
                    font-weight: 800;
                    color: white;
                }

                .impact-label {
                    font-size: 0.65rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                }

                .project-card-footer {
                    margin-top: auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1.25rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }

                .tags-preview {
                    display: flex;
                    gap: 0.4rem;
                }

                .mini-tag {
                    font-size: 0.65rem;
                    padding: 2px 8px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--border-primary);
                    border-radius: 4px;
                    color: var(--text-muted);
                }

                .project-badge {
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: var(--accent-warning);
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                /* Modal Specifics */
                .modal-content-large {
                    width: 100%;
                    max-width: 950px;
                    max-height: 92vh;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border: 1px solid var(--border-secondary);
                    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
                }

                .scrollable {
                    overflow-y: auto;
                    padding-bottom: 0;
                }

                .form-grid-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3rem;
                    padding: 2rem 2.5rem;
                }

                .form-section-title {
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: var(--accent-primary);
                    letter-spacing: 0.1em;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .form-help {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    margin-top: 0.4rem;
                    font-style: italic;
                }

                .form-section-title.secondary {
                    color: var(--accent-secondary);
                    margin-top: 1.5rem;
                }

                .form-row {
                    display: flex;
                    gap: 1rem;
                }

                .flex-1 { flex: 1; }

                .input-icon-group {
                    position: relative;
                }

                .input-icon-group :global(svg) {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-muted);
                }

                .input-icon-group input {
                    padding-left: 2.75rem;
                }

                .color-picker-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    background: var(--bg-tertiary);
                    padding: 0.5rem;
                    border-radius: var(--radius-sm);
                    border: 1px solid var(--border-primary);
                }

                .color-input {
                    width: 32px;
                    height: 32px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    background: transparent;
                }

                .color-hex {
                    font-size: 0.85rem;
                    font-family: monospace;
                    color: var(--text-secondary);
                }

                .sticky-footer {
                    position: sticky;
                    bottom: 0;
                    background: var(--bg-secondary);
                    border-top: 1px solid var(--border-primary);
                    padding: 1.5rem 2.5rem;
                    z-index: 20;
                    backdrop-filter: blur(10px);
                }

                .btn-wide {
                    padding-left: 2.5rem;
                    padding-right: 2.5rem;
                }

                .loading-container, .empty-state {
                    grid-column: 1 / -1;
                    padding: 6rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5rem;
                    color: var(--text-muted);
                }

                .muted-icon { opacity: 0.15; }

                .spin { animation: spin 1s linear infinite; }

                @keyframes spin { to { transform: rotate(360deg); } }

                .animate-slide-up {
                    animation: slideUp 0.4s cubic-bezier(0, 0, 0.2, 1);
                }

                @keyframes slideUp {
                    from { transform: translateY(40px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                @media (max-width: 900px) {
                    .form-grid-layout {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }

                @media (max-width: 768px) {
                    .projects-grid {
                        grid-template-columns: 1fr;
                    }
                    .filter-bar {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .search-box {
                        max-width: 100%;
                    }
                }

                /* Upload UI Styles */
                .upload-container {
                    width: 100%;
                }

                .upload-dropzone {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    height: 120px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 2px dashed var(--border-primary);
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                    color: var(--text-muted);
                }

                .upload-dropzone:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: var(--accent-primary);
                    color: white;
                }

                .hidden-input {
                    display: none;
                }

                .image-preview-wrapper {
                    position: relative;
                    width: 100%;
                    height: 160px;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid var(--border-primary);
                }

                .image-preview {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .btn-remove-image {
                    position: absolute;
                    top: 0.75rem;
                    right: 0.75rem;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.6);
                    color: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    backdrop-filter: blur(4px);
                    transition: all 0.2s;
                }

                .btn-remove-image:hover {
                    background: var(--accent-danger);
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
}
