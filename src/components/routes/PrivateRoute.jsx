import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import SimpleLoading from "../SimpleLoading";

const PrivateRoute = ({ element }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <SimpleLoading />;
    }

    if (!user) {
        if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/editor")) {
            return <Navigate to="/login-system" replace />;
        }
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default PrivateRoute;