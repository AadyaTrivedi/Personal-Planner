# Personal Planner - React Edition

A modern, responsive personal planner web application built with React and Tailwind CSS. Manage your CAT preparation, placements, and data analytics studies with a beautiful, customizable interface.

## ✨ Features

### 🎯 Core Functionality
- **Category Management**: Organize tasks into custom categories
- **Task Management**: Add, edit, delete, and mark tasks as complete
- **Smart Deadlines**: Visual indicators for overdue and upcoming tasks
- **Data Persistence**: All data saved locally using localStorage

### 🎨 Personalization
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Custom Accent Colors**: Choose from 5 beautiful color schemes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Delightful micro-interactions throughout

### 📱 User Experience
- **Sidebar Navigation**: Easy category switching with task counts
- **Task Cards**: Beautiful cards with status indicators and deadline info
- **Quick Actions**: One-click task completion and deletion
- **Empty States**: Helpful guidance when no tasks exist

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd react-planner
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application.

## 🛠️ Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

### Project Structure

```
react-planner/
├── public/
│   ├── index.html          # Main HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # React components
│   │   ├── Sidebar.js      # Category navigation sidebar
│   │   ├── TaskForm.js     # Add new task form
│   │   ├── TaskList.js     # Display and manage tasks
│   │   ├── ThemeToggle.js  # Dark/light mode toggle
│   │   └── ColorPicker.js  # Accent color selector
│   ├── App.js              # Main application component
│   ├── index.js            # React app entry point
│   └── index.css           # Tailwind CSS imports and custom styles
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Customization

### Adding New Accent Colors

1. **Update Tailwind Config** (`tailwind.config.js`):
   ```javascript
   colors: {
     accent: {
       // Add your custom color
       custom: {
         50: '#f0f9ff',
         500: '#0ea5e9',
         600: '#0284c7',
         // ... other shades
       }
     }
   }
   ```

2. **Update Color Picker** (`src/components/ColorPicker.js`):
   ```javascript
   const colors = [
     // Add your color
     { id: 'custom', name: 'Custom', class: 'bg-accent-custom-500', hex: '#0ea5e9' }
   ];
   ```

### Adding New Features

The app is built with a modular component architecture:

- **State Management**: All state is managed in `App.js` using React hooks
- **Data Persistence**: localStorage integration for data persistence
- **Styling**: Tailwind CSS with custom component classes
- **Icons**: Lucide React for consistent iconography

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Usage Guide

### Getting Started
1. **Choose a Category**: Click on CAT Prep, Placements, or Data Analytics in the sidebar
2. **Add Tasks**: Use the form to add new tasks with titles and deadlines
3. **Manage Tasks**: Mark tasks as complete or delete them as needed
4. **Customize**: Use the theme toggle and color picker in the top bar

### Creating Custom Categories
1. Click the "+" button next to "Categories" in the sidebar
2. Enter a category name and press Enter
3. Start adding tasks to your new category

### Personalization
- **Theme**: Click the sun/moon icon to toggle dark/light mode
- **Colors**: Click the palette icon to choose from 5 accent colors
- **Categories**: Right-click categories to rename or delete them

## 🔧 Technical Details

### Technologies Used
- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **localStorage**: Browser-based data persistence

### Key Features Implementation
- **State Management**: useState and useEffect hooks
- **Data Persistence**: Automatic localStorage synchronization
- **Responsive Design**: Mobile-first Tailwind CSS
- **Dark Mode**: CSS class-based theme switching
- **Animations**: CSS transitions and Tailwind animations

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Your app will be live!

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🔮 Future Enhancements

### Planned Features
- **Backend Integration**: Connect to a REST API or GraphQL
- **User Authentication**: Multi-user support with accounts
- **Cloud Sync**: Cross-device synchronization
- **Task Priorities**: High/Medium/Low priority levels
- **Due Date Reminders**: Browser notifications
- **Export/Import**: Backup and restore functionality
- **Team Collaboration**: Share categories with others
- **Analytics**: Progress tracking and insights

### Advanced Features
- **PWA Support**: Install as a mobile app
- **Offline Mode**: Work without internet connection
- **Keyboard Shortcuts**: Power user features
- **Bulk Operations**: Select and manage multiple tasks
- **Task Templates**: Quick task creation from templates
- **Time Tracking**: Track time spent on tasks

## 🐛 Troubleshooting

### Common Issues

**App won't start:**
- Ensure Node.js version 14+ is installed
- Delete `node_modules` and run `npm install` again
- Check for any error messages in the terminal

**Styles not loading:**
- Verify Tailwind CSS is properly configured
- Check that `index.css` imports Tailwind directives
- Ensure PostCSS is configured correctly

**Data not persisting:**
- Check browser localStorage is enabled
- Verify no browser extensions are blocking localStorage
- Try clearing browser cache and reloading

### Getting Help
- Check the browser console for error messages
- Verify all dependencies are installed correctly
- Ensure you're using a supported browser version

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ using React and Tailwind CSS**

*Happy planning! 🎯*
