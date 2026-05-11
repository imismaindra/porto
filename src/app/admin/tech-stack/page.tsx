"use client";
import { useState, useEffect } from 'react';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    X, 
    Layers, 
    CheckCircle2, 
    AlertCircle, 
    Loader2,
    Sparkles,
    Palette,
    Activity
} from 'lucide-react';

interface Tech {
    id: number;
    name: string;
    icon: string;
    color: string;
    active: boolean;
}

export default function TechStackAdmin() {
    const [techStack, setTechStack] = useState<Tech[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<Tech | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [formData, setFormData] = useState({ name: '', icon: '', color: '#3b82f6', active: true });

    useEffect(() => { 
        fetchTechStack(); 
    }, []);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => setStatus(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const fetchTechStack = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/tech-stack');
            const data = await res.json();
            setTechStack(data);
        } catch (error) {
            console.error('Failed to fetch tech stack:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/tech-stack/${editing.id}` : '/api/tech-stack';
        
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus({ type: 'success', message: `Tech ${editing ? 'updated' : 'added'} successfully!` });
                setIsModalOpen(false);
                setEditing(null);
                setFormData({ name: '', icon: '', color: '#3b82f6', active: true });
                fetchTechStack();
            } else {
                setStatus({ type: 'error', message: 'Failed to save tech.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this technology?')) {
            try {
                const res = await fetch(`/api/tech-stack/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    setStatus({ type: 'success', message: 'Tech deleted successfully.' });
                    fetchTechStack();
                } else {
                    setStatus({ type: 'error', message: 'Failed to delete tech.' });
                }
            } catch (error) {
                setStatus({ type: 'error', message: 'An error occurred.' });
            }
        }
    };

    const toggleActive = async (tech: Tech) => {
        const updatedTech = { ...tech, active: !tech.active };
        try {
            const res = await fetch(`/api/tech-stack/${tech.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTech)
            });
            if (res.ok) {
                setTechStack(prev => prev.map(t => t.id === tech.id ? updatedTech : t));
                setStatus({ type: 'success', message: `Tech ${updatedTech.active ? 'enabled' : 'disabled'}.` });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to toggle state.' });
        }
    };

    const handleEdit = (tech: Tech) => {
        setEditing(tech);
        setFormData({
            name: tech.name,
            icon: tech.icon,
            color: tech.color,
            active: tech.active
        });
        setIsModalOpen(true);
    };

    return (
        <div className="admin-container">
            {/* Header Section */}
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Tech Stack</h1>
                    <p className="admin-subtitle">Master data for technologies you use</p>
                </div>
                <button 
                    className="btn btn-primary" 
                    onClick={() => { 
                        setEditing(null); 
                        setFormData({ name: '', icon: '', color: '#3b82f6', active: true });
                        setIsModalOpen(true); 
                    }}
                >
                    <Plus size={18} />
                    <span>Add Technology</span>
                </button>
            </div>

            {/* Status Notifications */}
            {status && (
                <div className={`status-notification ${status.type}`}>
                    {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span>{status.message}</span>
                </div>
            )}

            {/* Tech Grid */}
            {isLoading ? (
                <div className="loading-state">
                    <Loader2 className="animate-spin" />
                    <p>Loading tech stack...</p>
                </div>
            ) : techStack.length === 0 ? (
                <div className="empty-state">
                    <Layers size={48} opacity={0.2} />
                    <p>No technologies found. Start building your stack!</p>
                </div>
            ) : (
                <div className="tech-grid">
                    {techStack.map((tech) => (
                        <div key={tech.id} className={`tech-item ${tech.active ? 'active' : 'inactive'}`}>
                            <div className="tech-icon-box" style={{ borderColor: `${tech.color}40`, background: `${tech.color}10` }}>
                                <span className="tech-icon-text">{tech.icon || tech.name.charAt(0)}</span>
                            </div>
                            <div className="tech-details">
                                <h3>{tech.name}</h3>
                                <div className="tech-status-badge">
                                    <div className="status-dot"></div>
                                    <span>{tech.active ? 'Active' : 'Hidden'}</span>
                                </div>
                            </div>
                            <div className="tech-actions">
                                <button 
                                    className={`toggle-small ${tech.active ? 'on' : 'off'}`} 
                                    onClick={() => toggleActive(tech)}
                                    title={tech.active ? 'Disable' : 'Enable'}
                                >
                                    <div className="toggle-thumb"></div>
                                </button>
                                <div className="action-divider"></div>
                                <button onClick={() => handleEdit(tech)} className="icon-btn" title="Edit">
                                    <Pencil size={14} />
                                </button>
                                <button onClick={() => handleDelete(tech.id)} className="icon-btn delete" title="Delete">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content glass">
                        <div className="modal-header">
                            <h2 className="modal-title">
                                {editing ? 'Edit Technology' : 'Add New Technology'}
                            </h2>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-grid">
                                <div className="form-group full">
                                    <label className="form-label">Technology Name</label>
                                    <div className="input-with-icon">
                                        <Sparkles className="input-icon" size={18} />
                                        <input 
                                            value={formData.name} 
                                            onChange={e => setFormData({...formData, name: e.target.value})} 
                                            className="form-input" 
                                            placeholder="e.g. Next.js" 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Icon / Symbol</label>
                                    <div className="input-with-icon">
                                        <Layers className="input-icon" size={18} />
                                        <input 
                                            value={formData.icon} 
                                            onChange={e => setFormData({...formData, icon: e.target.value})} 
                                            className="form-input" 
                                            placeholder="e.g. ▲ or SVG" 
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Brand Color</label>
                                    <div className="input-with-icon">
                                        <Palette className="input-icon" size={18} />
                                        <input 
                                            type="color"
                                            value={formData.color} 
                                            onChange={e => setFormData({...formData, color: e.target.value})} 
                                            className="form-input color-picker" 
                                        />
                                    </div>
                                </div>

                                <div className="form-group full">
                                    <div className="maintenance-toggle small">
                                        <div>
                                            <p className="toggle-label">Visibility Status</p>
                                            <p className="toggle-desc">Should this be shown in your portfolio?</p>
                                        </div>
                                        <button 
                                            type="button"
                                            className={`toggle-switch ${formData.active ? 'active' : ''}`}
                                            onClick={() => setFormData({...formData, active: !formData.active})}
                                        >
                                            <div className="toggle-knob"></div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editing ? 'Save Changes' : 'Add to Stack'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                .tech-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1rem;
                }

                .tech-item {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 1rem;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    transition: all 0.2s ease;
                }

                .tech-item:hover {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                }

                .tech-item.inactive {
                    opacity: 0.6;
                    filter: grayscale(0.5);
                }

                .tech-icon-box {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    border: 1px solid transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .tech-icon-text {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #fff;
                }

                .tech-details {
                    flex: 1;
                }

                .tech-details h3 {
                    font-size: 0.95rem;
                    font-weight: 600;
                    margin: 0;
                    color: #fff;
                }

                .tech-status-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    margin-top: 0.25rem;
                }

                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #4ade80;
                }

                .tech-item.inactive .status-dot {
                    background: #666;
                }

                .tech-status-badge span {
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.4);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .tech-actions {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .action-divider {
                    width: 1px;
                    height: 16px;
                    background: rgba(255, 255, 255, 0.1);
                    margin: 0 0.25rem;
                }

                .icon-btn {
                    background: transparent;
                    border: none;
                    color: rgba(255, 255, 255, 0.4);
                    cursor: pointer;
                    padding: 0.4rem;
                    border-radius: 6px;
                    display: flex;
                    transition: all 0.2s ease;
                }

                .icon-btn:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                }

                .icon-btn.delete:hover {
                    color: #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                }

                .toggle-small {
                    width: 32px;
                    height: 18px;
                    border-radius: 9px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background: rgba(255, 255, 255, 0.05);
                    cursor: pointer;
                    position: relative;
                    transition: all 0.3s ease;
                }

                .toggle-small.on {
                    background: #4ade80;
                    border-color: #4ade80;
                }

                .toggle-thumb {
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 12px;
                    height: 12px;
                    background: #fff;
                    border-radius: 50%;
                    transition: transform 0.3s ease;
                }

                .toggle-small.on .toggle-thumb {
                    transform: translateX(14px);
                }

                .color-picker {
                    padding: 0.25rem !important;
                    height: 42px !important;
                    cursor: pointer;
                }

                .maintenance-toggle.small {
                    padding: 1rem;
                }

                @media (max-width: 768px) {
                    .tech-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
