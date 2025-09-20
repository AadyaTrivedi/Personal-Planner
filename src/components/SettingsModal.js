import React from 'react';
import { X, Moon, Sun, Image, Edit3, FolderPlus, Check } from 'lucide-react';

const SettingsModal = ({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  onToggleTheme, 
  backgroundTheme, 
  onBackgroundThemeChange,
  categories,
  onRenameCategory,
  buttonThemeClass, // Dynamic button theme class passed from App.js
  iconThemeClass // Dynamic icon theme class passed from App.js
}) => {
  // Don't render if modal is not open
  if (!isOpen) return null;

  // Background theme options - this array defines all available background themes
  const backgroundThemes = [
    // Gradient themes
    { 
      id: 'gradient-purple', 
      name: 'Purple Gradient', 
      preview: 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600',
      description: 'Classic purple gradient'
    },
    { 
      id: 'gradient-blue', 
      name: 'Blue Gradient', 
      preview: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
      description: 'Ocean blue gradient'
    },
    { 
      id: 'gradient-green', 
      name: 'Green Gradient', 
      preview: 'bg-gradient-to-br from-green-400 via-green-500 to-green-600',
      description: 'Nature green gradient'
    },
    { 
      id: 'gradient-orange', 
      name: 'Orange Gradient', 
      preview: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600',
      description: 'Warm orange gradient'
    },
    { 
      id: 'gradient-pink', 
      name: 'Pink Gradient', 
      preview: 'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600',
      description: 'Soft pink gradient'
    },
    { 
      id: 'gradient-sunset', 
      name: 'Sunset Gradient', 
      preview: 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600',
      description: 'Beautiful sunset colors'
    },
    { 
      id: 'gradient-ocean', 
      name: 'Ocean Gradient', 
      preview: 'bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600',
      description: 'Deep ocean vibes'
    },
    { 
      id: 'gradient-forest', 
      name: 'Forest Gradient', 
      preview: 'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600',
      description: 'Forest green tones'
    },
    // Solid themes
    { 
      id: 'solid-gray', 
      name: 'Minimal Gray', 
      preview: 'bg-gray-100 dark:bg-gray-900',
      description: 'Clean minimal look'
    },
    { 
      id: 'solid-blue', 
      name: 'Soft Blue', 
      preview: 'bg-blue-50 dark:bg-blue-900',
      description: 'Calm blue background'
    },
    { 
      id: 'solid-green', 
      name: 'Soft Green', 
      preview: 'bg-green-50 dark:bg-green-900',
      description: 'Peaceful green background'
    },
    { 
      id: 'solid-purple', 
      name: 'Soft Purple', 
      preview: 'bg-purple-50 dark:bg-purple-900',
      description: 'Gentle purple background'
    }
  ];

  const currentTheme = backgroundThemes.find(theme => theme.id === backgroundTheme) || backgroundThemes[0];

  return (
    <>
      {/* Backdrop - click to close modal */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-bounce-in">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Settings
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Theme Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <Moon size={20} className="text-gray-600 dark:text-gray-400" />
                Appearance
              </h3>
              
              {/* Dark/Light Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  {isDarkMode ? (
                    <Moon size={20} className="text-yellow-500" />
                  ) : (
                    <Sun size={20} className="text-blue-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onToggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Background Themes Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <Image size={20} className="text-gray-600 dark:text-gray-400" />
                Background Themes
              </h3>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Choose your preferred background theme for the entire app
                </p>
                
                {/* Theme Swatches */}
                <div className="grid grid-cols-2 gap-3">
                  {backgroundThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => onBackgroundThemeChange(theme.id)}
                      className={`relative p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                        backgroundTheme === theme.id 
                          ? 'ring-2 ring-gray-400 dark:ring-gray-500 shadow-lg' 
                          : 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600'
                      }`}
                      title={theme.description}
                    >
                      {/* Theme Preview */}
                      <div className={`w-full h-16 rounded-lg ${theme.preview} shadow-sm mb-2`}></div>
                      
                      {/* Theme Name */}
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {theme.name}
                        </p>
                      </div>
                      
                      {/* Selection Indicator */}
                      {backgroundTheme === theme.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                          <Check size={12} className="text-green-600 dark:text-green-400 font-bold" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Current Theme Display */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${currentTheme.preview} shadow-sm border-2 border-white dark:border-gray-800`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Current: {currentTheme.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {currentTheme.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <Edit3 size={20} className="text-gray-600 dark:text-gray-400" />
                Categories
              </h3>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <div 
                    key={category.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FolderPlus size={16} className="text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">
                        {category.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                        {category.taskCount || 0} tasks
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const newName = prompt('Enter new category name:', category.name);
                        if (newName && newName.trim() && newName !== category.name) {
                          onRenameCategory(category.id, newName.trim());
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      title="Rename Category"
                    >
                      <Edit3 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className={`w-full btn ${buttonThemeClass}`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsModal;
