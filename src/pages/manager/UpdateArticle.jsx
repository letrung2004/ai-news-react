import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useArticle } from "../../hooks/useArticle";
import { useCategory } from "../../hooks/useCategory";
import { useTag } from "../../hooks/useTag";
import usePublicArticles from "../../hooks/usePublicArticles";
import Alert from "../../components/Alert";
import useAlert from "../../hooks/useAlert";
import TitleSection from "../../components/manager/article/TitleSection";
import ContentEditor from "../../components/manager/article/ContentEditor";
import FeaturedImage from "../../components/manager/article/FeaturedImage";
import AuthorSection from "../../components/manager/article/AuthorSection";
import CategorySection from "../../components/manager/article/CategorySection";
import TagSection from "../../components/manager/article/TagSection";
import LoadingOverlay from "../../components/manager/article/LoadingOverlay";
import { Save, FileCheck } from "lucide-react";
import SimpleLoading from "../../components/SimpleLoading";
import { Error } from "../../components/Error";

const UpdateArticle = () => {
    const { articleSlug } = useParams();
    const { alert, hideAlert, showAlert } = useAlert();

    const { detailArticle, loading: loadingArticle, loadDetailArticles, error } = usePublicArticles();

    const {
        addArticleForm, selectedTags, setSelectedTags, newAuthor, setNewAuthor,
        imagePreview, setImagePreview, isSubmitting, handleAddArticleFormChange,
        handleCategoryChange, handleTagsChange, addAuthors, removeAuthors,
        handleImageUpload, removeImage, updateArticle
    } = useArticle();

    const { categories } = useCategory();
    const { tags } = useTag();

    useEffect(() => {
        if (articleSlug) {
            setIsDataLoaded(false);
            loadDetailArticles(articleSlug);
        }
    }, [articleSlug]);

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const setImageFromUrl = (imageUrl) => {
        if (imageUrl && typeof imageUrl === 'string') {
            setImagePreview(imageUrl);
        }
    };

    useEffect(() => {
        if (detailArticle?.result && !isDataLoaded) {
            const article = detailArticle.result;
            console.log('Article data:', article);

            if (article.title) {
                handleAddArticleFormChange('title', article.title);
            }

            if (article.content) {
                handleAddArticleFormChange('content', article.content);
            }

            if (article.category?.id) {
                handleAddArticleFormChange('category', article.category.id);
            }

            if (article.tags && article.tags.length > 0) {
                const tagIds = article.tags.map(tag => tag.id);
                console.log('Setting tags:', tagIds);
                setSelectedTags(tagIds);
                handleAddArticleFormChange('tags', tagIds);
            }

            if (article.authors && article.authors.length > 0) {
                handleAddArticleFormChange('authors', article.authors);
            }

            if (article.featuredImage) {
                console.log('Setting image:', article.featuredImage);
                setImageFromUrl(article.featuredImage);
                handleAddArticleFormChange('featuredImage', article.featuredImage);
            }


            setIsDataLoaded(true);
        }
    }, [detailArticle, isDataLoaded]);

    const handleUpdateSubmit = async () => {
        try {
            console.log("data gui:", addArticleForm);
            const res = await updateArticle(detailArticle.result.id, addArticleForm);

            if (res.success) {
                showAlert("success", "Thành công", res.message);
            } else {
                showAlert("error", "Thất bại", res.message);
            }
        } catch (error) {
            console.error('Error updating article:', error);
            showAlert("error", "Lỗi", "Không thể cập nhật bài báo!");
        }
    };

    if (loadingArticle && !detailArticle) {
        return (
            <SimpleLoading />
        );
    }
    const handleRetry = () => {
        loadComments();
    };
    if (!loadingArticle && !detailArticle?.result) {
        return <Error message={error} onRetry={handleRetry} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Cập nhật bài báo</h1>
                            <p className="text-gray-600">Chỉnh sửa và cập nhật nội dung bài báo</p>
                            {detailArticle?.result && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Tên bài báo: {detailArticle.result.title}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => handleUpdateSubmit(false)}
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FileCheck className="w-4 h-4" />
                                <span>{isSubmitting ? 'Đang cập nhật...' : 'Cập nhật bài báo'}</span>
                            </button>
                        </div>
                    </div>
                </div>




                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <TitleSection
                            title={addArticleForm.title}
                            onChange={(value) => handleAddArticleFormChange('title', value)}
                        />

                        <ContentEditor
                            content={addArticleForm.content}
                            onChange={(value) => handleAddArticleFormChange('content', value)}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        <FeaturedImage
                            imagePreview={imagePreview}
                            onImageUpload={handleImageUpload}
                            onRemoveImage={removeImage}
                        />

                        <AuthorSection
                            authors={addArticleForm.authors}
                            newAuthor={newAuthor}
                            setNewAuthor={setNewAuthor}
                            onAddAuthor={addAuthors}
                            onRemoveAuthor={removeAuthors}
                        />

                        <CategorySection
                            categories={categories?.result || []}
                            selectedCategory={addArticleForm.category}
                            onCategoryChange={handleCategoryChange}
                        />

                        <TagSection
                            tags={tags?.result || []}
                            selectedTags={selectedTags}
                            onTagChange={handleTagsChange}
                        />

                        {/* Tóm tắt bài báo */}
                        {detailArticle?.result?.summary && (
                            <div className="mb-4 p-4 bg-gray-50 border-l-4 border-blue-500 rounded-md">
                                <h2 className="text-lg font-semibold text-gray-800 mb-1">Tóm tắt bài báo được sinh từ AI</h2>
                                <p className="text-gray-700 whitespace-pre-line">{detailArticle.result.summary}</p>
                            </div>
                        )}
                        {/* Audio bài báo */}
                        {detailArticle?.result?.audioUrl && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Audio bài báo được sinh từ AI
                                </label>
                                <audio controls className="w-full rounded-md shadow-sm">
                                    <source src={detailArticle.result.audioUrl} type="audio/mpeg" />
                                    Trình duyệt của bạn không hỗ trợ thẻ audio.
                                </audio>
                            </div>
                        )}

                    </div>
                </div>

            </div>

            {isSubmitting && <LoadingOverlay />}

            <Alert
                type={alert.type}
                title={alert.title}
                message={alert.message}
                isVisible={alert.isVisible}
                onClose={hideAlert}
                autoClose={true}
                duration={3000}
            />
        </div>
    );
};

export default UpdateArticle;