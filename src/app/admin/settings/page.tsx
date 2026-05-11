"use client";
import { useState, useEffect } from 'react';
import { 
    Settings, 
    Globe, 
    Mail, 
    Share2, 
    ShieldAlert, 
    Save, 
    CheckCircle2, 
    AlertCircle, 
    Loader2,
    Search,
    MapPin,
    Phone
} from 'lucide-react';


export default function SettingsPage() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => setStatus(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/settings');
            const data = await res.json();
            // Convert array of {key, value} to object
            const settingsObj: Record<string, string> = {};
            data.forEach((s: { key: string, value: string }) => {
                settingsObj[s.key] = s.value;
            });
            setSettings(settingsObj);
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setStatus(null);
        try {
            const body = Object.entries(settings).map(([key, value]) => ({ key, value }));
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                setStatus({ type: 'success', message: 'All settings saved successfully!' });
            } else {
                setStatus({ type: 'error', message: 'Failed to update settings.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const updateSetting = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    if (isLoading) {
        return (
            <div className="admin-container">
                <div className="loading-state">
                    <Loader2 className="animate-spin" />
                    <p>Loading system settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            {/* Header Section */}
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Global Settings</h1>
                    <p className="admin-subtitle">Configure website-wide metadata and contact information</p>
                </div>
                <button 
                    className="btn btn-primary" 
                    onClick={handleSave} 
                    disabled={saving}
                >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
                </button>
            </div>

            {/* Status Notifications */}
            {status && (
                <div className={`status-notification ${status.type}`}>
                    {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span>{status.message}</span>
                </div>
            )}

            <div className="settings-grid">
                {/* SEO Section */}
                <div className="admin-card glass">
                    <div className="card-section-title">
                        <Globe size={20} className="text-primary" />
                        <h2>SEO & Metadata</h2>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Site Title</label>
                        <div className="input-with-icon">
                            <Search className="input-icon" size={18} />
                            <input 
                                value={settings.site_title || ''} 
                                onChange={e => updateSetting('site_title', e.target.value)}
                                className="form-input" 
                                placeholder="Indra - Developer Portfolio" 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Meta Description</label>
                        <textarea 
                            value={settings.meta_description || ''} 
                            onChange={e => updateSetting('meta_description', e.target.value)}
                            className="form-textarea" 
                            rows={3} 
                            placeholder="Brief description for search engines..." 
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Google Analytics ID</label>
                        <input 
                            value={settings.ga_id || ''} 
                            onChange={e => updateSetting('ga_id', e.target.value)}
                            type="text" 
                            className="form-input" 
                            placeholder="G-XXXXXXXXXX" 
                        />
                    </div>
                </div>

                {/* Contact Section */}
                <div className="admin-card glass">
                    <div className="card-section-title">
                        <Mail size={20} className="text-primary" />
                        <h2>Contact Information</h2>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Public Email</label>
                        <div className="input-with-icon">
                            <Mail className="input-icon" size={18} />
                            <input 
                                value={settings.public_email || ''} 
                                onChange={e => updateSetting('public_email', e.target.value)}
                                type="email" 
                                className="form-input" 
                                placeholder="hello@indra.dev" 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone / WhatsApp</label>
                        <div className="input-with-icon">
                            <Phone className="input-icon" size={18} />
                            <input 
                                value={settings.public_phone || ''} 
                                onChange={e => updateSetting('public_phone', e.target.value)}
                                type="text" 
                                className="form-input" 
                                placeholder="+62 812..." 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Location</label>
                        <div className="input-with-icon">
                            <MapPin className="input-icon" size={18} />
                            <input 
                                value={settings.public_location || ''} 
                                onChange={e => updateSetting('public_location', e.target.value)}
                                type="text" 
                                className="form-input" 
                                placeholder="Surabaya, Indonesia" 
                            />
                        </div>
                    </div>
                </div>

                {/* Social Section */}
                <div className="admin-card glass">
                    <div className="card-section-title">
                        <Share2 size={20} className="text-primary" />
                        <h2>Social Media Links</h2>
                    </div>
                    <div className="form-group">
                        <label className="form-label">GitHub Profile</label>
                        <div className="input-with-icon">
                            <i className="fab fa-github input-icon" style={{ fontSize: '18px' }}></i>
                            <input 
                                value={settings.github_url || ''} 
                                onChange={e => updateSetting('github_url', e.target.value)}
                                className="form-input" 
                                placeholder="https://github.com/..." 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">LinkedIn Profile</label>
                        <div className="input-with-icon">
                            <i className="fab fa-linkedin input-icon" style={{ fontSize: '18px' }}></i>
                            <input 
                                value={settings.linkedin_url || ''} 
                                onChange={e => updateSetting('linkedin_url', e.target.value)}
                                className="form-input" 
                                placeholder="https://linkedin.com/in/..." 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Twitter / X</label>
                        <div className="input-with-icon">
                            <i className="fab fa-twitter input-icon" style={{ fontSize: '18px' }}></i>
                            <input 
                                value={settings.twitter_url || ''} 
                                onChange={e => updateSetting('twitter_url', e.target.value)}
                                className="form-input" 
                                placeholder="https://x.com/..." 
                            />
                        </div>
                    </div>
                </div>

                {/* System Section */}
                <div className="admin-card glass border-danger">
                    <div className="card-section-title">
                        <ShieldAlert size={20} className="text-danger" />
                        <h2>System Controls</h2>
                    </div>
                    <div className="maintenance-toggle">
                        <div>
                            <p className="toggle-label">Maintenance Mode</p>
                            <p className="toggle-desc">Disable public access to the website.</p>
                        </div>
                        <button 
                            className={`toggle-switch ${settings.maintenance_mode === 'true' ? 'active' : ''}`}
                            onClick={() => updateSetting('maintenance_mode', settings.maintenance_mode === 'true' ? 'false' : 'true')}
                        >
                            <div className="toggle-knob"></div>
                        </button>
                    </div>
                    <button className="btn btn-outline-danger" style={{ width: '100%', marginTop: '1.5rem' }}>
                        Purge System Cache
                    </button>
                </div>
            </div>

            <style jsx>{`
                .settings-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
                    gap: 1.5rem;
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
                }

                .maintenance-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.25rem;
                    background: rgba(239, 68, 68, 0.05);
                    border-radius: 1rem;
                    border: 1px solid rgba(239, 68, 68, 0.1);
                }

                .toggle-label {
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin: 0;
                    color: #fff;
                }

                .toggle-desc {
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.4);
                    margin: 0.25rem 0 0 0;
                }

                .toggle-switch {
                    width: 44px;
                    height: 24px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    cursor: pointer;
                    position: relative;
                    transition: all 0.3s ease;
                }

                .toggle-switch.active {
                    background: #ef4444;
                    border-color: #ef4444;
                }

                .toggle-knob {
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 18px;
                    height: 18px;
                    background: #fff;
                    border-radius: 50%;
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }

                .toggle-switch.active .toggle-knob {
                    transform: translateX(20px);
                }

                .border-danger {
                    border-color: rgba(239, 68, 68, 0.2) !important;
                }

                .text-danger {
                    color: #ef4444 !important;
                }

                .btn-outline-danger {
                    background: transparent;
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    color: #ef4444;
                    padding: 0.75rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .btn-outline-danger:hover {
                    background: rgba(239, 68, 68, 0.1);
                    border-color: #ef4444;
                }

                @media (max-width: 768px) {
                    .settings-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
