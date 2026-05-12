-- Database for Portfolio
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Table: Users (for Authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Hero Content
CREATE TABLE IF NOT EXISTS hero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    greeting VARCHAR(255) DEFAULT 'Hi, I am',
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    description TEXT,
    resume_link VARCHAR(255),
    profile_image VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: Projects
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
    image VARCHAR(255),
    detail_link VARCHAR(255) DEFAULT '#',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Services
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100),
    comment TEXT NOT NULL,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(50) NOT NULL UNIQUE,
    `value` TEXT,
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Default Admin (Password: admin123)
INSERT INTO users (username, password, full_name) VALUES 
('admin', '$2b$10$j6evtDYkfKYoLcZ6LC/1E.ydDHrhyBebplC2bARQPbE12ntZJUkIG', 'Administrator');

-- Insert Initial Hero Data
INSERT INTO hero (name, role, description) VALUES 
('Imis Maindra', 'Fullstack Developer', 'Building premium web experiences with modern technologies.');

-- Insert Initial Services
INSERT INTO services (title, icon, description) VALUES 
('Web Development', 'fas fa-code', 'Custom websites built with Next.js and React.'),
('UI/UX Design', 'fas fa-paint-brush', 'Modern and interactive user interfaces.'),
('Mobile Development', 'fas fa-mobile-alt', 'Cross-platform mobile apps with Flutter.');

-- Insert Initial Testimonials
INSERT INTO testimonials (name, role, comment) VALUES 
('John Doe', 'CEO of TechCorp', 'Imis delivered an amazing portfolio site for our team.'),
('Jane Smith', 'Product Manager', 'Very professional and responsive developer.');

-- Insert Initial Site Settings
INSERT INTO site_settings (`key`, `value`, `description`) VALUES 
('site_name', 'Porto Imis', 'Name of the website'),
('contact_email', 'imis@example.com', 'Primary contact email'),
('whatsapp_number', '628123456789', 'WhatsApp contact number'),
('footer_text', '© 2026 Imis Maindra. All rights reserved.', 'Footer copyright text');

-- Table: Messages (Inquiries)
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(100) NOT NULL,
    sender_email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Visitor Logs
CREATE TABLE IF NOT EXISTS visitor_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45),
    user_agent TEXT,
    page_path VARCHAR(255),
    session_id VARCHAR(100),
    referer TEXT,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
