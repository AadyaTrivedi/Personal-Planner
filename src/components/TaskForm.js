import React, { useState } from 'react';
import { Plus, Calendar, CheckCircle, Flag, Repeat } from 'lucide-react';

const TaskForm = ({ onAddTask, buttonThemeClass, iconThemeClass }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium'); // New priority state
  const [recurring, setRecurring] = useState('none'); // New recurring state

  // Dynamic theme classes are now passed as props from App.js

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    if (!deadline) {
      alert('Please select a deadline');
      return;
    }

    const newTask = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: title.trim(),
      deadline,
      status,
      priority, // Add priority to task object
      recurring, // Add recurring to task object
      createdAt: new Date().toISOString()
    };

    onAddTask(newTask);
    
    // Reset form
    setTitle('');
    setDeadline('');
    setStatus('pending');
    setPriority('medium'); // Reset priority to default
    setRecurring('none'); // Reset recurring to default
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="card p-6 mb-6 animate-fade-in">
      <div className="flex items-center mb-4">
        <Plus className={`${iconThemeClass} mr-2`} size={20} />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Add New Task
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Title */}
        <div>
          <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Task Title
          </label>
          <input
            type="text"
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Complete Quantitative Aptitude Chapter 5"
            className="input"
            required
          />
        </div>

        {/* Deadline */}
        <div>
          <label htmlFor="task-deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar className="inline mr-1" size={16} />
            Deadline
          </label>
          <input
            type="date"
            id="task-deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={today}
            className="input"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="task-status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <CheckCircle className="inline mr-1" size={16} />
            Status
          </label>
          <select
            id="task-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input"
          >
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Priority Level */}
        <div>
          <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Flag className="inline mr-1" size={16} />
            Priority Level
          </label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="input"
          >
            <option value="high">🔴 High Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="low">🟢 Low Priority</option>
          </select>
        </div>

        {/* Recurring Options */}
        <div>
          <label htmlFor="task-recurring" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Repeat className="inline mr-1" size={16} />
            Recurring Pattern
          </label>
          <select
            id="task-recurring"
            value={recurring}
            onChange={(e) => setRecurring(e.target.value)}
            className="input"
          >
            <option value="none">⚪ No Repeat</option>
            <option value="daily">📅 Daily</option>
            <option value="weekly">📆 Weekly</option>
            <option value="monthly">🗓️ Monthly</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn ${buttonThemeClass} w-full flex items-center justify-center gap-2 hover:scale-105 transition-transform`}
        >
          <Plus size={18} />
          Add Task
        </button>
      </form>

      {/* Quick Add Tips */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <strong>Tip:</strong> Set realistic deadlines and break large tasks into smaller ones for better progress tracking.
        </p>
      </div>
    </div>
  );
};

export default TaskForm;
