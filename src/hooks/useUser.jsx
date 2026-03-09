import { useEffect, useState } from "react";
import { userService } from "../services/userService";

export const useUser = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1, totalPages: 1, pageSize: 10, totalElements: 0
    });
    const [userDetail, setUserDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // API trả result = { currentPage, totalPages, pageSize, totalElements, data: [...] }
    const loadUsers = async (page = 1) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await userService.getAllUser(page);
            // Service trả response.data.result — có thể là array hoặc paginated object
            if (response && typeof response === "object" && "data" in response && Array.isArray(response.data)) {
                setUsers(response.data);
                setPagination({
                    currentPage: response.currentPage ?? page,
                    totalPages:  response.totalPages  ?? 1,
                    pageSize:    response.pageSize    ?? 10,
                    totalElements: response.totalElements ?? 0,
                });
            } else if (Array.isArray(response)) {
                setUsers(response);
                setPagination({ currentPage: 1, totalPages: 1, pageSize: response.length, totalElements: response.length });
            } else {
                setUsers([]);
            }
        } catch (err) {
            console.error("Error loading users:", err);
            setError(err.message || "Có lỗi xảy ra khi tải người dùng");
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    };

    const getUser = async (userId) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await userService.getUser(userId);
            setUserDetail(response);
        } catch (err) {
            console.error("Error loading user:", err);
            setError(err.message || "Có lỗi xảy ra khi tải người dùng");
            setUserDetail(null);
        } finally {
            setIsLoading(false);
        }
    };

    const createUser = async (data) => {
        try {
            setIsSubmitting(true);
            setError(null);
            const res = await userService.createUser(data);
            await loadUsers(pagination.currentPage);
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
            const res = await userService.updateUser(userId, data);
            await loadUsers(pagination.currentPage);
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
            await userService.deleteUser(userId);
            setUsers(prev => prev.filter(u => u.id !== userId));
            return { success: true };
        } catch (err) {
            setError(err.message || "Có lỗi xảy ra khi xóa người dùng");
            return { success: false, message: err.message };
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => { loadUsers(1); }, []);

    return {
        users,           // array thẳng
        pagination,      // { currentPage, totalPages, pageSize, totalElements }
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