import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  Calendar, 
  Trash2, 
  AlertTriangle,
  Check,
  RotateCcw
} from 'lucide-react';

const TaskList = ({ 
  tasks, 
  onToggleTask, 
  onDeleteTask, 
  onEditTask,
  buttonThemeClass, // Dynamic button theme class passed from App.js
  iconThemeClass // Dynamic icon theme class passed from App.js
}) => {
  // Dynamic theme classes are now passed as props from App.js

  // Sort tasks by priority (high first), then deadline (earliest first), then status (pending first)
  const sortedTasks = [...tasks].sort((a, b) => {
    // Priority order: high = 3, medium = 2, low = 1
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityA = priorityOrder[a.priority || 'medium'];
    const priorityB = priorityOrder[b.priority || 'medium'];
    
    // First sort by priority (highest first)
    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }
    
    // Then sort by deadline (earliest first)
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);
    
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }
    
    // Finally, prioritize pending tasks over completed ones
    if (a.status === 'pending' && b.status === 'done') return -1;
    if (a.status === 'done' && b.status === 'pending') return 1;
    return 0;
  });

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: 'Overdue', className: 'text-red-600 dark:text-red-400', icon: AlertTriangle };
    } else if (diffDays === 0) {
      return { text: 'Due Today', className: 'text-orange-600 dark:text-orange-400', icon: AlertTriangle };
    } else if (diffDays === 1) {
      return { text: 'Due Tomorrow', className: 'text-yellow-600 dark:text-yellow-400', icon: Clock };
    } else if (diffDays <= 7) {
      return { text: `Due in ${diffDays} days`, className: 'text-blue-600 dark:text-blue-400', icon: Clock };
    } else {
      return { 
        text: date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }), 
        className: 'text-gray-600 dark:text-gray-400', 
        icon: Calendar 
      };
    }
  };

  const getStatusIcon = (status) => {
    return status === 'done' ? CheckCircle : Clock;
  };

  const getStatusColor = (status) => {
    return status === 'done' 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-yellow-600 dark:text-yellow-400';
  };

  // Function to get priority styling - color-coded tags for High/Medium/Low
  const getPriorityInfo = (priority = 'medium') => {
    switch (priority) {
      case 'high':
        return {
          text: 'High',
          className: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-700',
          icon: '🔴',
          textColor: 'text-red-600 dark:text-red-400'
        };
      case 'medium':
        return {
          text: 'Medium',
          className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
          icon: '🟡',
          textColor: 'text-yellow-600 dark:text-yellow-400'
        };
      case 'low':
        return {
          text: 'Low',
          className: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-700',
          icon: '🟢',
          textColor: 'text-green-600 dark:text-green-400'
        };
      default:
        return {
          text: 'Medium',
          className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
          icon: '🟡',
          textColor: 'text-yellow-600 dark:text-yellow-400'
        };
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="card p-8 text-center animate-fade-in">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <CheckCircle size={48} className="mx-auto opacity-50" />
        </div>
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
          No tasks yet
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          Start by adding your first task using the form above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tasks Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Your Tasks ({tasks.length})
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{tasks.filter(t => t.status === 'pending').length} Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle size={16} />
            <span>{tasks.filter(t => t.status === 'done').length} Done</span>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {sortedTasks.map((task, index) => {
          const deadlineInfo = formatDeadline(task.deadline);
          const StatusIcon = getStatusIcon(task.status);
          const DeadlineIcon = deadlineInfo.icon;
          const priorityInfo = getPriorityInfo(task.priority); // Get priority styling info

          return (
            <div
              key={task.id}
              className={`card p-4 transition-all duration-200 hover:shadow-lg animate-slide-in ${
                task.status === 'done' 
                  ? 'opacity-75 bg-gray-50 dark:bg-gray-700' 
                  : 'hover:scale-[1.02]'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <StatusIcon 
                      size={20} 
                      className={`${getStatusColor(task.status)} flex-shrink-0`} 
                    />
                    <h4 className={`font-medium text-gray-800 dark:text-gray-200 ${
                      task.status === 'done' ? 'line-through' : ''
                    }`}>
                      {task.title}
                    </h4>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm flex-wrap">
                    {/* Priority Tag - Color-coded by priority level */}
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityInfo.className}`}>
                      <span className="mr-1">{priorityInfo.icon}</span>
                      {priorityInfo.text} Priority
                    </div>
                    
                    {/* Deadline Information */}
                    <div className={`flex items-center gap-1 ${deadlineInfo.className}`}>
                      <DeadlineIcon size={14} />
                      <span>{deadlineInfo.text}</span>
                    </div>
                    
                    {/* Status Tag */}
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === 'done'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {task.status === 'done' ? 'Completed' : 'Pending'}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      task.status === 'done'
                        ? 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900'
                        : `text-gray-400 hover:${iconThemeClass} hover:bg-opacity-10`
                    }`}
                    title={task.status === 'done' ? 'Mark as Pending' : 'Mark as Done'}
                  >
                    {task.status === 'done' ? (
                      <RotateCcw size={16} />
                    ) : (
                      <Check size={16} />
                    )}
                  </button>
                  
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                    title="Delete Task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Progress Indicator for Pending Tasks */}
              {task.status === 'pending' && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span>In Progress</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tasks Summary */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {tasks.length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {tasks.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Pending</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {tasks.filter(t => t.status === 'done').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
