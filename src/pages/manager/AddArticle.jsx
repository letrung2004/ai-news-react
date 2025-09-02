import React from "react";
import { useArticle } from "../../hooks/useArticle";
import { useCategory } from "../../hooks/useCategory";
import { useTag } from "../../hooks/useTag";
import Alert from "../../components/Alert";
import useAlert from "../../hooks/useAlert";
import TitleSection from "../../components/manager/article/TitleSection";
import ContentEditor from "../../components/manager/article/ContentEditor";
import FeaturedImage from "../../components/manager/article/FeaturedImage";
import AuthorSection from "../../components/manager/article/AuthorSection";
import CategorySection from "../../components/manager/article/CategorySection";
import TagSection from "../../components/manager/article/TagSection";
import LoadingOverlay from "../../components/manager/article/LoadingOverlay";
import { Save, Eye, FileCheck } from "lucide-react";

const AddArticle = () => {
    const { alert, hideAlert } = useAlert();
    const {
        addArticleForm,
        selectedTags,
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
    } = useArticle();

    const { categories } = useCategory();
    const { tags } = useTag();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thêm bài báo mới</h1>
                            <p className="text-gray-600">Tạo và xuất bản nội dung chất lượng cao</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => handleSubmit(false)}
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FileCheck className="w-4 h-4" />
                                <span>{isSubmitting ? 'Đang lưu bài...' : 'Lưu bài báo'}</span>
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

export default AddArticle;