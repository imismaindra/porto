"use client";
import { useState, useEffect } from 'react';
import { 
    User, 
    Briefcase, 
    FileText, 
    Image as ImageIcon, 
    Save, 
    CheckCircle2, 
    AlertCircle, 
    Loader2,
    Link as LinkIcon,
    Sparkles
} from 'lucide-react';

export default function ProfileAdmin() {
    const [heroData, setHeroData] = useState({
        name: '',
        role: '',
        description: '',
        greeting: 'Hi, I am',
        resume_link: '',
        profile_image: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        fetch('/api/hero')
            .then(res => res.json())
            .then(data => {
                if (data.id) setHeroData(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => setStatus(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleSave = async () => {
        setSaving(true);
        setStatus(null);
        try {
            const res = await fetch('/api/hero', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(heroData)
            });
            if (res.ok) {
                setStatus({ type: 'success', message: 'Profile content updated successfully!' });
            } else {
                setStatus({ type: 'error', message: 'Failed to update profile content.' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-container">
                <div className="loading-state">
                    <Loader2 className="animate-spin" />
                    <p>Loading profile data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            {/* Header Section */}
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Hero & Profile</h1>
                    <p className="admin-subtitle">Control the first impression visitors get</p>
                </div>
                <button 
                    className="btn btn-primary" 
                    onClick={handleSave} 
                    disabled={saving}
                >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>

            {/* Status Notifications */}
            {status && (
                <div className={`status-notification ${status.type}`}>
                    {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span>{status.message}</span>
                </div>
            )}

            <div className="profile-grid">
                {/* Left Column: Form */}
                <div className="profile-main">
                    <div className="admin-card glass">
                        <div className="card-section-title">
                            <Sparkles size={20} className="text-primary" />
                            <h2>Basic Information</h2>
                        </div>
                        
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Greeting</label>
                                <div className="input-with-icon">
                                    <Sparkles className="input-icon" size={18} />
                                    <input 
                                        value={heroData.greeting} 
                                        onChange={e => setHeroData({...heroData, greeting: e.target.value})} 
                                        className="form-input" 
                                        placeholder="e.g. Hello, I'm"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <div className="input-with-icon">
                                    <User className="input-icon" size={18} />
                                    <input 
                                        value={heroData.name} 
                                        onChange={e => setHeroData({...heroData, name: e.target.value})} 
                                        className="form-input" 
                                        placeholder="e.g. Johnathan Doe"
                                    />
                                </div>
                            </div>

                            <div className="form-group full">
                                <label className="form-label">Professional Role</label>
                                <div className="input-with-icon">
                                    <Briefcase className="input-icon" size={18} />
                                    <input 
                                        value={heroData.role} 
                                        onChange={e => setHeroData({...heroData, role: e.target.value})} 
                                        className="form-input" 
                                        placeholder="e.g. Senior Fullstack Developer"
                                    />
                                </div>
                            </div>

                            <div className="form-group full">
                                <label className="form-label">Biography / Description</label>
                                <div className="textarea-with-icon">
                                    <FileText className="input-icon" size={18} />
                                    <textarea 
                                        value={heroData.description} 
                                        onChange={e => setHeroData({...heroData, description: e.target.value})} 
                                        className="form-textarea" 
                                        rows={6}
                                        placeholder="Briefly describe what you do and your value proposition..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="admin-card glass" style={{ marginTop: '1.5rem' }}>
                        <div className="card-section-title">
                            <LinkIcon size={20} className="text-primary" />
                            <h2>External Resources</h2>
                        </div>
                        <div className="form-group full">
                            <label className="form-label">Resume / CV Link</label>
                            <div className="input-with-icon">
                                <LinkIcon className="input-icon" size={18} />
                                <input 
                                    value={heroData.resume_link} 
                                    onChange={e => setHeroData({...heroData, resume_link: e.target.value})} 
                                    className="form-input" 
                                    placeholder="https://drive.google.com/..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Media Preview */}
                <div className="profile-sidebar">
                    <div className="admin-card glass">
                        <div className="card-section-title">
                            <ImageIcon size={20} className="text-primary" />
                            <h2>Profile Image</h2>
                        </div>
                        
                        <div className="image-preview-container">
                            {heroData.profile_image ? (
                                <img src={heroData.profile_image} alt="Profile" />
                            ) : (
                                <div className="image-placeholder">
                                    <ImageIcon size={48} />
                                    <p>No Image Provided</p>
                                </div>
                            )}
                            <div className="preview-badge">Live Preview</div>
                        </div>

                        <div className="form-group" style={{ marginTop: '1.5rem' }}>
                            <label className="form-label">Image URL</label>
                            <div className="input-with-icon">
                                <ImageIcon className="input-icon" size={18} />
                                <input 
                                    value={heroData.profile_image} 
                                    onChange={e => setHeroData({...heroData, profile_image: e.target.value})} 
                                    className="form-input" 
                                    placeholder="Paste URL (Unsplash, Cloudinary, etc.)"
                                />
                            </div>
                            <p className="helper-text">Recommended: 1000x1000px, transparent PNG or JPG.</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .profile-grid {
                    display: grid;
                    grid-template-columns: 1.6fr 1fr;
                    gap: 1.5rem;
                    align-items: start;
                }

                .card-section-title {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .card-section-title h2 {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin: 0;
                    color: #fff;
                    letter-spacing: -0.01em;
                }

                .image-preview-container {
                    width: 100%;
                    aspect-ratio: 1;
                    border-radius: 1.5rem;
                    background: #000;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.6);
                }

                .image-preview-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .image-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    color: rgba(255, 255, 255, 0.15);
                }

                .preview-badge {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: rgba(var(--primary-rgb), 0.2);
                    backdrop-filter: blur(8px);
                    color: var(--primary);
                    padding: 0.4rem 0.8rem;
                    border-radius: 2rem;
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    border: 1px solid rgba(var(--primary-rgb), 0.3);
                }

                .textarea-with-icon {
                    position: relative;
                }

                .textarea-with-icon .input-icon {
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
                    color: rgba(255, 255, 255, 0.3);
                    pointer-events: none;
                }

                .textarea-with-icon textarea {
                    padding-left: 2.75rem;
                }

                .helper-text {
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.3);
                    margin-top: 0.5rem;
                }

                @media (max-width: 1024px) {
                    .profile-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
