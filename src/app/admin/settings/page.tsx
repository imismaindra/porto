import React from 'react';

export default function SettingsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Global Settings</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Configure website-wide metadata and contact information.</p>
        </div>
        <button className="btn btn-primary">Save All Settings</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* SEO Settings */}
        <div className="admin-card">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>SEO & Metadata</h2>
          <div className="form-group">
            <label className="form-label">Site Title</label>
            <input type="text" className="form-input" defaultValue="Indra - Professional Developer Portfolio" />
          </div>
          <div className="form-group">
            <label className="form-label">Meta Description</label>
            <textarea className="form-textarea" rows={3} defaultValue="Expert developer specializing in high-performance web applications and premium UI/UX design." />
          </div>
          <div className="form-group">
            <label className="form-label">Google Analytics ID</label>
            <input type="text" className="form-input" placeholder="G-XXXXXXXXXX" />
          </div>
        </div>

        {/* Contact Settings */}
        <div className="admin-card">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Contact Information</h2>
          <div className="form-group">
            <label className="form-label">Public Email</label>
            <input type="email" className="form-input" defaultValue="hello@indra.dev" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone / WhatsApp</label>
            <input type="text" className="form-input" defaultValue="+62 812 3456 7890" />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input type="text" className="form-input" defaultValue="Surabaya, Indonesia" />
          </div>
        </div>

        {/* Social Links */}
        <div className="admin-card">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Social Media Links</h2>
          <div className="form-group">
            <label className="form-label">GitHub URL</label>
            <input type="text" className="form-input" defaultValue="https://github.com/indra" />
          </div>
          <div className="form-group">
            <label className="form-label">LinkedIn URL</label>
            <input type="text" className="form-input" defaultValue="https://linkedin.com/in/indra" />
          </div>
          <div className="form-group">
            <label className="form-label">Twitter/X URL</label>
            <input type="text" className="form-input" defaultValue="https://x.com/indra" />
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="admin-card">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>System Controls</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Maintenance Mode</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Disable public access to the website.</p>
            </div>
            <div style={{ width: '40px', height: '20px', background: 'var(--bg-secondary)', borderRadius: '10px', position: 'relative', cursor: 'pointer', border: '1px solid var(--border-primary)' }}>
                <div style={{ position: 'absolute', left: '2px', top: '2px', width: '14px', height: '14px', background: 'var(--text-muted)', borderRadius: '50%' }}></div>
            </div>
          </div>
          <button className="btn btn-outline" style={{ width: '100%', marginTop: '1.5rem' }}>Purge System Cache</button>
        </div>
      </div>
    </div>
  );
}
