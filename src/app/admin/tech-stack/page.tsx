import React from 'react';

const techStack = [
  { name: 'React', icon: '⚛️', color: '#61DAFB', active: true },
  { name: 'Next.js', icon: '▲', color: '#000000', active: true },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6', active: true },
  { name: 'Node.js', icon: 'JS', color: '#339933', active: true },
  { name: 'MySQL', icon: 'SQL', color: '#4479A1', active: true },
  { name: 'Tailwind CSS', icon: 'CSS', color: '#06B6D4', active: false },
];

export default function TechStackPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Tech Stack</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Master data for technologies you use.</p>
        </div>
        <button className="btn btn-primary">Add Tech</button>
      </header>

      <div className="admin-card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {techStack.map((tech) => (
            <div key={tech.name} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-primary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  background: 'var(--bg-secondary)', 
                  borderRadius: '4px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1rem',
                  border: `1px solid ${tech.color}40`
                }}>
                  {tech.icon}
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{tech.name}</span>
              </div>
              <div style={{ 
                width: '32px', 
                height: '16px', 
                background: tech.active ? 'var(--accent-secondary)' : 'var(--bg-secondary)', 
                borderRadius: '8px', 
                position: 'relative',
                cursor: 'pointer'
              }}>
                <div style={{ 
                  position: 'absolute', 
                  left: tech.active ? '18px' : '2px', 
                  top: '2px', 
                  width: '12px', 
                  height: '12px', 
                  background: 'white', 
                  borderRadius: '50%',
                  transition: 'left 0.2s'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
