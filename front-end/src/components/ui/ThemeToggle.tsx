import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { useDashboardContext } from "../../layout/DashboardLayout";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useDashboardContext();

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer my-auto dark:text-white"
      aria-label={
        theme === "dark" ? "switch to light mode" : "switch to dark mode"
      }
    >
      {theme === "dark" ? (
        <BsFillSunFill className="" />
      ) : (
        <BsMoonFill className="" />
      )}
    </button>
  );
}
