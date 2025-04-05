import { Navigate, Outlet } from 'react-router-dom';
import { ReactNode } from 'react';
import { useUserStore } from '@/lib/store/userStore';
import { useCurrentUser } from '@/hooks/api';

type Props = {
  className?: string;
  children?: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const userStore = useUserStore();
  const { isLoading } = useCurrentUser();

  if (userStore.isLoggedIn) {
    return children ? children : <Outlet />;
  }
  if (!isLoading && !userStore.isLoggedIn) {
    return <Navigate to='/login' />;
  }
}
