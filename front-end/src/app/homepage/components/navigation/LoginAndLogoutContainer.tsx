import { useUserStore } from '../../../../lib/store/userStore';
import MenuContainer from '../../../../components/ui/menu/MenuContainer';
import { Link } from 'react-router-dom';

type Props = {
  className?: string;
};

export default function LoginAndLogoutContainer({ className }: Props) {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;
  return (
    <div className={`my-auto ${className}`}>
      {isLoggedIn ? (
        <MenuContainer />
      ) : (
        <Link
          to="/login"
          className="font-semibold text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 px-4 py-2"
        >
          LOGIN
        </Link>
      )}
    </div>
  );
}
