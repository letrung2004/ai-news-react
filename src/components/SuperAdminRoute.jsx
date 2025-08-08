import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRole } from "../hooks/useRole";
import SimpleLoading from "./SimpleLoading";

const SuperAdminRoute = ({ element }) => {
    const { loading, user } = useAuth();
    const { isAdmin } = useRole();

    if (loading) {
        return <SimpleLoading />;
    }

    if (!user) {
        return <Navigate to="/login-system" replace />;
    }

    if (!isAdmin()) {
        return <Navigate to="/unauthorized" replace />;
    }

    return element;
};

export default SuperAdminRoute;
