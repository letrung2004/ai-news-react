import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRole } from "../hooks/useRole";
import SimpleLoading from "./SimpleLoading";

const AdminRoute = ({ element }) => {
    const { user, loading } = useAuth();
    const { isAdminAndEditor } = useRole();

    if (loading) {
        return <SimpleLoading />;
    }

    if (!user) {
        return <Navigate to="/login-system" replace />;
    }

    if (!isAdminAndEditor()) {
        return <Navigate to="/unauthorized" replace />;
    }

    return element;
};

export default AdminRoute;