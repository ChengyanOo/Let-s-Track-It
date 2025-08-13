import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import TaskInput from './components/TaskInput'
import { taskAPI } from './services/apiService'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await taskAPI.getAllTasks()
      setTasks(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching tasks:', err)
      setError('Failed to load tasks. Please make sure the server is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleTaskAdded = () => {
    fetchTasks()
  }

  const handleTaskUpdate = () => {
    fetchTasks()
  }

  const handleTaskDelete = () => {
    fetchTasks()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Tracker Timer</h1>
        <p>Track your tasks with natural language input and built-in timers</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList 
            tasks={tasks}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
          />
        )}
      </main>

      <footer className="app-footer">
        <TaskInput onTaskAdded={handleTaskAdded} />
      </footer>
    </div>
  )
}

export default App
