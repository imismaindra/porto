"use client";
import { useState, useEffect } from 'react';
import { 
    Mail, 
    User, 
    Clock, 
    Trash2, 
    Reply, 
    Search, 
    CheckCircle2, 
    AlertCircle, 
    MoreVertical,
    Send,
    AtSign,
    Inbox,
    Loader2
} from 'lucide-react';

interface Message {
    id: number;
    sender_name: string;
    sender_email: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    created_at: string;
}

export default function MessagesAdmin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [replyText, setReplyText] = useState('');

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/messages');
            const data = await res.json();
            if (res.ok) {
                setMessages(data);
                if (data.length > 0 && !selectedId) {
                    setSelectedId(data[0].id);
                }
            }
        } catch (error) {
            console.error('Fetch error:', error);
            showToast('error', 'Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const showToast = (type: string, message: string) => {
        setStatus({ type, message });
        setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    };

    const handleUpdateStatus = async (id: number, newStatus: string) => {
        try {
            const res = await fetch(`/api/messages/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus as any } : m));
                showToast('success', `Message marked as ${newStatus}`);
            }
        } catch (error) {
            showToast('error', 'Failed to update status');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMessages(messages.filter(m => m.id !== id));
                if (selectedId === id) setSelectedId(null);
                showToast('success', 'Message deleted');
            }
        } catch (error) {
            showToast('error', 'Failed to delete message');
        }
    };

    const handleReply = () => {
        const msg = messages.find(m => m.id === selectedId);
        if (!msg) return;
        
        // Mark as replied in DB
        handleUpdateStatus(msg.id, 'replied');
        
        // Open email client
        const mailtoLink = `mailto:${msg.sender_email}?subject=Re: Inquiry from Portfolio&body=%0A%0A--- Original Message ---%0A${msg.message}`;
        window.location.href = mailtoLink;
        setReplyText('');
    };

    const filteredMessages = messages.filter(m => 
        m.sender_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.sender_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedMessage = messages.find(m => m.id === selectedId);

    // Auto mark as read when selected
    useEffect(() => {
        if (selectedMessage && selectedMessage.status === 'new') {
            handleUpdateStatus(selectedMessage.id, 'read');
        }
    }, [selectedId]);

    return (
        <div className="admin-container">
            {status.message && (
                <div className={`status-toast ${status.type}`}>
                    {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    {status.message}
                </div>
            )}

            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Inbox</h1>
                    <p className="admin-subtitle">Manage client inquiries and contact form submissions</p>
                </div>
            </div>

            <div className="inbox-layout">
                {/* Messages List */}
                <div className="inbox-list glass">
                    <div className="inbox-list-header">
                        <div className="search-mini">
                            <Search size={16} />
                            <input 
                                type="text" 
                                placeholder="Search inbox..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="messages-scroll">
                        {loading ? (
                            <div className="loading-state">
                                <Loader2 className="spin" size={24} />
                                <p>Loading messages...</p>
                            </div>
                        ) : filteredMessages.length > 0 ? (
                            filteredMessages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className={`message-item ${selectedId === msg.id ? 'active' : ''} ${msg.status === 'new' ? 'unread' : ''}`}
                                    onClick={() => setSelectedId(msg.id)}
                                >
                                    <div className="message-item-header">
                                        <span className="sender-name">{msg.sender_name}</span>
                                        <span className="message-date">{new Date(msg.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="message-snippet">{msg.message}</p>
                                    <div className="message-status-box">
                                        <span className={`status-pill ${msg.status}`}>
                                            {msg.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-list">
                                <Inbox size={32} opacity={0.2} />
                                <p>No messages found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Message Content */}
                <div className="inbox-content glass">
                    {selectedMessage ? (
                        <>
                            <div className="content-header">
                                <div className="sender-profile">
                                    <div className="avatar-placeholder">
                                        <User size={24} />
                                    </div>
                                    <div className="sender-info">
                                        <h2>{selectedMessage.sender_name}</h2>
                                        <p className="sender-email">
                                            <AtSign size={14} />
                                            {selectedMessage.sender_email}
                                        </p>
                                    </div>
                                </div>
                                <div className="content-actions">
                                    <button 
                                        className="icon-btn" 
                                        title="Mark as unread"
                                        onClick={() => handleUpdateStatus(selectedMessage.id, 'new')}
                                    >
                                        <Mail size={18} />
                                    </button>
                                    <button 
                                        className="icon-btn delete" 
                                        title="Delete"
                                        onClick={() => handleDelete(selectedMessage.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="message-body">
                                <div className="message-meta-strip">
                                    <Clock size={14} />
                                    <span>Received on {new Date(selectedMessage.created_at).toLocaleString()}</span>
                                </div>
                                <div className="message-text">
                                    {selectedMessage.message}
                                </div>
                            </div>

                            <div className="reply-section">
                                <div className="reply-header">
                                    <Reply size={16} />
                                    <h3>Quick Reply</h3>
                                </div>
                                <textarea 
                                    className="form-textarea" 
                                    rows={4} 
                                    placeholder={`Reply to ${selectedMessage.sender_name}...`}
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                ></textarea>
                                <div className="reply-footer">
                                    <button 
                                        className="btn btn-primary"
                                        onClick={handleReply}
                                    >
                                        <Send size={16} />
                                        <span>Send via Email</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="empty-content">
                            <Inbox size={48} opacity={0.2} />
                            <p>Select a message to read</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .inbox-layout {
                    display: grid;
                    grid-template-columns: 350px 1fr;
                    gap: 1.5rem;
                    height: calc(100vh - 220px);
                }

                .inbox-list {
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-primary);
                    background: rgba(255, 255, 255, 0.02);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .inbox-list-header {
                    padding: 1rem;
                    border-bottom: 1px solid var(--border-primary);
                }

                .search-mini {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .search-mini svg {
                    position: absolute;
                    left: 0.75rem;
                    color: var(--text-muted);
                }

                .search-mini input {
                    width: 100%;
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid var(--border-primary);
                    border-radius: var(--radius-md);
                    padding: 0.5rem 0.5rem 0.5rem 2.25rem;
                    color: white;
                    font-size: 0.85rem;
                }

                .messages-scroll {
                    flex: 1;
                    overflow-y: auto;
                }

                .message-item {
                    padding: 1.25rem;
                    border-bottom: 1px solid var(--border-primary);
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .message-item:hover {
                    background: rgba(255, 255, 255, 0.03);
                }

                .message-item.active {
                    background: rgba(59, 130, 246, 0.08);
                    border-left: 3px solid var(--accent-primary);
                }

                .message-item.unread {
                    background: rgba(59, 130, 246, 0.03);
                }

                .message-item-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.4rem;
                }

                .sender-name {
                    font-weight: 700;
                    font-size: 0.9rem;
                    color: #fff;
                }

                .message-item.unread .sender-name::after {
                    content: '';
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    background: var(--accent-primary);
                    border-radius: 50%;
                    margin-left: 0.5rem;
                    vertical-align: middle;
                }

                .message-date {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                }

                .message-snippet {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-bottom: 0.75rem;
                }

                .status-pill {
                    font-size: 0.65rem;
                    padding: 0.2rem 0.6rem;
                    border-radius: 4px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-weight: 700;
                }

                .status-pill.new { background: rgba(59, 130, 246, 0.1); color: var(--accent-primary); }
                .status-pill.read { background: rgba(255, 255, 255, 0.05); color: var(--text-muted); }
                .status-pill.replied { background: rgba(16, 185, 129, 0.1); color: var(--accent-secondary); }

                /* Content Area */
                .inbox-content {
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-primary);
                    background: rgba(255, 255, 255, 0.02);
                    display: flex;
                    flex-direction: column;
                }

                .content-header {
                    padding: 1.5rem 2rem;
                    border-bottom: 1px solid var(--border-primary);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .sender-profile {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .avatar-placeholder {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: var(--bg-tertiary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--accent-primary);
                }

                .sender-info h2 {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin: 0;
                }

                .sender-email {
                    font-size: 0.85rem;
                    color: var(--accent-primary);
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .content-actions {
                    display: flex;
                    gap: 0.75rem;
                }

                .icon-btn {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--border-primary);
                    color: var(--text-muted);
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .icon-btn:hover {
                    color: white;
                    border-color: var(--text-muted);
                    background: rgba(255, 255, 255, 0.06);
                }

                .icon-btn.delete:hover {
                    color: var(--accent-danger);
                    background: rgba(239, 68, 68, 0.1);
                    border-color: rgba(239, 68, 68, 0.2);
                }

                .message-body {
                    padding: 2rem;
                    flex: 1;
                    overflow-y: auto;
                }

                .message-meta-strip {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-muted);
                    font-size: 0.8rem;
                    margin-bottom: 1.5rem;
                }

                .message-text {
                    font-size: 1rem;
                    line-height: 1.7;
                    color: var(--text-primary);
                    white-space: pre-wrap;
                }

                .reply-section {
                    padding: 1.5rem 2rem;
                    border-top: 1px solid var(--border-primary);
                    background: rgba(0, 0, 0, 0.2);
                }

                .reply-header {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    margin-bottom: 1rem;
                }

                .reply-header h3 {
                    font-size: 0.9rem;
                    font-weight: 700;
                }

                .reply-footer {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 1rem;
                }

                .empty-content, .empty-list, .loading-state {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted);
                    gap: 1rem;
                    text-align: center;
                    padding: 2rem;
                }

                .spin {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @media (max-width: 992px) {
                    .inbox-layout {
                        grid-template-columns: 1fr;
                    }
                    .inbox-list {
                        display: ${selectedMessage ? 'none' : 'flex'};
                    }
                    .inbox-content {
                        display: ${selectedMessage ? 'flex' : 'none'};
                    }
                }
            `}</style>
        </div>
    );
}
