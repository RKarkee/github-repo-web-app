import React from "react";
// import { useTheme } from "../../hooks/useTheme";
import SearchContainer from "@/components/search";

const Home: React.FC = () => {
//   const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Git Explorer
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover, explore, and analyze GitHub repositories with powerful
            search capabilities and beautiful themes.
          </p>
        </div>

        {/* Theme Status Card */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Theme Configuration Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Current Settings
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center justify-between">
                  <span>Active Theme:</span>
                  <span className="font-medium capitalize bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-blue-800 dark:text-blue-200">
                    {theme}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Default Theme:</span>
                  <span className="font-medium">Light</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Persistence:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">✓ localStorage</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Auto Switch:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">✓ Working</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Features
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Header with logo and theme toggle
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Responsive design
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Smooth transitions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  App-wide theme application
                </li>
              </ul>
            </div>
          </div>
        </div> */}

        {/* Instructions */}
        {/* <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            How to Test Theme Functionality
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-blue-700 dark:text-blue-300">
            <li>Click the theme toggle icon (moon/sun) in the header</li>
            <li>Notice the entire app switches between light and dark themes</li>
            <li>Refresh the page - your theme preference is saved</li>
            <li>All colors, backgrounds, and text adapt automatically</li>
          </ol>
        </div> */}
        {/* Search Section */}
        <SearchContainer />
      </div>
    </div>
  );
};

export default Home;
