import { Navigate } from "react-router-dom";
import { useAuth } from "../CPA";

export const ProtectedRoute = ({ children }) => {
  const { bear } = useAuth();

  if (!bear) return <Navigate to="/" replace />;

  return children;
};
