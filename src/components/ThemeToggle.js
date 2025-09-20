import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? (
        <Sun size={20} className="text-yellow-500" />
      ) : (
        <Moon size={20} className="text-blue-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
