CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    badge VARCHAR(100),
    sub_title VARCHAR(255),
    description TEXT,
    tags JSON,
    impact_value_1 VARCHAR(50),
    impact_label_1 VARCHAR(100),
    impact_value_2 VARCHAR(50),
    impact_label_2 VARCHAR(100),
    thumb_icon VARCHAR(100) DEFAULT 'fas fa-code',
    thumb_color VARCHAR(50) DEFAULT 'teal',
    detail_link VARCHAR(255) DEFAULT '#',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data
INSERT INTO projects (title, category, badge, sub_title, description, tags, impact_value_1, impact_label_1, thumb_icon, thumb_color) VALUES 
('Masjidina', 'saas', 'SaaS', 'Enterprise SaaS — Manajemen Masjid', 'Platform SaaS dengan dashboard manajemen keuangan dan donasi real-time untuk ratusan masjid di Indonesia.', '["Laravel", "MySQL", "Bootstrap"]', '100+', 'Masjid', 'fas fa-mosque', 'teal'),
('AI Reservation Engine', 'ai', 'AI / Bot', 'Chatbot AI — Industri F&B', 'Chatbot AI terintegrasi otomatis dengan sistem inventaris meja, mengurangi beban operasional staf restoran.', '["Node.js", "DialogFlow", "PostgreSQL"]', '↓40%', 'Beban Ops', 'fas fa-robot', 'amber');
