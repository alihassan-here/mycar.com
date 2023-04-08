import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const UserAuthRoute = () => {
  const { adminToken } = useSelector((state) => state.authReducer);
  return adminToken ? <Navigate to="/dashboard/products" /> : <Outlet />;
};
export default UserAuthRoute;
