import React from 'react';

const mockTestimonials = [
  { id: 1, name: 'Alex Rivera', role: 'CEO at TechFlow', content: 'Incredible work on our platform. The attention to detail and performance optimization was beyond our expectations.', rating: 5, status: 'published' },
  { id: 2, name: 'Mila Kunis', role: 'Product Manager', content: 'One of the best developers I have ever worked with. Highly recommended for any complex frontend projects.', rating: 5, status: 'published' },
];

export default function TestimonialsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Testimonials</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage client feedback and social proof.</p>
        </div>
        <button className="btn btn-primary">Add Testimonial</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {mockTestimonials.map((t) => (
          <div key={t.id} className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-tertiary)' }}></div>
                <div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{t.name}</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.role}</p>
                </div>
              </div>
              <span className={`badge badge-${t.status}`}>{t.status}</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{t.content}"</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-primary)' }}>
              <div style={{ display: 'flex', color: 'var(--accent-warning)' }}>
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-outline" style={{ padding: '0.4rem' }}>Edit</button>
                <button className="btn btn-danger" style={{ padding: '0.4rem' }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
