# React Personal Planner

## Overview
A beautiful personal planner web application built with React and Tailwind CSS. The app helps users organize their tasks across different categories like CAT preparation, placements, and data analytics studies.

## Features
- **Task Management**: Add, complete, and delete tasks across different categories
- **Multiple Categories**: Organize tasks into custom categories
- **Theme Customization**: 
  - Dark/light mode toggle
  - Multiple background themes (gradients and solid colors)
- **Responsive Design**: Clean, modern interface with Tailwind CSS
- **Local Storage**: Persistent data storage in browser
- **Custom Animations**: Smooth transitions and interactive elements

## Tech Stack
- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.0
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Development**: React Scripts

## Project Structure
- `src/App.js` - Main application component with state management
- `src/components/` - React components (Sidebar, TaskForm, TaskList, etc.)
- `src/index.css` - Tailwind CSS styles with custom component classes
- `public/` - Static assets and HTML template

## Development Setup
- **Host**: 0.0.0.0 (for Replit proxy compatibility)
- **Port**: 5000
- **Environment**: Configured for Replit with host header bypass

## Recent Changes
- September 20, 2025: Imported from GitHub and configured for Replit environment
- Fixed permissions for node_modules binaries
- Added cross-env dependency for environment variable management
- Configured React development server for Replit proxy system

## Architecture Decisions
- Uses localStorage for data persistence (no backend required)
- Component-based architecture with React hooks
- Custom Tailwind CSS classes for theme management
- Responsive design with mobile-first approach