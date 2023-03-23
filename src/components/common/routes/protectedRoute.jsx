import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../../../services/user";

const ProtectedRoutes = () => {
  return getCurrentUser() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
