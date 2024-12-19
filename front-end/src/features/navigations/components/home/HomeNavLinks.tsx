import { NavLink } from 'react-router-dom';
import { links } from '../../../../config/homeLinks';

type Props = {
  className?: string;
  isLoggedIn: boolean;
};
export default function HomeNavLinks({ className, isLoggedIn }: Props) {
  const styles = {
    active:
      ' dark:text-slate-100 font-medium border-b-2 border-blue-700 dark:border-blue-500 pb-6',
    normal: ' pb-6 dark:text-slate-200',
  };
  return (
    <div className={`w-full flex gap-6  ${className}`}>
      {links.map((link) => {
        if (!isLoggedIn && link.name === 'DASHBOARD') {
          return;
        } else {
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive ? styles.active : styles.normal
              }
              end
            >
              {link.name}
            </NavLink>
          );
        }
      })}
    </div>
  );
}
