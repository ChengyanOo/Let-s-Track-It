import React, { useState, useEffect, useRef } from 'react';
import { taskAPI } from '../services/apiService';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(task.time_spent || 0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStop = async () => {
    if (isRunning) {
      setIsRunning(false);
      try {
        await taskAPI.updateTask(task.id, {
          ...task,
          time_spent: currentTime
        });
        onUpdate();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    } else {
      setIsRunning(true);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(task.id);
        onDelete();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <h3 className="task-name">{task.task_name}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className="task-username">@{task.username}</span>
          <span className="task-created">
            Created: {new Date(task.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="task-timer">
        <div className="timer-display">
          <span className="timer-time">{formatTime(currentTime)}</span>
          <span className={`timer-status ${isRunning ? 'running' : 'stopped'}`}>
            {isRunning ? 'RUNNING' : 'STOPPED'}
          </span>
        </div>
        
        <div className="task-actions">
          <button
            className={`timer-btn ${isRunning ? 'stop' : 'start'}`}
            onClick={handleStartStop}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;