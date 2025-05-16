import { useCurrentUser } from '@/hooks/api';
import { useUserStore } from '@/lib/store/userStore';
import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  className?: string;
  children?: ReactNode;
};

export default function PublicRoute({ children }: Props) {
  const { user } = useUserStore();
  const { isLoading } = useCurrentUser();

  if (user) {
    return <Navigate to='/' replace />;
  }

  if (!isLoading && !user) {
    return children ? children : <Outlet />;
  }
}
