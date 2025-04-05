import { useSheetContext } from '@/components/ui/sheet/Sheet';
import { permissions } from '@/config/permissions';
import links from '@/config/userDashboardLinks';
import { useUserStore } from '@/lib/store/userStore';
import { NavLink } from 'react-router-dom';

type Props = {
  className?: string;
};
const commonStyle = 'w-[130px] flex mb-6 gap-6 text-xl mb-4';
const linkStyle = `text-gray-700 hover:text-blue-600 dark:hover:text-blue-500 dark:text-white`;
const loadingStyle = `text-blue-400  dark:hover:text-blue-500 dark:text-white`;
const activeStyle = `text-blue-700 hover:text-blue-600`;

export default function UserDashboardLinks({ className }: Props) {
  const { toggleOpen, showSmallSidebar } = useSheetContext();
  const userStore = useUserStore();

  return (
    <div className={`w-full  ${className}`}>
      {links.map((link) => {
        const { text, path, icon } = link;
        if (
          !userStore.permissions.includes(permissions.VIEW_ADMIN_DASHBOARD) &&
          path === 'admin'
        ) {
          return null;
        }
        return (
          <NavLink
            onClick={showSmallSidebar ? toggleOpen : () => {}}
            className={({ isActive, isPending }) => {
              return `${commonStyle} ${
                isActive ? activeStyle : isPending ? loadingStyle : linkStyle
              }`;
            }}
            to={path}
            key={text}
            end
          >
            <span className='my-auto'>{icon}</span>
            <span className=''>{text}</span>
          </NavLink>
        );
      })}
    </div>
  );
}
