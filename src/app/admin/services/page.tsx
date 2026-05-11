"use client";
import { useState, useEffect } from 'react';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    X, 
    Info, 
    LayoutGrid, 
    CheckCircle2, 
    AlertCircle,
    Search,
    Code,
    Smartphone,
    Globe,
    Database,
    Palette,
    Shield,
    Cloud,
    Zap
} from 'lucide-react';

interface Service {
    id: number;
    title: string;
    icon: string;
    description: string;
}

const COMMON_ICONS = [
    { label: 'Code', icon: 'fas fa-code' },
    { label: 'Mobile', icon: 'fas fa-mobile-alt' },
    { label: 'Web', icon: 'fas fa-globe' },
    { label: 'Database', icon: 'fas fa-database' },
    { label: 'Design', icon: 'fas fa-paint-brush' },
    { label: 'Security', icon: 'fas fa-shield-alt' },
    { label: 'Cloud', icon: 'fas fa-cloud' },
    { label: 'Performance', icon: 'fas fa-bolt' },
];

export default function ServicesAdmin() {
    const [services, setServices] = useState<Service[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({ title: '', icon: 'fas fa-code', description: '' });
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => { 
        fetchServices(); 
    }, []);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => setStatus(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/services');
            if (res.ok) {
                const data = await res.json();
                setServices(Array.isArray(data) ? data : []);
            } else {
                setStatus({ type: 'error', message: 'Failed to fetch services.' });
            }
        } catch (error) {
            console.error('Failed to fetch services:', error);
            setStatus({ type: 'error', message: 'Connection error while fetching services.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingService ? 'PUT' : 'POST';
        const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
        
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus({ type: 'success', message: `Service ${editingService ? 'updated' : 'created'} successfully!` });
                setIsModalOpen(false);
                setEditingService(null);
                setFormData({ title: '', icon: 'fas fa-code', description: '' });
                fetchServices();
            } else {
                const errData = await res.json();
                setStatus({ type: 'error', message: errData.error || 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Connection error. Please check your internet.' });
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
            try {
                const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    setStatus({ type: 'success', message: 'Service deleted successfully!' });
                    fetchServices();
                }
            } catch (error) {
                setStatus({ type: 'error', message: 'Failed to delete service.' });
            }
        }
    };

    const filteredServices = services.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <h1 className="admin-title">Services <span className="text-gradient">Offerings</span></h1>
                    <p className="admin-subtitle">Manage the professional services showcased on your portfolio.</p>
                </div>
                <button className="btn btn-primary btn-lg" onClick={() => { setEditingService(null); setFormData({ title: '', icon: 'fas fa-code', description: '' }); setIsModalOpen(true); }}>
                    <Plus size={20} />
                    Create Service
                </button>
            </div>

            {/* Filter Bar */}
            <div className="filter-bar glass">
                <div className="search-box">
                    <Search size={18} />
                    <input 
                        type="text" 
                        placeholder="Search services..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filter-info">
                    <span>Showing {filteredServices.length} services</span>
                </div>
            </div>

            <div className="table-container glass">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Icon</th>
                            <th>Service Details</th>
                            <th>Description Snippet</th>
                            <th style={{ textAlign: 'right', width: '150px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="empty-state">
                                    <div className="loading-spinner"></div>
                                    <p>Fetching your services...</p>
                                </td>
                            </tr>
                        ) : filteredServices.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="empty-state">
                                    <LayoutGrid size={48} />
                                    <p>{searchQuery ? 'No services match your search.' : 'No services found. Add your first service to get started.'}</p>
                                </td>
                            </tr>
                        ) : (
                            filteredServices.map((service) => (
                                <tr key={service.id}>
                                    <td>
                                        <div className="service-icon-preview">
                                            <i className={service.icon}></i>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="service-main-info">
                                            <span className="service-title-text">{service.title}</span>
                                            <code className="service-icon-code">{service.icon}</code>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="service-desc-preview">{service.description}</p>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div className="action-buttons">
                                            <button className="btn-icon" title="Edit Service" onClick={() => { setEditingService(service); setFormData(service); setIsModalOpen(true); }}>
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="btn-icon danger" title="Delete Service" onClick={() => handleDelete(service.id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Premium Modal Form */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
                    <div className="admin-card modal-content animate-slide-up">
                        <div className="modal-header">
                            <div>
                                <h2 className="modal-title">
                                    {editingService ? 'Refine Service' : 'New Service Offering'}
                                </h2>
                                <p className="modal-subtitle">
                                    {editingService ? 'Update the details and icon for this service.' : 'Define a new professional service to display.'}
                                </p>
                            </div>
                            <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-body">
                            <div className="form-row">
                                <div className="form-group flex-2">
                                    <label className="form-label">Service Title</label>
                                    <input 
                                        value={formData.title} 
                                        onChange={e => setFormData({...formData, title: e.target.value})} 
                                        className="form-input" 
                                        placeholder="e.g. Enterprise Web Solutions" 
                                        required 
                                    />
                                </div>
                                <div className="form-group flex-1">
                                    <label className="form-label">Live Preview</label>
                                    <div className="service-icon-preview large">
                                        <i className={formData.icon || 'fas fa-question'}></i>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Icon Definition</label>
                                <div className="icon-input-wrapper">
                                    <input 
                                        value={formData.icon} 
                                        onChange={e => setFormData({...formData, icon: e.target.value})} 
                                        className="form-input" 
                                        placeholder="fas fa-code" 
                                        required 
                                    />
                                    <div className="icon-helper-text">Using FontAwesome 6 Free</div>
                                </div>
                                <div className="quick-icons">
                                    {COMMON_ICONS.map((item) => (
                                        <button 
                                            key={item.icon}
                                            type="button" 
                                            className={`quick-icon-btn ${formData.icon === item.icon ? 'active' : ''}`}
                                            onClick={() => setFormData({...formData, icon: item.icon})}
                                            title={item.label}
                                        >
                                            <i className={item.icon}></i>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Service Description</label>
                                <textarea 
                                    value={formData.description} 
                                    onChange={e => setFormData({...formData, description: e.target.value})} 
                                    className="form-textarea" 
                                    rows={5} 
                                    placeholder="Explain the value proposition and key features of this service..." 
                                    required
                                ></textarea>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
                                    Discard
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingService ? 'Update Service' : 'Launch Service'}
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
                    margin-bottom: 1.5rem;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--border-primary);
                }

                .search-box {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex: 1;
                    max-width: 400px;
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

                .service-icon-preview {
                    width: 48px;
                    height: 48px;
                    background: rgba(59, 130, 246, 0.1);
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--accent-primary);
                    font-size: 1.25rem;
                    transition: all 0.3s ease;
                }

                .service-icon-preview.large {
                    width: 100%;
                    height: 100%;
                    min-height: 52px;
                    font-size: 1.5rem;
                }

                .service-main-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .service-title-text {
                    font-weight: 700;
                    color: white;
                    font-size: 1rem;
                }

                .service-icon-code {
                    font-size: 0.7rem;
                    color: var(--text-muted);
                    font-family: 'Fira Code', monospace;
                    background: rgba(255, 255, 255, 0.03);
                    padding: 0.1rem 0.4rem;
                    border-radius: 4px;
                    width: fit-content;
                }

                .service-desc-preview {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .action-buttons {
                    display: flex;
                    gap: 0.5rem;
                    justify-content: flex-end;
                }

                .btn-icon {
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--border-primary);
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-icon:hover {
                    background: rgba(59, 130, 246, 0.1);
                    border-color: var(--accent-primary);
                    color: var(--accent-primary);
                    transform: translateY(-2px);
                }

                .btn-icon.danger:hover {
                    background: rgba(239, 68, 68, 0.1);
                    border-color: var(--accent-danger);
                    color: var(--accent-danger);
                }

                /* Form Styles */
                .form-row {
                    display: flex;
                    gap: 1.5rem;
                }

                .flex-2 { flex: 2; }
                .flex-1 { flex: 1; }

                .icon-input-wrapper {
                    position: relative;
                }

                .icon-helper-text {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 0.7rem;
                    color: var(--text-muted);
                    pointer-events: none;
                }

                .quick-icons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.75rem;
                    padding: 0.75rem;
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: var(--radius-md);
                    border: 1px dashed var(--border-primary);
                }

                .quick-icon-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    border: 1px solid var(--border-primary);
                    background: rgba(255, 255, 255, 0.03);
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .quick-icon-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                }

                .quick-icon-btn.active {
                    background: var(--accent-primary);
                    border-color: var(--accent-primary);
                    color: white;
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }

                .empty-state {
                    text-align: center;
                    padding: 5rem 2rem;
                    color: var(--text-muted);
                }

                .empty-state p {
                    margin-top: 1rem;
                    font-size: 0.95rem;
                }

                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(59, 130, 246, 0.1);
                    border-radius: 50%;
                    border-top-color: var(--accent-primary);
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .animate-slide-up {
                    animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

