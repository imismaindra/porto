import React from 'react';

const mockMessages = [
  { id: 1, sender: 'John Doe', email: 'john@example.com', message: 'I would like to discuss a project with you.', status: 'new', date: '2026-05-10 10:00' },
  { id: 2, sender: 'Sarah Smith', email: 'sarah@design.co', message: 'Your portfolio looks amazing! Are you available for freelance?', status: 'read', date: '2026-05-09 15:30' },
  { id: 3, sender: 'Michael Brown', email: 'm.brown@tech.com', message: 'Sent you a message on LinkedIn as well.', status: 'replied', date: '2026-05-08 09:15' },
];

export default function MessagesPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Inbox</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>View and manage messages from your contact form.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem', height: 'calc(100vh - 250px)' }}>
        {/* Messages List */}
        <div className="admin-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-primary)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600 }}>All Messages</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>3 Messages</span>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {mockMessages.map((msg) => (
              <div key={msg.id} style={{ 
                padding: '1rem', 
                borderBottom: '1px solid var(--border-primary)', 
                cursor: 'pointer',
                background: msg.status === 'new' ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                transition: 'background 0.2s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{msg.sender}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{msg.date.split(' ')[0]}</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.message}</p>
                <div style={{ marginTop: '0.5rem' }}>
                  <span style={{ 
                    fontSize: '0.625rem', 
                    padding: '0.1rem 0.4rem', 
                    borderRadius: '4px', 
                    background: msg.status === 'new' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                    color: msg.status === 'new' ? 'white' : 'var(--text-secondary)'
                  }}>
                    {msg.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail View */}
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ borderBottom: '1px solid var(--border-primary)', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>John Doe</h2>
                <p style={{ color: 'var(--accent-primary)', fontSize: '0.875rem' }}>john@example.com</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-outline" style={{ padding: '0.4rem' }}>Reply Email</button>
                <button className="btn btn-danger" style={{ padding: '0.4rem' }}>Delete</button>
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Received on May 10, 2026 at 10:00 AM</p>
          </div>

          <div style={{ flex: 1, color: 'var(--text-primary)', lineHeight: '1.6', fontSize: '0.9375rem' }}>
            I would like to discuss a project with you. I've been following your work for a while and I am impressed with your portfolio. 
            We are looking for a developer to help us rebuild our corporate website using Next.js.
            <br /><br />
            Let me know if you are available for a quick call this week.
          </div>

          <div style={{ borderTop: '1px solid var(--border-primary)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>Quick Reply</h3>
            <textarea className="form-textarea" rows={4} placeholder="Type your response here..."></textarea>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button className="btn btn-primary">Send Response</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
