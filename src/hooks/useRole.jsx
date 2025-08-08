import { useAuth } from "./useAuth";

export const useRole = () => {
    const { user } = useAuth();

    const getUserRoles = () => {
        if (!user || !user.roles || !Array.isArray(user.roles)) {
            return [];
        }
        return user.roles.map(role => role.name);
    };

    const hasRole = (requiredRole) => {
        const userRoles = getUserRoles();
        return userRoles.includes(requiredRole);
    };

    const hasAnyRole = (requiredRoles) => {
        const userRoles = getUserRoles();
        return requiredRoles.some(role => userRoles.includes(role));
    };

    const isAdmin = () => hasRole('ADMIN');
    const isEditor = () => hasRole('EDITOR');
    const isUser = () => hasRole('USER');
    const isAdminAndEditor = () => hasAnyRole(['ADMIN', 'EDITOR']);

    const currentRoles = getUserRoles();

    return {
        hasRole,
        hasAnyRole,
        isAdmin,
        isEditor,
        isUser,
        isAdminAndEditor,
        currentRoles,
        userRoles: user?.roles || []
    };


};