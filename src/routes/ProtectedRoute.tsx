import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function ProtectedRoute({ children }: any) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return children;
}
