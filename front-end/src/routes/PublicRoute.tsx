import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function PublicRoute({ children }: Props) {
  const userStore = useUserStore();

  if (userStore.user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
