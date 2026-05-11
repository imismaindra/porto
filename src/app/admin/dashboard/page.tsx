"use client";
import React from 'react';
import { 
    BarChart3, 
    Briefcase, 
    ShieldCheck, 
    Users, 
    MessageSquare, 
    Zap, 
    ArrowUpRight, 
    Activity, 
    HardDrive,
    Globe,
    Cpu,
    ArrowRight
} from 'lucide-react';

const stats = [
    { label: 'Total Projects', value: '12', icon: <Briefcase size={24} />, color: '#3b82f6', trend: '+2 this month' },
    { label: 'Active Services', value: '6', icon: <Zap size={24} />, color: '#10b981', trend: 'Stable' },
    { label: 'New Messages', value: '4', icon: <MessageSquare size={24} />, color: '#f59e0b', trend: 'Requires action' },
    { label: 'Testimonials', value: '8', icon: <Users size={24} />, color: '#8b5cf6', trend: '+1 this week' },
];

export default function DashboardAdmin() {
    return (
        <div className="admin-container">
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Command Center</h1>
                    <p className="admin-subtitle">Welcome back, Indra. Here's what's happening with your portfolio.</p>
                </div>
                <div className="current-status">
                    <div className="status-badge live">
                        <div className="pulse-dot"></div>
                        <span>System Live</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat) => (
                    <div key={stat.label} className="stat-card glass">
                        <div className="stat-icon-box" style={{ background: `${stat.color}15`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <p className="stat-label">{stat.label}</p>
                            <h3 className="stat-value">{stat.value}</h3>
                            <p className="stat-trend">
                                <ArrowUpRight size={14} />
                                <span>{stat.trend}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                {/* Recent Activity */}
                <div className="activity-panel glass">
                    <div className="panel-header">
                        <div className="panel-title">
                            <Activity size={20} />
                            <h2>Recent Activity</h2>
                        </div>
                        <button className="text-link">View All</button>
                    </div>
                    <div className="activity-list">
                        {[
                            { title: 'Project Updated', desc: 'E-Commerce Mobile App', time: '2 hours ago', type: 'update' },
                            { title: 'New Message', desc: 'From John Doe regarding Project X', time: '5 hours ago', type: 'message' },
                            { title: 'Service Added', desc: 'Cloud Infrastructure Management', time: 'Yesterday', type: 'add' },
                            { title: 'Profile Sync', desc: 'Updated Hero Section content', time: '2 days ago', type: 'system' },
                        ].map((item, i) => (
                            <div key={i} className="activity-item">
                                <div className={`activity-indicator ${item.type}`}></div>
                                <div className="activity-content">
                                    <p className="activity-title">{item.title}</p>
                                    <p className="activity-desc">{item.desc}</p>
                                    <p className="activity-time">{item.time}</p>
                                </div>
                                <ArrowRight size={14} className="activity-arrow" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Health */}
                <div className="health-panel glass">
                    <div className="panel-header">
                        <div className="panel-title">
                            <ShieldCheck size={20} />
                            <h2>System Health</h2>
                        </div>
                    </div>
                    <div className="health-metrics">
                        <div className="metric-item">
                            <div className="metric-info">
                                <div className="metric-label">
                                    <HardDrive size={16} />
                                    <span>Storage Usage</span>
                                </div>
                                <span className="metric-value">45%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '45%' }}></div>
                            </div>
                        </div>

                        <div className="metric-item">
                            <div className="metric-info">
                                <div className="metric-label">
                                    <Cpu size={16} />
                                    <span>Server Load</span>
                                </div>
                                <span className="metric-value">12%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill success" style={{ width: '12%' }}></div>
                            </div>
                        </div>

                        <div className="status-cards">
                            <div className="small-status-card">
                                <Globe size={18} />
                                <div>
                                    <p>Vercel Edge</p>
                                    <span className="status-online">Online</span>
                                </div>
                            </div>
                            <div className="small-status-card">
                                <HardDrive size={18} />
                                <div>
                                    <p>MySQL DB</p>
                                    <span className="status-online">Healthy</span>
                                </div>
                            </div>
                        </div>

                        <div className="version-info">
                            <span>Porto Admin v2.5.0</span>
                            <span className="update-tag">Latest</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .stat-card {
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-primary);
                    background: rgba(255, 255, 255, 0.02);
                    transition: all 0.3s ease;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--accent-primary);
                }

                .stat-icon-box {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .stat-info {
                    flex: 1;
                }

                .stat-label {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.25rem;
                }

                .stat-value {
                    font-size: 1.75rem;
                    font-weight: 800;
                    margin: 0;
                }

                .stat-trend {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    font-size: 0.75rem;
                    color: var(--accent-secondary);
                    margin-top: 0.25rem;
                }

                .dashboard-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 1.5rem;
                }

                .panel-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem 2rem;
                    border-bottom: 1px solid var(--border-primary);
                }

                .panel-title {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: white;
                }

                .panel-title h2 {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin: 0;
                }

                .text-link {
                    background: transparent;
                    border: none;
                    color: var(--accent-primary);
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                }

                .activity-list {
                    padding: 1rem;
                }

                .activity-item {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    padding: 1rem;
                    border-radius: var(--radius-md);
                    transition: all 0.2s;
                    cursor: pointer;
                }

                .activity-item:hover {
                    background: rgba(255, 255, 255, 0.03);
                }

                .activity-indicator {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                .activity-indicator.update { background: var(--accent-primary); box-shadow: 0 0 10px var(--accent-primary); }
                .activity-indicator.message { background: var(--accent-warning); box-shadow: 0 0 10px var(--accent-warning); }
                .activity-indicator.add { background: var(--accent-secondary); box-shadow: 0 0 10px var(--accent-secondary); }
                .activity-indicator.system { background: #8b5cf6; box-shadow: 0 0 10px #8b5cf6; }

                .activity-content {
                    flex: 1;
                }

                .activity-title {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: white;
                    margin-bottom: 0.15rem;
                }

                .activity-desc {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                }

                .activity-time {
                    font-size: 0.7rem;
                    color: var(--text-muted);
                    margin-top: 0.25rem;
                }

                .activity-arrow {
                    color: var(--text-muted);
                    opacity: 0;
                    transition: all 0.2s;
                }

                .activity-item:hover .activity-arrow {
                    opacity: 1;
                    transform: translateX(4px);
                }

                /* Health Metrics */
                .health-metrics {
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.75rem;
                }

                .metric-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                }

                .metric-label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                }

                .metric-value {
                    font-weight: 700;
                    font-size: 0.85rem;
                }

                .progress-bar {
                    height: 8px;
                    background: var(--bg-tertiary);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: var(--accent-primary);
                    border-radius: 4px;
                }

                .progress-fill.success { background: var(--accent-secondary); }

                .status-cards {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .small-status-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--border-primary);
                    padding: 0.75rem;
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .small-status-card p {
                    font-size: 0.75rem;
                    font-weight: 600;
                    margin: 0;
                }

                .status-online {
                    font-size: 0.65rem;
                    color: var(--accent-secondary);
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .version-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1rem;
                    border-top: 1px solid var(--border-primary);
                    font-size: 0.75rem;
                    color: var(--text-muted);
                }

                .update-tag {
                    background: rgba(16, 185, 129, 0.1);
                    color: var(--accent-secondary);
                    padding: 0.1rem 0.5rem;
                    border-radius: 4px;
                    font-weight: 700;
                }

                .pulse-dot {
                    width: 8px;
                    height: 8px;
                    background: var(--accent-secondary);
                    border-radius: 50%;
                    position: relative;
                }

                .pulse-dot::after {
                    content: '';
                    position: absolute;
                    inset: -4px;
                    border: 2px solid var(--accent-secondary);
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.8; }
                    100% { transform: scale(2.5); opacity: 0; }
                }

                .status-badge.live {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    background: rgba(16, 185, 129, 0.1);
                    padding: 0.5rem 1rem;
                    border-radius: 100px;
                    border: 1px solid rgba(16, 185, 129, 0.2);
                    color: var(--accent-secondary);
                    font-weight: 700;
                    font-size: 0.8rem;
                }

                @media (max-width: 992px) {
                    .dashboard-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}

