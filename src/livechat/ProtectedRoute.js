import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, isAdminRoute = false }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/signin" replace />;
  }

  // Nếu route yêu cầu admin/consultant nhưng user là customer
  if (isAdminRoute && userInfo.role === "customer") {
    return <Navigate to="/" replace />;
  }

  // Nếu không có quyền truy cập
  if (!allowedRoles.includes(userInfo.role)) {
    // Consultant không thể vào admin pages khác ngoài livechat
    if (userInfo.role === "consultant") {
      return <Navigate to="/livechat" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
