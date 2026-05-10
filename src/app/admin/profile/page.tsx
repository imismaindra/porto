import React from 'react';

export default function ProfilePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Hero & Profile</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage the main content of your landing page.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline">Discard Changes</button>
          <button className="btn btn-primary">Save Configuration</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Main Content Card */}
          <div className="admin-card">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Hero Section</h2>
            <div className="form-group">
              <label className="form-label">Main Headline</label>
              <input type="text" className="form-input" defaultValue="Building Digital Excellence & Innovation" />
            </div>
            <div className="form-group">
              <label className="form-label">Sub-headline / Description</label>
              <textarea className="form-textarea" rows={4} defaultValue="Highly skilled Full-stack Developer with over 5 years of experience in building scalable web applications and premium digital experiences." />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Primary CTA Text</label>
                <input type="text" className="form-input" defaultValue="View My Work" />
              </div>
              <div className="form-group">
                <label className="form-label">Primary CTA Link</label>
                <input type="text" className="form-input" defaultValue="#projects" />
              </div>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="admin-card">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Statistics (Numbers)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Years Experience</label>
                <input type="number" className="form-input" defaultValue={5} />
              </div>
              <div className="form-group">
                <label className="form-label">Projects Completed</label>
                <input type="number" className="form-input" defaultValue={50} />
              </div>
              <div className="form-group">
                <label className="form-label">Happy Clients</label>
                <input type="number" className="form-input" defaultValue={30} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Status & Preview */}
          <div className="admin-card">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Status</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Public Visibility</span>
              <div style={{ width: '40px', height: '20px', background: 'var(--accent-secondary)', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', right: '2px', top: '2px', width: '16px', height: '16px', background: 'white', borderRadius: '50%' }}></div>
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Last updated: May 10, 2026 14:30</p>
          </div>

          {/* Media Card */}
          <div className="admin-card">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Profile Image</h2>
            <div style={{ 
              width: '100%', 
              aspectRatio: '1', 
              background: 'var(--bg-tertiary)', 
              borderRadius: 'var(--radius-md)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px dashed var(--border-secondary)',
              marginBottom: '1rem',
              overflow: 'hidden'
            }}>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                 <svg style={{ marginBottom: '0.5rem' }} width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2.032 2.032 0 012.828 0L16 16m-2-2l1.586-1.586a2.032 2.032 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
                 <p style={{ fontSize: '0.75rem' }}>Click to upload image</p>
              </div>
            </div>
            <button className="btn btn-outline" style={{ width: '100%' }}>Change Media</button>
          </div>
        </div>
      </div>
    </div>
  );
}
