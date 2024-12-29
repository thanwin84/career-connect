import { Link } from 'react-router-dom';
import { Logo } from '../../../../components/ui';
import MenuContainer from '../../../../components/ui/menu';
import SidebarToggle from './SidebarToggle';

type Props = {
  className?: string;
};

export default function MainNavbar({ className }: Props) {
  return (
    <nav
      className={`w-full flex justify-between px-4   bg-white dark:bg-zinc-800 border-b dark:border-none ${className} `}
    >
      <div className="flex gap-6">
        <SidebarToggle className="border-r py-4 px-4 md:hidden" />
        <Link to="/" className="my-auto">
          <Logo className="w-36 my-auto py-4" />
        </Link>
      </div>
      <MenuContainer className="py-4" />
    </nav>
  );
}
