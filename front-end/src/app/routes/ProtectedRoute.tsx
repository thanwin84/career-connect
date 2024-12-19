import { Navigate, Outlet } from 'react-router-dom';
import { LoadingPage } from '../../components/ui';
import { useUserStore } from '../../store/userStore';
import { useUserInformation } from '../../hooks/user/useUserInformation';

type Props = {
  className?: string;
};

export default function ProtectedRoute({}: Props) {
  const userStore = useUserStore();
  const { isLoading } = useUserInformation();
  if (isLoading) {
    <LoadingPage />;
  }
  if (userStore.isLoggedIn) {
    return <Outlet />;
  }
  if (!isLoading && !userStore.isLoggedIn) {
    return <Navigate to="/login" />;
  }
}
