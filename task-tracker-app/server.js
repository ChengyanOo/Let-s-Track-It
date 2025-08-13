import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'task_app_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/api/tasks', (req, res) => {
  const query = 'SELECT * FROM task_tracker ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Fetched tasks:', results);
    res.json(results);
  });
});

app.post('/api/tasks', (req, res) => {
  const { username, task_name, description, time_spent = 0 } = req.body;
  
  if (!username || !task_name) {
    return res.status(400).json({ error: 'Username and task_name are required' });
  }

  const query = 'INSERT INTO task_tracker (username, task_name, description, time_spent) VALUES (?, ?, ?, ?)';
  db.query(query, [username, task_name, description, time_spent], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, message: 'Task created successfully' });
  });
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { time_spent, task_name, description } = req.body;
  
  const query = 'UPDATE task_tracker SET time_spent = ?, task_name = ?, description = ? WHERE id = ?';
  db.query(query, [time_spent, task_name, description, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task updated successfully' });
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM task_tracker WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});