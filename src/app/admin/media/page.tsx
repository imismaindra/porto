import React from 'react';

export default function MediaPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Media Manager</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Upload and organize your project assets.</p>
        </div>
        <button className="btn btn-primary">
           <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload New Media
        </button>
      </header>

      <div className="admin-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{ 
            aspectRatio: '1', 
            background: 'var(--bg-tertiary)', 
            borderRadius: 'var(--radius-sm)', 
            border: '1px solid var(--border-primary)',
            position: 'relative',
            cursor: 'pointer',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}>
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2.032 2.032 0 012.828 0L16 16m-2-2l1.586-1.586a2.032 2.032 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
            </div>
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              padding: '0.5rem', 
              background: 'rgba(0,0,0,0.6)', 
              fontSize: '0.625rem',
              backdropFilter: 'blur(4px)'
            }}>
              project-thumb-{i+1}.webp
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
