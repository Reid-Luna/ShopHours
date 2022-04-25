import { Navigate } from "react-router-dom";
import { useAPI } from "../CPA";

export const ProtectedRoute = ({ children }) => {
  const { bear } = useAPI();

  if (!bear) return <Navigate to="/login" replace />;

  return children;
};
