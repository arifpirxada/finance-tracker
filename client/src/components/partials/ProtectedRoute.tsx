import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;