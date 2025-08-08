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
        } catch (err) {
            console.error('Error loading categories:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải danh mục');
            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    }

    const createCategory = async (categoryData) => {
        if (categoryData.name.trim() === "") {
            setError("Tên danh mục không được để trống");
            return;
        }
        try {
            setIsLoading(true);
            const response = await categoryAndTagService.createCategory(categoryData);
            await loadCategories();
            setError(null);
        } catch (err) {
            console.error('Error creating category:', err);
            setError(err.message || 'Có lỗi xảy ra khi tạo danh mục');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            setIsLoading(true);
            await categoryAndTagService.deleteCategory(categoryId);
            await loadCategories();
            setError(null);
        } catch (err) {
            console.error('Error deleting category:', err);
            setError(err.message || 'Có lỗi xảy ra khi xóa danh mục');
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
