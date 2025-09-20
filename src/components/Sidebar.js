import React, { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X,
  BookOpen,
  Briefcase,
  BarChart3,
  FolderPlus
} from 'lucide-react';

const Sidebar = ({ 
  categories, 
  activeCategory, 
  onCategorySelect, 
  onAddCategory, 
  onRenameCategory, 
  onDeleteCategory,
  buttonThemeClass, // Dynamic button theme class passed from App.js
  iconThemeClass // Dynamic icon theme class passed from App.js
}) => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');

  // Default category icons
  const getCategoryIcon = (categoryId) => {
    const iconMap = {
      'cat': BookOpen,
      'placements': Briefcase,
      'data-analytics': BarChart3
    };
    return iconMap[categoryId] || FolderPlus;
  };

  // Dynamic theme classes are now passed as props from App.js

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName('');
      setIsAddingCategory(false);
    }
  };

  const handleRenameCategory = (categoryId) => {
    if (editName.trim()) {
      onRenameCategory(categoryId, editName.trim());
      setEditingCategory(null);
      setEditName('');
    }
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? All tasks in this category will be deleted.')) {
      onDeleteCategory(categoryId);
    }
  };

  const startEditing = (category) => {
    setEditingCategory(category.id);
    setEditName(category.name);
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setEditName('');
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gradient">
          Personal Planner
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Organize your studies & career
        </p>
      </div>

      {/* Categories List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Categories
            </h2>
            <button
              onClick={() => setIsAddingCategory(true)}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Add Category"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Add Category Form */}
          {isAddingCategory && (
            <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg animate-slide-in">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
                className="input text-sm mb-2"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddCategory}
                  className={`btn btn-sm ${buttonThemeClass} flex-1`}
                >
                  <Check size={14} />
                  Add
                </button>
                <button
                  onClick={() => setIsAddingCategory(false)}
                  className="btn btn-sm btn-secondary"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Categories */}
          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.id);
              const isActive = activeCategory === category.id;
              const isEditing = editingCategory === category.id;

              return (
                <div key={category.id} className="group">
                  {isEditing ? (
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg animate-slide-in">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="input text-sm mb-2"
                        autoFocus
                        onKeyPress={(e) => e.key === 'Enter' && handleRenameCategory(category.id)}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRenameCategory(category.id)}
                          className={`btn btn-sm ${buttonThemeClass} flex-1`}
                        >
                          <Check size={14} />
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="btn btn-sm btn-secondary"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`sidebar-item ${isActive ? 'active' : ''} group`}
                      onClick={() => onCategorySelect(category.id)}
                    >
                      <Icon 
                        size={20} 
                        className={`mr-3 ${
                          isActive 
                            ? iconThemeClass 
                            : 'text-gray-500 dark:text-gray-400'
                        }`} 
                      />
                      <span className="flex-1 font-medium">{category.name}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">
                        {category.taskCount || 0}
                      </span>
                      
                      {/* Action buttons - show on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditing(category);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          title="Rename"
                        >
                          <Edit2 size={14} />
                        </button>
                        {category.id !== 'cat' && category.id !== 'placements' && category.id !== 'data-analytics' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCategory(category.id);
                            }}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
          Total Tasks: {categories.reduce((sum, cat) => sum + (cat.taskCount || 0), 0)}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
