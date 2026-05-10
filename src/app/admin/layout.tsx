import './admin.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <main className="content-body animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
