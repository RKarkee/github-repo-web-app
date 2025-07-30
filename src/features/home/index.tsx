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

        {/* Search Section */}
        <SearchContainer />
      </div>
    </div>
  );
};

export default Home;
