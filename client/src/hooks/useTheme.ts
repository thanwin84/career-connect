import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme ? savedTheme : 'light';
  });

  function toggleTheme() {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.classList.remove('light', 'dark');
      htmlElement.classList.add(theme);
    }
    localStorage.setItem('themeMode', theme);
  }, [theme]);

  return {
    theme,
    toggleTheme,
  };
};
