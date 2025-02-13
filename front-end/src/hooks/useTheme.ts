import { useEffect, useState } from 'react';

type Props = {
  defaultTheme?: 'light' | 'dark';
};
export const useTheme = ({ defaultTheme = 'light' }: Props) => {
  const [theme, setTheme] = useState(defaultTheme);

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
