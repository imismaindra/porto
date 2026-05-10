import React from 'react';

const mockProjects = [
  { id: 1, title: 'Premium Portfolio UI', category: 'Web Design', tech: ['Next.js', 'Framer Motion'], status: 'published', year: '2024' },
  { id: 2, title: 'E-Commerce Dashboard', category: 'Web App', tech: ['React', 'Node.js'], status: 'published', year: '2023' },
  { id: 3, title: 'Crypto Tracker Mobile', category: 'Mobile App', tech: ['React Native', 'Firebase'], status: 'draft', year: '2024' },
  { id: 4, title: 'AI Content Generator', category: 'SAAS', tech: ['Python', 'OpenAI'], status: 'published', year: '2023' },
];

export default function ProjectsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Projects Portfolio</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage your portfolio projects and case studies.</p>
        </div>
        <button className="btn btn-primary">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Project
        </button>
      </header>

      {/* Filter Bar */}
      <div className="admin-card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <svg style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search projects..." 
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <select className="form-select" style={{ width: '150px' }}>
          <option>All Categories</option>
          <option>Web Design</option>
          <option>Web App</option>
          <option>Mobile App</option>
        </select>
        <select className="form-select" style={{ width: '130px' }}>
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>

      {/* Projects Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}><input type="checkbox" /></th>
              <th>Project Details</th>
              <th>Category</th>
              <th>Tech Stack</th>
              <th>Year</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProjects.map((project) => (
              <tr key={project.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '32px', borderRadius: '4px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}></div>
                    <span style={{ fontWeight: 600 }}>{project.title}</span>
                  </div>
                </td>
                <td>{project.category}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                    {project.tech.map(t => (
                      <span key={t} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid var(--border-primary)' }}>{t}</span>
                    ))}
                  </div>
                </td>
                <td>{project.year}</td>
                <td>
                  <span className={`badge badge-${project.status}`}>
                    {project.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button className="btn btn-outline" style={{ padding: '0.4rem' }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="btn btn-danger" style={{ padding: '0.4rem' }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <span>Showing 4 of 12 projects</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline" disabled>Previous</button>
          <button className="btn btn-outline">Next</button>
        </div>
      </div>
    </div>
  );
}
