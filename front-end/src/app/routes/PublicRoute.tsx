import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { ReactNode } from 'react';
import { useUserInformation } from '../../hooks/user/useUserInformation';

type Props = {
  className?: string;
  children?: ReactNode;
};

export default function PublicRoute({ children }: Props) {
  const { user } = useUserStore();
  const { isLoading } = useUserInformation();

  if (user) {
    return <Navigate to="/" replace />;
  }

  if (!isLoading && !user) {
    return children ? children : <Outlet />;
  }
}
