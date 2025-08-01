import React from "react";
import { Plus, Image, FileText, Save, Eye, FileCheck, User, Hash, Upload, PenLine, ChevronUp, ChevronDown, X, Tag } from "lucide-react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editorConfig } from '../../configs/editorConfig';
import { useArticle } from "../../hooks/useArticle";

const AddArticle = () => {
    const {
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
    } = useArticle();


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thêm bài báo mới</h1>
                            <p className="text-gray-600">Tạo và xuất bản nội dung chất lượng cao</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => handleSubmit(true)}
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="w-4 h-4" />
                                <span>{isSubmitting ? 'Đang lưu...' : 'Lưu nháp'}</span>
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                <Eye className="w-4 h-4" />
                                <span>Xem trước</span>
                            </button>
                            <button
                                onClick={() => handleSubmit(false)}
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FileCheck className="w-4 h-4" />
                                <span>{isSubmitting ? 'Đang xuất bản...' : 'Xuất bản'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Tiêu đề bài viết
                            </label>
                            <input
                                type="text"
                                value={addArticleForm.title}
                                onChange={(e) => handleAddArticleFormChange('title', e.target.value)}
                                placeholder="Nhập tiêu đề hấp dẫn cho bài viết..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-medium placeholder-gray-400"
                            />
                        </div>

                        {/* Rich Text Editor */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Nội dung bài viết
                                </label>

                                <div className="border border-gray-200 rounded-lg overflow-hidden min-h-[650px]">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={editorConfig}
                                        data={addArticleForm.content}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            handleAddArticleFormChange('content', data);
                                        }}
                                        onReady={(editor) => {
                                            const editableElement = editor.editing.view.document.getRoot();
                                            editor.editing.view.change(writer => {
                                                writer.setStyle('min-height', '650px', editableElement);
                                            });
                                            console.log('CKEditor is ready to use!', editor);
                                        }}
                                        onError={(error, { willEditorRestart }) => {
                                            console.error('CKEditor error:', error);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Featured Image */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer"
                                onClick={() => toggleSection('image')}
                            >
                                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                    <Image className="w-4 h-4 text-orange-600" />
                                    <span>Ảnh đại diện</span>
                                </h4>
                                {collapsedSections['image'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                            </div>

                            {!collapsedSections['image'] && (
                                <div className="p-4">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Featured"
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => document.getElementById('imageUpload').click()}
                                            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors cursor-pointer"
                                        >
                                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-600 mb-2">Kéo thả ảnh vào đây hoặc</p>
                                            <span className="text-green-500 text-sm hover:text-green-600 font-medium">
                                                Chọn ảnh từ máy tính
                                            </span>
                                            <input
                                                id="imageUpload"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e.target.files[0])}
                                                className="hidden"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Author */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer"
                                onClick={() => toggleSection('authors')}
                            >
                                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                    <User className="w-4 h-4 text-purple-600" />
                                    <span>Biên tập viên</span>
                                </h4>
                                {collapsedSections['authors'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                            </div>

                            {!collapsedSections['authors'] && (
                                <div className="p-4 space-y-3">
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={newAuthor}
                                            onChange={(e) => setNewAuthor(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && addAuthors()}
                                            placeholder="Nhập họ và tên"
                                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                        <button
                                            onClick={addAuthors}
                                            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {addArticleForm.authors.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {addArticleForm.authors.map((authors, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                                >
                                                    <PenLine className="w-3 h-3 mr-1" />
                                                    {authors}
                                                    <button
                                                        onClick={() => removeAuthors(authors)}
                                                        className="ml-1 text-green-600 hover:text-green-800"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Categories */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer"
                                onClick={() => toggleSection('categories')}
                            >
                                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    <span>Danh mục</span>
                                </h4>
                                {collapsedSections['categories'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                            </div>

                            {!collapsedSections['categories'] && (
                                <div className="p-4 space-y-3">
                                    <div className="max-h-32 overflow-y-auto space-y-2">
                                        {categories.map((category, index) => (
                                            <label key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg">
                                                <input
                                                    type="radio"
                                                    checked={addArticleForm.category === category}
                                                    onChange={() => handleCategoryChange(category)}
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer"
                                onClick={() => toggleSection('tags')}
                            >
                                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                    <Hash className="w-4 h-4 text-purple-600" />
                                    <span>Thẻ</span>
                                </h4>
                                {collapsedSections['tags'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                            </div>

                            {!collapsedSections['tags'] && (
                                <div className="p-4 space-y-3">
                                    <div className="max-h-32 overflow-y-auto space-y-2">
                                        {articleTag.map((tag, index) => (
                                            <label key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTags.includes(tag)}
                                                    onChange={() => handleTagsChange(tag)}
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">{tag}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddArticle;