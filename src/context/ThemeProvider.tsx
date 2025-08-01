import React from "react";
import { Theme, ThemeContext } from "../hooks/useTheme";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_THEME_KEY } from "../constants";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize with light theme as default, then check localStorage
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    return saved === "dark" || saved === "light" ? saved : "dark";
  });

  useEffect(() => {
    // Apply theme class to document
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;