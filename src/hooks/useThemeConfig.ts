import { useCallback } from 'react';

interface ThemeConfig {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

export const useThemeConfig = () => {
  const updateThemeColors = useCallback((config: Partial<ThemeConfig>) => {
    const root = document.documentElement;

    if (config.primaryColor) {
      const color = config.primaryColor.trim();
      root.style.setProperty('--color-primary-500', color);
    }

    if (config.backgroundColor) {
      root.style.setProperty('--background-primary', config.backgroundColor);
    }

    if (config.textColor) {
      root.style.setProperty('--text-primary', config.textColor);
    }

    if (config.accentColor) {
      root.style.setProperty('--accent-color', config.accentColor);
    }
  }, []);

  return { updateThemeColors };
};