'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export default function Topbar() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
            
            return (
              <React.Fragment key={segment}>
                {index > 0 && <span style={{ color: 'var(--text-muted)' }}>/</span>}
                <span style={{ 
                  color: isLast ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isLast ? 600 : 400
                }}>
                  {label}
                </span>
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--accent-danger)', borderRadius: '50%', border: '2px solid var(--bg-secondary)' }}></span>
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', border: '1px solid transparent' }} className="user-profile">
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Indra</p>
            <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>Super Admin</p>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.75rem' }}>
            IN
          </div>
        </div>
      </div>
    </header>
  );
}
