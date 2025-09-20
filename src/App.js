import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import SettingsModal from './components/SettingsModal';
import { Settings, Calendar } from 'lucide-react';

function App() {
  // State management
  const [categories, setCategories] = useState([
    { id: 'cat', name: 'CAT Preparation', taskCount: 0 },
    { id: 'placements', name: 'Placements', taskCount: 0 },
    { id: 'data-analytics', name: 'Data Analytics', taskCount: 0 }
  ]);
  
  const [activeCategory, setActiveCategory] = useState('cat');
  const [tasks, setTasks] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [backgroundTheme, setBackgroundTheme] = useState('gradient-purple'); // State for background theme
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State for Settings modal

  // Load data from localStorage on component mount
  useEffect(() => {
    loadDataFromStorage();
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    saveDataToStorage();
  }, [categories, tasks, isDarkMode, backgroundTheme]);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Load data from localStorage
  const loadDataFromStorage = () => {
    try {
      const savedCategories = localStorage.getItem('planner-categories');
      const savedTasks = localStorage.getItem('planner-tasks');
      const savedTheme = localStorage.getItem('planner-theme');
      const savedBackgroundTheme = localStorage.getItem('planner-background-theme');

      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
      
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
      
      if (savedTheme) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
      
      if (savedBackgroundTheme) {
        setBackgroundTheme(savedBackgroundTheme);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  };

  // Save data to localStorage
  const saveDataToStorage = () => {
    try {
      localStorage.setItem('planner-categories', JSON.stringify(categories));
      localStorage.setItem('planner-tasks', JSON.stringify(tasks));
      localStorage.setItem('planner-theme', JSON.stringify(isDarkMode));
      localStorage.setItem('planner-background-theme', backgroundTheme);
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  };

  // Update task counts for categories
  const updateTaskCounts = () => {
    setCategories(prevCategories => 
      prevCategories.map(category => ({
        ...category,
        taskCount: tasks[category.id]?.length || 0
      }))
    );
  };

  // Update task counts whenever tasks change
  useEffect(() => {
    updateTaskCounts();
  }, [tasks]);

  // Add new task
  const handleAddTask = (newTask) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [activeCategory]: [...(prevTasks[activeCategory] || []), newTask]
    }));
  };

  // Toggle task status
  const handleToggleTask = (taskId) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [activeCategory]: prevTasks[activeCategory]?.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'pending' ? 'done' : 'pending' }
          : task
      ) || []
    }));
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => ({
        ...prevTasks,
        [activeCategory]: prevTasks[activeCategory]?.filter(task => task.id !== taskId) || []
      }));
    }
  };

  // Add new category
  const handleAddCategory = (categoryName) => {
    const newCategory = {
      id: `category_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: categoryName,
      taskCount: 0
    };
    
    setCategories(prev => [...prev, newCategory]);
    setTasks(prev => ({ ...prev, [newCategory.id]: [] }));
  };

  // Rename category
  const handleRenameCategory = (categoryId, newName) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === categoryId 
          ? { ...category, name: newName }
          : category
      )
    );
  };

  // Delete category
  const handleDeleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(category => category.id !== categoryId));
    
    setTasks(prev => {
      const newTasks = { ...prev };
      delete newTasks[categoryId];
      return newTasks;
    });

    // Switch to first category if current category is deleted
    if (activeCategory === categoryId) {
      const remainingCategories = categories.filter(cat => cat.id !== categoryId);
      if (remainingCategories.length > 0) {
        setActiveCategory(remainingCategories[0].id);
      }
    }
  };

  // Toggle theme
  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Change background theme - this function updates the background theme
  const handleBackgroundThemeChange = (theme) => {
    setBackgroundTheme(theme);
  };

  // Toggle Settings modal
  const handleToggleSettings = () => {
    setIsSettingsOpen(prev => !prev);
  };

  // Close Settings modal
  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  // Get current category tasks
  const currentTasks = tasks[activeCategory] || [];
  const currentCategory = categories.find(cat => cat.id === activeCategory);

  // Get background theme class - this function returns the appropriate CSS class for the selected background theme
  const getBackgroundThemeClass = (theme) => {
    const themeMap = {
      'gradient-purple': 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600',
      'gradient-blue': 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
      'gradient-green': 'bg-gradient-to-br from-green-400 via-green-500 to-green-600',
      'gradient-orange': 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600',
      'gradient-pink': 'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600',
      'gradient-sunset': 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600',
      'gradient-ocean': 'bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600',
      'gradient-forest': 'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600',
      'solid-gray': 'bg-gray-100 dark:bg-gray-900',
      'solid-blue': 'bg-blue-50 dark:bg-blue-900',
      'solid-green': 'bg-green-50 dark:bg-green-900',
      'solid-purple': 'bg-purple-50 dark:bg-purple-900'
    };
    return themeMap[theme] || themeMap['gradient-purple'];
  };

  // Get button theme class - this function returns the appropriate CSS class for buttons based on the selected background theme
  const getButtonThemeClass = (theme) => {
    const buttonThemeMap = {
      // Gradient themes - buttons use the same gradient as background
      'gradient-purple': 'btn-theme-gradient-purple',
      'gradient-blue': 'btn-theme-gradient-blue',
      'gradient-green': 'btn-theme-gradient-green',
      'gradient-orange': 'btn-theme-gradient-orange',
      'gradient-pink': 'btn-theme-gradient-pink',
      'gradient-sunset': 'btn-theme-gradient-sunset',
      'gradient-ocean': 'btn-theme-gradient-ocean',
      'gradient-forest': 'btn-theme-gradient-forest',
      // Solid themes - buttons use complementary solid colors
      'solid-gray': 'btn-theme-solid-gray',
      'solid-blue': 'btn-theme-solid-blue',
      'solid-green': 'btn-theme-solid-green',
      'solid-purple': 'btn-theme-solid-purple'
    };
    return buttonThemeMap[theme] || buttonThemeMap['gradient-purple'];
  };

  // Get icon theme class - this function returns the appropriate CSS class for icons based on the selected background theme
  const getIconThemeClass = (theme) => {
    const iconThemeMap = {
      // Gradient themes - icons use the primary color of the gradient
      'gradient-purple': 'text-purple-600 dark:text-purple-400',
      'gradient-blue': 'text-blue-600 dark:text-blue-400',
      'gradient-green': 'text-green-600 dark:text-green-400',
      'gradient-orange': 'text-orange-600 dark:text-orange-400',
      'gradient-pink': 'text-pink-600 dark:text-pink-400',
      'gradient-sunset': 'text-orange-600 dark:text-orange-400',
      'gradient-ocean': 'text-blue-600 dark:text-blue-400',
      'gradient-forest': 'text-green-600 dark:text-green-400',
      // Solid themes - icons use complementary colors
      'solid-gray': 'text-gray-600 dark:text-gray-400',
      'solid-blue': 'text-blue-600 dark:text-blue-400',
      'solid-green': 'text-green-600 dark:text-green-400',
      'solid-purple': 'text-purple-600 dark:text-purple-400'
    };
    return iconThemeMap[theme] || iconThemeMap['gradient-purple'];
  };

  return (
    <div className={`min-h-screen ${getBackgroundThemeClass(backgroundTheme)} transition-all duration-500`}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
          onAddCategory={handleAddCategory}
          onRenameCategory={handleRenameCategory}
          onDeleteCategory={handleDeleteCategory}
          buttonThemeClass={getButtonThemeClass(backgroundTheme)}
          iconThemeClass={getIconThemeClass(backgroundTheme)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className={getIconThemeClass(backgroundTheme)} size={24} />
                <div>
                  <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {currentCategory?.name || 'Personal Planner'}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentTasks.length} tasks • {currentTasks.filter(t => t.status === 'pending').length} pending
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Settings Button - now functional */}
                <button
                  onClick={handleToggleSettings}
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                
                <ThemeToggle
                  isDarkMode={isDarkMode}
                  onToggle={handleToggleTheme}
                />
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6 max-w-4xl mx-auto">
              {/* Task Form */}
              <TaskForm
                onAddTask={handleAddTask}
                buttonThemeClass={getButtonThemeClass(backgroundTheme)}
                iconThemeClass={getIconThemeClass(backgroundTheme)}
              />

              {/* Task List */}
              <TaskList
                tasks={currentTasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                buttonThemeClass={getButtonThemeClass(backgroundTheme)}
                iconThemeClass={getIconThemeClass(backgroundTheme)}
              />
            </div>
          </main>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        backgroundTheme={backgroundTheme}
        onBackgroundThemeChange={handleBackgroundThemeChange}
        categories={categories}
        onRenameCategory={handleRenameCategory}
        buttonThemeClass={getButtonThemeClass(backgroundTheme)}
        iconThemeClass={getIconThemeClass(backgroundTheme)}
      />
    </div>
  );
}

export default App;
