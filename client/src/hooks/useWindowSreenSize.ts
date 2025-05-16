import { useEffect, useState } from 'react';
type Breakpoints = {
  [key: string]: { min: number; max: number };
};
export default function useWindowScreenSize() {
  const [currentBreakPoint, setCurrentBreakPoint] = useState('');

  function resizeHandler() {
    const sizes: Breakpoints = {
      sm: { min: 0, max: 639 },
      md: { min: 640, max: 767 },
      lg: { min: 768, max: 1023 },
      xl: { min: 1024, max: 1279 },
      '2xl': { min: 1280, max: Infinity },
    };
    const width = window.innerWidth;
    let matchedBreakPoint = '';

    Object.keys(sizes).forEach((key) => {
      if (width >= sizes[key].min && width <= sizes[key].max) {
        matchedBreakPoint = key;
      }
    });
    setCurrentBreakPoint(matchedBreakPoint);
  }

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return currentBreakPoint;
}
