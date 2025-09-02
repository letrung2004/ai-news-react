import { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';

export const useArticle = () => {
    const [addArticleForm, setAddArticleForm] = useState({
        title: '',
        content: '',
        category: '',
        tags: [],
        authors: [],
        featuredImage: null,
    });

    const [newAuthor, setNewAuthor] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);

    // Loading states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    // Data state
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        pageSize: 20,
        totalElements: 0
    });

    const handleAddArticleFormChange = (field, value) => {
        setAddArticleForm(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCategoryChange = (clickedCategory) => {
        const newCategory = addArticleForm.category === clickedCategory ? '' : clickedCategory;
        setAddArticleForm(prev => ({ ...prev, category: newCategory }));
    };

    const handleTagsChange = (tag) => {
        setSelectedTags(prev => {
            if (prev.includes(tag)) {
                return prev.filter(t => t !== tag);
            } else {
                return [...prev, tag];
            }
        });
    };

    const addAuthors = () => {
        if (newAuthor.trim() && !addArticleForm.authors.includes(newAuthor.trim())) {
            handleAddArticleFormChange('authors', [...addArticleForm.authors, newAuthor.trim()]);
            setNewAuthor('');
        }
    };

    const removeAuthors = (authorRemove) => {
        handleAddArticleFormChange('authors',
            addArticleForm.authors.filter(author => author !== authorRemove)
        );
    };

    const handleImageUpload = (file) => {
        if (file && file.type.startsWith('image/')) {
            handleAddArticleFormChange('featuredImage', file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        handleAddArticleFormChange('featuredImage', null);
        setImagePreview(null);
    };

    const resetForm = () => {
        setAddArticleForm({
            title: '',
            content: '',
            category: '',
            featuredImage: null,
            authors: []
        });
        setSelectedTags([]);
        setImagePreview(null);
        setNewAuthor('');
    };

    const handleSubmit = async (isDraft = false) => {
        setIsSubmitting(true);

        try {
            let featuredImageUrl = null;

            if (addArticleForm.featuredImage) {
                const imageFormData = new FormData();
                imageFormData.append('image', addArticleForm.featuredImage);
                const uploadResult = await articleService.uploadImage(imageFormData);
                featuredImageUrl = uploadResult.result.urlImage;
            }

            const articleData = {
                title: addArticleForm.title,
                content: addArticleForm.content,
                category: addArticleForm.category,
                tags: selectedTags,
                featuredImage: featuredImageUrl,
                authors: addArticleForm.authors,
            };

            const result = await articleService.createArticle(articleData);
            resetForm();

            return {
                success: true,
                data: result,
                message: 'Bài báo đã được lưu thành công. Hãy kiểm tra xử lý của AI'
            };

        } catch (error) {
            console.error('Error submitting article:', error);
            return {
                success: false,
                message: 'Không thể lưu bài báo. Vui lòng thử lại!'
            };
        } finally {
            setIsSubmitting(false);
        }
    };

    const loadArticles = async (page = 1) => {
        try {
            setLoading(true);
            setError(null);

            const response = await articleService.getAllArticleForAdmin(page);

            setArticles(response.data);
            setPagination({
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                pageSize: response.pageSize,
                totalElements: response.totalElements
            });

            return { success: true, data: response };
        } catch (error) {
            console.error("Error loading articles:", error);
            const errorMessage = error.message || "Có lỗi xảy ra khi tải dữ liệu";
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const changeArticleStatus = async (articleId, status) => {
        try {
            setLoading(true);
            setError(null);

            await articleService.updateStatusArticle(articleId, status);

            setArticles(prev =>
                prev.map(article =>
                    article.id === articleId
                        ? { ...article, status: status }
                        : article
                )
            );

            return {
                success: true,
                message: "Trạng thái bài báo đã được cập nhật thành công!"
            };
        } catch (error) {
            console.error("Error updating article:", error);
            const errorMessage = error.message || 'Có lỗi xảy ra khi cập nhật bài báo';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const deleteArticle = async (articleId) => {
        try {
            setLoading(true);
            setError(null);

            await articleService.deleteArticle(articleId);

            // Remove from local state
            setArticles(prev => prev.filter(article => article.id !== articleId));

            return {
                success: true,
                message: "Bài báo đã được xóa thành công!"
            };
        } catch (error) {
            console.error("Error deleting article:", error);
            const errorMessage = error.message || 'Có lỗi xảy ra khi xóa bài báo';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const updateArticle = async (articleId, articleData) => {
        try {
            setLoading(true);
            setError(null);

            // xử lý cập nhật

            return {
                success: true,
                message: "Bài báo đã được cập nhật thành công!",
                data: result
            };
        } catch (error) {
            console.error("Error updating article:", error);
            const errorMessage = error.message || 'Có lỗi xảy ra khi cập nhật bài báo';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return {
        addArticleForm,
        selectedTags,
        setSelectedTags,
        newAuthor,
        setNewAuthor,
        imagePreview,

        isSubmitting,
        loading,
        error,

        articles,
        pagination,

        handleAddArticleFormChange,
        handleCategoryChange,
        handleTagsChange,
        addAuthors,
        removeAuthors,
        handleImageUpload,
        removeImage,
        resetForm,

        handleSubmit,
        loadArticles,
        changeArticleStatus,
        deleteArticle,
        updateArticle,
    };
};