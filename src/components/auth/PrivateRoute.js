import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = ({ role }) => {
    const userStr = localStorage.getItem("user");
    if (!userStr)
        return _jsx(Navigate, { to: "/login" });
    const user = JSON.parse(userStr);
    if (user.role !== role)
        return _jsx(Navigate, { to: "/unauthorized" });
    return _jsx(Outlet, {});
};
export default PrivateRoute;
