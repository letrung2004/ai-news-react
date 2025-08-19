import { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';


export const useArticle = (showSuccess, showError) => {
    const [addArticleForm, setAddArticleForm] = useState({
        title: '',
        content: '',
        category: '',
        tags: [],
        authors: [],
        featuredImage: null,
    });

    const [collapsedSections, setCollapsedSections] = useState({});
    const [newAuthor, setNewAuthor] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    const handleAddArticleFormChange = (field, value) => {
        setAddArticleForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCategoryChange = (clickedCategory) => {
        if (addArticleForm.category === clickedCategory) {
            setAddArticleForm({ ...addArticleForm, category: '' });
        } else {
            setAddArticleForm({ ...addArticleForm, category: clickedCategory });
        }
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
        handleAddArticleFormChange('authors', addArticleForm.authors.filter(author => author !== authorRemove));
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
                authors: addArticleForm.authors
            };



            const result = await articleService.createArticle(articleData);

            // console.log('=========check data========');
            // console.log(JSON.stringify(articleData, null, 2));
            // console.log('===========================');

            console.log('Article submitted successfully:', result);

            setAddArticleForm({
                title: '',
                content: '',
                category: '',
                featuredImage: null,
                authors: []
            });
            setSelectedTags([]);
            setImagePreview(null);

            showSuccess('Xuất bản thành công!', 'Bài viết đã được xuất bản thành công.');
            return result;


        } catch (error) {
            console.error('Error submitting article:', error);
            showError(
                'Có lỗi xảy ra!',
                `Không thể ${isDraft ? 'lưu nháp' : 'xuất bản'} bài viết. Vui lòng thử lại.`
            );
        } finally {
            setIsSubmitting(false);
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
        selectedTags, setSelectedTags,
        newAuthor, setNewAuthor,
        imagePreview,
        isSubmitting,

        handleAddArticleFormChange,
        handleCategoryChange,
        handleTagsChange,
        addAuthors,
        removeAuthors,
        handleImageUpload,
        removeImage,
        handleSubmit
    };
};