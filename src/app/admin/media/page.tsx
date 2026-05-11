"use client";
import { useState } from 'react';
import { 
    Upload, 
    Search, 
    Grid, 
    List, 
    Copy, 
    Trash2, 
    ExternalLink, 
    Image as ImageIcon,
    MoreVertical,
    FileText,
    Video,
    CheckCircle2,
    AlertCircle,
    X,
    Filter
} from 'lucide-react';

export default function MediaManager() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    // Mock data for demonstration - in a real app, this would come from an API
    const mediaFiles = [
        { id: 1, name: 'hero-bg.webp', size: '1.2 MB', type: 'image', date: '2024-03-10', url: '/images/hero-bg.webp' },
        { id: 2, name: 'project-1.png', size: '840 KB', type: 'image', date: '2024-03-09', url: '/images/project-1.png' },
        { id: 3, name: 'profile-pic.jpg', size: '250 KB', type: 'image', date: '2024-03-08', url: '/images/profile-pic.jpg' },
        { id: 4, name: 'resume.pdf', size: '1.5 MB', type: 'doc', date: '2024-03-07', url: '/docs/resume.pdf' },
        { id: 5, name: 'demo-video.mp4', size: '12 MB', type: 'video', date: '2024-03-06', url: '/videos/demo.mp4' },
    ];

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        setStatus({ type: 'success', message: 'URL copied to clipboard!' });
        setTimeout(() => setStatus(null), 3000);
    };

    const getIcon = (type: string) => {
        switch(type) {
            case 'image': return <ImageIcon size={20} />;
            case 'video': return <Video size={20} />;
            default: return <FileText size={20} />;
        }
    };

    return (
        <div className="admin-container">
            {/* Header Section */}
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Media Manager</h1>
                    <p className="admin-subtitle">Manage your portfolio assets and files</p>
                </div>
                <button className="btn btn-primary">
                    <Upload size={18} />
                    <span>Upload Assets</span>
                </button>
            </div>

            {/* Status Notifications */}
            {status && (
                <div className={`status-notification ${status.type}`}>
                    {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span>{status.message}</span>
                </div>
            )}

            {/* Toolbar */}
            <div className="media-toolbar glass">
                <div className="search-box">
                    <Search className="search-icon" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search assets..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="toolbar-actions">
                    <div className="view-switcher">
                        <button 
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid size={18} />
                        </button>
                        <button 
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List size={18} />
                        </button>
                    </div>
                    <div className="divider"></div>
                    <button className="toolbar-btn">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Media Content */}
            {viewMode === 'grid' ? (
                <div className="media-grid">
                    {mediaFiles.map((file) => (
                        <div key={file.id} className="media-card glass">
                            <div className="media-preview">
                                {file.type === 'image' ? (
                                    <div className="image-wrapper">
                                        <div className="image-placeholder">
                                            <ImageIcon size={32} opacity={0.2} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="file-icon-placeholder">
                                        {getIcon(file.type)}
                                    </div>
                                )}
                                <div className="media-overlay">
                                    <button onClick={() => copyToClipboard(file.url)} className="overlay-btn" title="Copy URL">
                                        <Copy size={16} />
                                    </button>
                                    <button className="overlay-btn" title="View Full">
                                        <ExternalLink size={16} />
                                    </button>
                                    <button className="overlay-btn delete" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="media-info">
                                <h3 className="file-name">{file.name}</h3>
                                <div className="file-meta">
                                    <span>{file.size}</span>
                                    <span className="dot"></span>
                                    <span>{file.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Size</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mediaFiles.map((file) => (
                                <tr key={file.id}>
                                    <td>
                                        <div className="file-name-cell">
                                            {getIcon(file.type)}
                                            <span>{file.name}</span>
                                        </div>
                                    </td>
                                    <td><span className="type-badge">{file.type}</span></td>
                                    <td>{file.size}</td>
                                    <td>{file.date}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button onClick={() => copyToClipboard(file.url)} className="icon-btn" title="Copy URL">
                                                <Copy size={14} />
                                            </button>
                                            <button className="icon-btn" title="View">
                                                <ExternalLink size={14} />
                                            </button>
                                            <button className="icon-btn delete" title="Delete">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style jsx>{`
                .media-toolbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    border-radius: var(--radius-lg);
                    margin-bottom: 2rem;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid var(--border-primary);
                }

                .search-box {
                    position: relative;
                    flex: 1;
                    max-width: 400px;
                }

                .search-icon {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-muted);
                }

                .search-input {
                    width: 100%;
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid var(--border-primary);
                    border-radius: var(--radius-md);
                    padding: 0.6rem 1rem 0.6rem 2.8rem;
                    color: white;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                }

                .search-input:focus {
                    outline: none;
                    border-color: var(--accent-primary);
                    background: black;
                }

                .toolbar-actions {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                }

                .view-switcher {
                    display: flex;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.25rem;
                    border-radius: var(--radius-md);
                }

                .view-btn {
                    padding: 0.4rem;
                    border-radius: 6px;
                    border: none;
                    background: transparent;
                    color: var(--text-muted);
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                }

                .view-btn.active {
                    background: var(--bg-tertiary);
                    color: white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }

                .divider {
                    width: 1px;
                    height: 24px;
                    background: var(--border-primary);
                }

                .toolbar-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: transparent;
                    border: 1px solid var(--border-primary);
                    padding: 0.5rem 1rem;
                    border-radius: var(--radius-md);
                    color: var(--text-secondary);
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .toolbar-btn:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                }

                /* Grid Layout */
                .media-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 1.5rem;
                }

                .media-card {
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid var(--border-primary);
                    transition: all 0.3s ease;
                }

                .media-card:hover {
                    transform: translateY(-4px);
                    border-color: var(--accent-primary);
                }

                .media-preview {
                    aspect-ratio: 16/10;
                    background: var(--bg-tertiary);
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .image-wrapper {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .image-placeholder {
                    color: var(--text-muted);
                }

                .file-icon-placeholder {
                    color: var(--accent-primary);
                    width: 48px;
                    height: 48px;
                    background: rgba(59, 130, 246, 0.1);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .media-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    opacity: 0;
                    transition: opacity 0.2s;
                    backdrop-filter: blur(4px);
                }

                .media-card:hover .media-overlay {
                    opacity: 1;
                }

                .overlay-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .overlay-btn:hover {
                    background: var(--accent-primary);
                    border-color: var(--accent-primary);
                    transform: scale(1.1);
                }

                .overlay-btn.delete:hover {
                    background: var(--accent-danger);
                    border-color: var(--accent-danger);
                }

                .media-info {
                    padding: 1rem;
                }

                .file-name {
                    font-size: 0.9rem;
                    font-weight: 600;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-bottom: 0.4rem;
                }

                .file-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    color: var(--text-muted);
                }

                .dot {
                    width: 3px;
                    height: 3px;
                    border-radius: 50%;
                    background: currentColor;
                    opacity: 0.5;
                }

                /* Table Customizations */
                .file-name-cell {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .type-badge {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.2rem 0.6rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--text-secondary);
                }

                .table-actions {
                    display: flex;
                    gap: 0.5rem;
                }

                .icon-btn {
                    background: transparent;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    padding: 0.4rem;
                    border-radius: 6px;
                    transition: all 0.2s;
                }

                .icon-btn:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                }

                .icon-btn.delete:hover {
                    color: var(--accent-danger);
                    background: rgba(239, 68, 68, 0.1);
                }

                @media (max-width: 768px) {
                    .media-toolbar {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 1rem;
                    }
                    .search-box {
                        max-width: none;
                    }
                }
            `}</style>
        </div>
    );
}
