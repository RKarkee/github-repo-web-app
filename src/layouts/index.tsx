import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
