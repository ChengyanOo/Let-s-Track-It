import React, { useState } from 'react';
import { processTaskWithAI } from '../services/openaiService';
import { taskAPI } from '../services/apiService';

const TaskInput = ({ onTaskAdded }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [username, setUsername] = useState('User');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    try {
      const processedTask = await processTaskWithAI(input.trim());
      
      const taskData = {
        username: username,
        task_name: processedTask.task_name,
        description: processedTask.description,
        time_spent: 0
      };
      
      await taskAPI.createTask(taskData);
      setInput('');
      onTaskAdded();
    } catch (error) {
      console.error('Error creating task:', error);
      
      const fallbackTaskData = {
        username: username,
        task_name: input.trim().slice(0, 100),
        description: null,
        time_spent: 0
      };
      
      try {
        await taskAPI.createTask(fallbackTaskData);
        setInput('');
        onTaskAdded();
      } catch (fallbackError) {
        console.error('Fallback task creation failed:', fallbackError);
        alert('Failed to create task. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="task-input-container">
      <div className="username-input">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="username-field"
        />
      </div>
      
      <form onSubmit={handleSubmit} className="task-input-form">
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your task in natural language... (e.g., 'Work on the login feature for 2 hours')"
            className="task-input-field"
            disabled={isProcessing}
          />
          <button 
            type="submit" 
            className="add-task-btn"
            disabled={isProcessing || !input.trim()}
          >
            {isProcessing ? 'Processing...' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;