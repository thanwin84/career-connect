import { useDashboardContext } from "../../contexts/dashboardContext";
import { useWindowScreenSize } from "../../hooks";
import { Logo } from "../ui";
import UserDashboardLinks from "./UserDashboardLinks";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
};

export default function BigSidebar({ className }: Props) {
  const { showBigSidebar } = useDashboardContext();
  const currentSize = useWindowScreenSize();

  if (currentSize === "sm") {
    return null;
  }

  return (
    <aside
      className={`border-r dark:border-none dark:bg-zinc-800 h-screen ${className}`}
    >
      {showBigSidebar && (
        <section className={`w-full p-4 `}>
          <Link to="../">
            <Logo className="w-44 pb-14 pt-4" />
          </Link>
          <UserDashboardLinks className="pt-8" />
        </section>
      )}
    </aside>
  );
}
