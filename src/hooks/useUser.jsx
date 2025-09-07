import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import { useAuth } from "./useAuth";

export const useUser = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUsers = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await userService.getAllUser();
            setUsers(response);
        } catch (err) {
            console.error('Error loading tags:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải thẻ');
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        loadUsers();
    }, []);


    return {
        users, loadUsers
    };
};