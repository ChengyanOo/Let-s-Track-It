-- Create database
CREATE DATABASE IF NOT EXISTS task_app_db;

-- Use the database
USE task_app_db;

-- Create task_tracker table
CREATE TABLE IF NOT EXISTS task_tracker (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    task_name VARCHAR(255) NOT NULL,
    time_spent INT NOT NULL DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);