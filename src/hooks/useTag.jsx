import { useAuth } from "./useAuth";
import { categoryAndTagService } from "../services/categoryAndTagService";
import { useEffect, useState } from "react";

export const useTag = () => {
    const { user } = useAuth();
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTags = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await categoryAndTagService.getAllTags();
            setTags(response);
        } catch (err) {
            console.error('Error loading tags:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải thẻ');
            setTags([]);
        } finally {
            setIsLoading(false);
        }
    }

    const createTag = async (tagData) => {
        if (tagData.name.trim() === "") {
            setError("Tên thẻ không được để trống");
            return;
        }
        try {
            setIsLoading(true);
            const response = await categoryAndTagService.createTag(tagData);
            await loadTags();
            setError(null);
        } catch (err) {
            console.error('Error creating tag:', err);
            setError(err.message || 'Có lỗi xảy ra khi tạo thẻ');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTag = async (tagId) => {
        try {
            setIsLoading(true);
            await categoryAndTagService.deleteTag(tagId);
            await loadTags();
            setError(null);
        } catch (err) {
            console.error('Error deleting tag:', err);
            setError(err.message || 'Có lỗi xảy ra khi xóa thẻ');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTags();
    }, []);

    return {
        tags,
        isLoading,
        error,
        loadTags,
        createTag
    };
}
