import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../contexts/AppProvider";
import { useUserInformation } from "../api/UserApi";
import { LoadingPage } from "../components/ui";

type Props = {
  className?: string;
};

export default function ProtectedRoute({}: Props) {
    const {userStore: {state}} = useAppContext()
    const {isLoading} = useUserInformation()
    if (isLoading){
        <LoadingPage />
    }
    if (state.isLoggedIn){
        return <Outlet />
    } 
    if (!isLoading && !state.isLoggedIn) {
        return <Navigate to="/login" />
    }
}