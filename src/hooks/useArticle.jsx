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

    const [collapsedSections, setCollapsedSections] = useState({});
    const [newAuthor, setNewAuthor] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    const categories = ['Công nghệ', 'Thể thao', 'Văn hóa', 'Kinh tế', 'Giải trí', 'Sức khỏe', 'Du lịch', 'Ẩm thực'];
    const articleTag = ['Công nghệ', 'Thể thao', 'Văn hóa', 'Kinh tế', 'Giải trí', 'Sức khỏe', 'Du lịch', 'Ẩm thực'];

    // Xử lý thay đổi form
    const handleAddArticleFormChange = (field, value) => {
        setAddArticleForm((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (field === 'content') {
            setAddArticleForm((prev) => ({
                ...prev,
                readingTime: readingTime
            }));
        }
    };

    // Toggle sections
    const toggleSection = (sectionId) => {
        setCollapsedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    // Xử lý danh mục
    const handleCategoryChange = (clickedCategory) => {
        if (addArticleForm.category === clickedCategory) {
            setAddArticleForm({ ...addArticleForm, category: '' });
        } else {
            setAddArticleForm({ ...addArticleForm, category: clickedCategory });
        }
    };

    // Xử lý tags
    const handleTagsChange = (tag) => {
        setSelectedTags(prev => {
            if (prev.includes(tag)) {
                return prev.filter(t => t !== tag);
            } else {
                return [...prev, tag];
            }
        });
    };

    // Xử lý authors
    const addAuthors = () => {
        if (newAuthor.trim() && !addArticleForm.authors.includes(newAuthor.trim())) {
            handleAddArticleFormChange('authors', [...addArticleForm.authors, newAuthor.trim()]);
            setNewAuthor('');
        }
    };

    const removeAuthors = (authorRemove) => {
        handleAddArticleFormChange('authors', addArticleForm.authors.filter(author => author !== authorRemove));
    };

    // Xử lý upload ảnh
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

    // Xử lý submit
    const handleSubmit = async (isDraft = false) => {
        setIsSubmitting(true);

        try {
            console.log('=== STARTING SUBMIT PROCESS ===');

            // upload ảnh đại diện nếu có
            let featuredImageUrl = null;
            if (addArticleForm.featuredImage) {
                const imageFormData = new FormData();
                imageFormData.append('image', addArticleForm.featuredImage);

                const uploadResult = await articleService.uploadImage(imageFormData);
                featuredImageUrl = uploadResult.result.urlImage;
            }

            //  object dữ liệu để gửi
            const articleData = {
                title: addArticleForm.title,
                content: addArticleForm.content,
                category: addArticleForm.category,
                tags: addArticleForm.tags,
                featuredImage: featuredImageUrl,
                authors: addArticleForm.authors
            };

            console.log('=== FINAL ARTICLE DATA ===');
            console.log(JSON.stringify(articleData, null, 2));
            console.log('===========================');

            // 4. Gọi API tạo bài viết
            // const result = await articleService.createArticle(articleData);

            // alert(isDraft ? 'Lưu nháp thành công!' : 'Xuất bản bài viết thành công!');

            console.log('Submit completed successfully');

        } catch (error) {
            console.error('Error submitting article:', error);
            alert('Có lỗi xảy ra khi ' + (isDraft ? 'lưu nháp' : 'xuất bản') + ' bài viết!');
        } finally {
            setIsSubmitting(false);
        }
    };


    useEffect(() => {
        return () => {
            // Cleanup preview URL
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return {
        // States
        addArticleForm,
        collapsedSections,
        selectedTags, setSelectedTags,
        newAuthor, setNewAuthor,
        imagePreview,
        isSubmitting,
        categories, articleTag,

        // Methods
        handleAddArticleFormChange,
        toggleSection,
        handleCategoryChange,
        handleTagsChange,
        addAuthors,
        removeAuthors,
        handleImageUpload,
        removeImage,
        handleSubmit
    };
};