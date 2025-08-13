# Task Tracker Timer App

A React SPA for tracking tasks with natural language input and built-in timers. Tasks are processed using ChatGPT API and stored in a MySQL database.

## Features

- 🎯 Natural language task input powered by ChatGPT API
- ⏱️ Built-in timer for each task
- 📊 Task tracking with time spent
- 💾 MySQL database storage
- 📱 Responsive design
- 🚀 Real-time timer updates

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL server
- OpenAI API key

### 1. Database Setup

1. Start your MySQL server
2. Run the database setup script:
   ```sql
   mysql -u root -p < database.sql
   ```
   
   Or manually create the database:
   ```sql
   CREATE DATABASE IF NOT EXISTS task_app_db;
   USE task_app_db;
   
   CREATE TABLE IF NOT EXISTS task_tracker (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(100) NOT NULL,
       task_name VARCHAR(255) NOT NULL,
       time_spent INT NOT NULL DEFAULT 0,
       description TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

### 2. Environment Configuration

1. Copy the `.env` file and update the values:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=task_app_db
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   ```

2. For the frontend, create `.env.local` with:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

### 3. Installation

```bash
npm install
```

### 4. Running the Application

#### Development Mode

Terminal 1 - Backend Server:
```bash
npm run server
```

Terminal 2 - Frontend Development Server:
```bash
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Usage

1. **Set Username**: Enter your username in the top field
2. **Add Task**: Type a task description in natural language (e.g., "Work on user authentication for the next 2 hours")
3. **Start Timer**: Click "Start" to begin timing the task
4. **Stop Timer**: Click "Stop" to pause the timer and save progress
5. **Delete Task**: Click "Delete" to remove a task

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure

```
task-tracker-app/
├── src/
│   ├── components/
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskInput.jsx
│   ├── services/
│   │   ├── apiService.js
│   │   └── openaiService.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── server.js
├── database.sql
├── .env
└── package.json
```

## Technologies Used

- **Frontend**: React, Vite, Axios
- **Backend**: Node.js, Express
- **Database**: MySQL
- **AI**: OpenAI GPT-3.5-turbo
- **Styling**: CSS3 with responsive design

## Notes

- Timers run in real-time and persist timer state
- Tasks are automatically saved to the database when timer is stopped
- The app includes fallback functionality if the OpenAI API is unavailable
- Mobile-responsive design for use on various devices
