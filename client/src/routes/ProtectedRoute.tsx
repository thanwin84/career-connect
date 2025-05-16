import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useUserStore } from '@/lib/store/userStore';
import { useCurrentUser } from '@/hooks/api';

type Props = {
  className?: string;
  children?: ReactNode;
  allowedPermissions?: string[];
  redirectTo?: string;
};

export default function ProtectedRoute({
  children,
  allowedPermissions,
  redirectTo = '/',
}: Props) {
  const location = useLocation();
  const userStore = useUserStore();
  const { isLoading } = useCurrentUser();
  if (!isLoading && !userStore.isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (
    allowedPermissions &&
    !allowedPermissions.some((item) => userStore.permissions.includes(item))
  ) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
}
