import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import { useAuth } from "./useAuth";

export const useUser = () => {
    const [users, setUsers] = useState([]);
    const [userDetail, setUserDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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


    const getUser = async (userId) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await userService.getUser(userId);
            setUserDetail(response);
        } catch (err) {
            console.error('Error loading tags:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải người dùng');
            setUserDetail();
        } finally {
            setIsLoading(false);
        }
    }

    const createUser = async (data) => {
        try {
            setIsSubmitting(true);
            setError(null);
            //
            // const res = await userService.createUser(data);
            // await loadUsers();
            //
            return { success: true, data: res };
        } catch (err) {
            setError(err.message || "Có lỗi xảy ra khi tạo người dùng");
            return { success: false, message: err.message };
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateUser = async (userId, data) => {
        try {
            setIsSubmitting(true);
            setError(null);
            // const res = await userService.updateUser(userId, data);
            // await loadUsers();

            return { success: true, data: res };
        } catch (err) {
            setError(err.message || "Có lỗi xảy ra khi cập nhật người dùng");
            return { success: false, message: err.message };
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteUser = async (userId) => {
        try {
            setIsSubmitting(true);
            setError(null);
            //   await userService.deleteUser(userId);
            //   setUsers((prev) => prev.filter((u) => u.id !== userId));
            return { success: true };
        } catch (err) {
            setError(err.message || "Có lỗi xảy ra khi xóa người dùng");
            return { success: false, message: err.message };
        } finally {
            setIsSubmitting(false);
        }
    };


    useEffect(() => {
        loadUsers();
    }, []);


    return {
        users,
        userDetail,
        error,
        isLoading,
        isSubmitting,
        loadUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
    };
};