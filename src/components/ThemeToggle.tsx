import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg transition-colors dark:text-white hover:bg-gray-100 dark:hover:bg-dark-hover"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};