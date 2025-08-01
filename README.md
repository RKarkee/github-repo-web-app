# GitHub Repository Explorer

A modern, responsive web application for searching and exploring GitHub repositories with detailed information and README rendering.

![GitHub Repository Explorer](https://img.shields.io/badge/React-19.x-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### 🔍 Repository Search
- **Advanced Search**: Search GitHub repositories with query parameters
- **Real-time Results**: Instant search results as you type
- **Sorting Options**: Sort by relevance, stars, forks, or last updated
- **Pagination**: Navigate through search results efficiently

### 📊 Repository Details
- **Comprehensive Info**: View repository statistics, languages, and metadata
- **README Rendering**: GitHub-flavored markdown rendering with syntax highlighting
- **Repository Stats**: Stars, forks, issues, watchers, and more
- **Owner Information**: Avatar, username, and profile links

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Responsive Design**: Mobile-first responsive layout
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: Graceful error messages and retry mechanisms

### 🔧 Technical Features
- **GitHub API v3**: Full integration with GitHub REST API
- **TypeScript**: Type-safe development with comprehensive interfaces
- **React Query**: Efficient data fetching, caching, and synchronization
- **Code Splitting**: Optimized bundle size with lazy loading
- **Modern React**: Hooks, context, and functional components

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn/pnpm equivalent)

### Installation

```bash
# Clone the repository
git clone https://github.com/RKarkee/github-repo-app.git
cd github-repo-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Optional: GitHub Personal Access Token for higher rate limits
VITE_GITHUB_API_BASE_URL='https://api.github.com' # Add this to your env file
```

> **Note**: The app works without a token but has lower rate limits (60 requests/hour vs 5000 requests/hour with token)

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.x** - Modern React with hooks and concurrent features
- **TypeScript 5.x** - Type-safe JavaScript development
- **Vite 5.x** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **CSS Variables** - Dynamic theming support

### State Management & Data Fetching
- **TanStack Query (React Query)** - Server state management
- **React Context** - Client state management (theme, etc.)

### Code Quality & Development
- **ESLint** - Code linting with TypeScript rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality

### Markdown Processing
- **react-markdown** - Markdown rendering
- **remark-gfm** - GitHub Flavored Markdown support
- **rehype-highlight** - Syntax highlighting for code blocks
- **highlight.js** - Code syntax highlighting

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (LoadingSpinner, etc.)
│   ├── readme/          # README rendering components
│   └── search/          # Search-related components
├── features/            # Feature-based modules
│   ├── repository/      # Repository-related features
│   │   ├── repositoryDetail/
│   │   ├── repositoryHeader/
│   │   └── repositoryStats/
│   └── search/          # Search functionality
├── hooks/               # Custom React hooks
├── services/            # API services and utilities
├── types/               # TypeScript type definitions
├── context/             # React context providers
└── utils/               # Utility functions
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript compiler check

# Testing
npm run test         # Run tests (if configured)
```

## 🌐 API Integration

### GitHub API v3 Endpoints Used

```typescript
// Search repositories
GET /search/repositories

// Get repository details
GET /repos/{owner}/{repo}

// Get repository README
GET /repos/{owner}/{repo}/readme

// Get repository languages
GET /repos/{owner}/{repo}/languages
```

### Rate Limiting
- **Without token**: 60 requests per hour per IP
- **With token**: 5,000 requests per hour per authenticated user

## 🎨 Theming

The application supports both light and dark themes with:
- System preference detection
- Manual theme toggle
- Persistent theme selection
- CSS custom properties for dynamic theming

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: 
  - `sm`: 640px and up
  - `md`: 768px and up
  - `lg`: 1024px and up
  - `xl`: 1280px and up

## 🔍 Search Features

### Query Parameters
- **Repository name/description search**
- **Language filtering**: `language:javascript`
- **Star count filtering**: `stars:>100`
- **Fork filtering**: `fork:true/false`
- **User/organization**: `user:username`





### Common Issues

**2. Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. TypeScript Errors**
```bash
# Run type checking
npm run type-check
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GitHub API** - For providing comprehensive repository data
- **React Community** - For amazing ecosystem and tools
- **Tailwind CSS** - For utility-first CSS framework
- **Lucide Icons** - For beautiful icon library

## 📧 Contact

- **GitHub**: [@RKarkee](https://github.com/RKarkee)
- **Email**: rajankarkee01@gmail.com

