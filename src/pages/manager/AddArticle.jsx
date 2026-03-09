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
import { FileCheck, Loader2 } from "lucide-react";

const AddArticle = () => {
    const { alert, hideAlert } = useAlert();
    const {
        addArticleForm, selectedTags, newAuthor, setNewAuthor,
        imagePreview, isSubmitting,
        handleAddArticleFormChange, handleCategoryChange, handleTagsChange,
        addAuthors, removeAuthors, handleImageUpload, removeImage, handleSubmit
    } = useArticle();

    const { categories } = useCategory();
    const { tags } = useTag();

    const onSubmit = async () => {
        await handleSubmit(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-6">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Thêm bài viết mới</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Điền đầy đủ thông tin để xuất bản</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main — col 2 */}
                    <div className="lg:col-span-2 space-y-5">
                        <TitleSection
                            title={addArticleForm.title}
                            onChange={(v) => handleAddArticleFormChange("title", v)}
                        />
                        <ContentEditor
                            content={addArticleForm.content}
                            onChange={(v) => handleAddArticleFormChange("content", v)}
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

                        {/* Save button */}
                        <button
                            onClick={onSubmit}
                            disabled={isSubmitting || !addArticleForm.title?.trim()}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-100 disabled:text-gray-300 text-white text-sm font-medium rounded-xl transition-all shadow-sm disabled:cursor-not-allowed"
                        >
                            {isSubmitting
                                ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</>
                                : <><FileCheck className="w-4 h-4" /> Lưu bài viết</>
                            }
                        </button>
                    </div>
                </div>
            </div>

            {isSubmitting && <LoadingOverlay />}

            <Alert
                type={alert.type} title={alert.title}
                message={alert.message} isVisible={alert.isVisible}
                onClose={hideAlert} autoClose duration={3000}
            />
        </div>
    );
};

export default AddArticle;