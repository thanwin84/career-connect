import { BsFillSunFill, BsMoonFill } from 'react-icons/bs';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { toggleTheme, theme } = useTheme({ defaultTheme: 'light' });
  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer my-auto dark:text-white"
      aria-label={
        theme === 'dark' ? 'switch to light mode' : 'switch to dark mode'
      }
    >
      {theme === 'dark' ? (
        <BsFillSunFill className="" />
      ) : (
        <BsMoonFill className="" />
      )}
    </button>
  );
}
