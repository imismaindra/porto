import React from 'react';

const mockServices = [
  { id: 1, title: 'Frontend Development', description: 'Building responsive and interactive user interfaces.', order: 1, status: 'published' },
  { id: 2, title: 'Backend Systems', description: 'Scalable server-side logic and database architecture.', order: 2, status: 'published' },
  { id: 3, title: 'Mobile Solutions', description: 'Cross-platform mobile apps for iOS and Android.', order: 3, status: 'draft' },
];

export default function ServicesPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Services</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Define the solutions you offer to your clients.</p>
        </div>
        <button className="btn btn-primary">Add Service</button>
      </header>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Order</th>
              <th>Service Title</th>
              <th>Description</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockServices.map((service) => (
              <tr key={service.id}>
                <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>#{service.order}</td>
                <td><span style={{ fontWeight: 600 }}>{service.title}</span></td>
                <td style={{ maxWidth: '400px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{service.description}</td>
                <td><span className={`badge badge-${service.status}`}>{service.status}</span></td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button className="btn btn-outline" style={{ padding: '0.4rem' }}>Edit</button>
                    <button className="btn btn-danger" style={{ padding: '0.4rem' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
