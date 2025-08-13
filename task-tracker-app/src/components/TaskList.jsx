import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onTaskUpdate, onTaskDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks yet. Add a task below to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onTaskUpdate}
          onDelete={onTaskDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;