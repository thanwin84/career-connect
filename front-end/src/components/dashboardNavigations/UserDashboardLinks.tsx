import links from "../../config/userDashboardLinks";
import { NavLink } from "react-router-dom";
import { User } from "../../types";
import { useDashboardContext } from "../../contexts/dashboardContext";

type Props = {
  className?: string;
  isSmallSidebar?: boolean;
};

export default function UserDashboardLinks({
  className,
  isSmallSidebar,
}: Props) {
  const { toggleSmallSidebar, user } = useDashboardContext();
  const { role } = user as User;

  const commonStyle = "flex mb-6 gap-6 text-xl mb-4";
  const linkStyle = `text-gray-700 hover:text-blue-600 dark:hover:text-blue-500 dark:text-white`;
  const loadingStyle = `text-blue-400  dark:hover:text-blue-500 dark:text-white`;
  const activeStyle = `text-blue-700 hover:text-blue-600`;
  return (
    <div className={` ${className}`}>
      {links.map((link) => {
        const { text, path, icon } = link;
        if (path === "admin" && role !== "admin") {
          return;
        }
        return (
          <NavLink
            className={({ isActive, isPending }) => {
              return `${commonStyle} ${
                isActive ? activeStyle : isPending ? loadingStyle : linkStyle
              }`;
            }}
            onClick={isSmallSidebar ? toggleSmallSidebar : undefined}
            to={path}
            key={text}
            end
          >
            <span className="my-auto">{icon}</span>
            <span className="">{text}</span>
          </NavLink>
        );
      })}
    </div>
  );
}
