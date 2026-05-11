"use client";
import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        sender_name: '',
        sender_email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', message: 'Pesan Anda telah terkirim! Saya akan segera menghubungi Anda.' });
                setFormData({ sender_name: '', sender_email: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.error || 'Gagal mengirim pesan.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Terjadi kesalahan koneksi.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-form-wrapper glass">
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="sender_name">Nama Lengkap</label>
                        <input 
                            type="text" 
                            id="sender_name"
                            placeholder="John Doe"
                            value={formData.sender_name}
                            onChange={(e) => setFormData({...formData, sender_name: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sender_email">Email</label>
                        <input 
                            type="email" 
                            id="sender_email"
                            placeholder="john@example.com"
                            value={formData.sender_email}
                            onChange={(e) => setFormData({...formData, sender_email: e.target.value})}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="message">Pesan</label>
                    <textarea 
                        id="message"
                        rows={5}
                        placeholder="Apa yang bisa saya bantu?"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 size={18} className="spin" />
                            <span>Mengirim...</span>
                        </>
                    ) : (
                        <>
                            <Send size={18} />
                            <span>Kirim Pesan</span>
                        </>
                    )}
                </button>

                {status.message && (
                    <div className={`form-status ${status.type}`}>
                        {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        <span>{status.message}</span>
                    </div>
                )}
            </form>

            <style jsx>{`
                .contact-form-wrapper {
                    padding: 2.5rem;
                    border-radius: var(--radius-xl);
                    border: 1px solid var(--border-primary);
                    background: rgba(255, 255, 255, 0.03);
                    max-width: 600px;
                    margin: 0 auto;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                @media (max-width: 640px) {
                    .form-grid {
                        grid-template-columns: 1fr;
                    }
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-group label {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--text-secondary);
                    margin-bottom: 0.5rem;
                }

                .form-group input, 
                .form-group textarea {
                    width: 100%;
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid var(--border-primary);
                    border-radius: var(--radius-md);
                    padding: 0.8rem 1rem;
                    color: white;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                }

                .form-group input:focus, 
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--accent-primary);
                    background: rgba(0, 0, 0, 0.3);
                    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
                }

                .btn-block {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    padding: 1rem;
                }

                .form-status {
                    margin-top: 1.5rem;
                    padding: 1rem;
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 0.9rem;
                }

                .form-status.success {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                    border: 1px solid rgba(16, 185, 129, 0.2);
                }

                .form-status.error {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: 1px solid rgba(239, 68, 68, 0.2);
                }

                .spin {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
