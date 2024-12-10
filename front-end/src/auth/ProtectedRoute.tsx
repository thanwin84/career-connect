import { Navigate, Outlet } from "react-router-dom";
import { useUserInformation } from "../api/UserApi";
import { LoadingPage } from "../components/ui";
import { useUserStore } from "../store/userStore";

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
