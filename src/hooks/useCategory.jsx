import { useAuth } from "./useAuth";
import { categoryAndTagService } from "../services/categoryAndTagService";
import { useEffect, useState } from "react";

export const useCategory = () => {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadCategories = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await categoryAndTagService.getAllCategories();
            setCategories(response);
            return { success: true, data: response };
        } catch (err) {
            console.error('Error loading categories:', err);
            const errorMessage = err.message || 'Có lỗi xảy ra khi tải danh mục';
            setError(errorMessage);
            setCategories([]);
            return { success: false, message: errorMessage };
        } finally {
            setIsLoading(false);
        }
    }

    const createCategory = async (categoryData) => {
        if (!categoryData.name?.trim()) {
            const errorMessage = "Tên danh mục không được để trống";
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await categoryAndTagService.createCategory(categoryData);
            await loadCategories();

            return {
                success: true,
                message: "Danh mục đã được thêm thành công!",
                data: response
            };
        } catch (err) {
            console.error('Error creating category:', err);
            const errorMessage = err.message || 'Có lỗi xảy ra khi tạo danh mục';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            setIsLoading(true);
            setError(null);

            await categoryAndTagService.deleteCategory(categoryId);
            await loadCategories();

            return {
                success: true,
                message: "Danh mục đã được xóa thành công!"
            };
        } catch (err) {
            console.error('Error deleting category:', err);
            const errorMessage = err.message || 'Có lỗi xảy ra khi xóa danh mục';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return {
        categories,
        isLoading,
        error,
        loadCategories,
        createCategory,
        deleteCategory
    };
}