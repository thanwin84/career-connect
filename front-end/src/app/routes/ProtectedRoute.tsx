import { Navigate, Outlet } from 'react-router-dom';
import { LoadingPage } from '../../components/ui';
import { useUserStore } from '../../store/userStore';
import { useUserInformation } from '../../hooks/user/useUserInformation';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  children?: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const userStore = useUserStore();
  const { isLoading } = useUserInformation();

  if (userStore.isLoggedIn) {
    return children ? children : <Outlet />;
  }
  if (!isLoading && !userStore.isLoggedIn) {
    return <Navigate to="/login" />;
  }
}
