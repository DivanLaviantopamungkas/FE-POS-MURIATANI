import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  role: "manager" | "kasir";
}

const PrivateRoute = ({ role }: PrivateRouteProps) => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return <Navigate to="/login" />;

  const user = JSON.parse(userStr);
  if (user.role !== role) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default PrivateRoute;
