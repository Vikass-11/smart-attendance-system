import { useEffect, useState } from 'react';
import { applyTheme, getInitialTheme } from '../lib/theme';

export function useTheme() {
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  return { darkMode, toggleTheme };
}
