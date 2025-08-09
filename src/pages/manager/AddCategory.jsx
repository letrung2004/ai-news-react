import React, { useEffect, useState } from "react";
import { Save, FileCheck, FileText, Plus, Edit, Trash2, Search } from "lucide-react";
import { useCategory } from "../../hooks/useCategory";
import Alert from "./../../components/Alert";
import ConfirmDialog from "./../../components/ConfirmDialog";
import SimpleLoading from "../../components/SimpleLoading";
import { Error } from "../../components/Error";
import useAlert from "../../hooks/useAlert";
import useConfirmDialog from "../../hooks/useConfirmDialog";

const AddCategory = () => {
    const { categories, isLoading, error, createCategory, deleteCategory } = useCategory();
    const { alert, showSuccess, showError, hideAlert } = useAlert();
    const { confirmDialog, showDeleteConfirm, handleConfirm, handleCancel } = useConfirmDialog();

    console.log("danh muc ở add category: ", categories);

    const [categoryForm, setCategoryForm] = useState({
        name: '',
        description: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleFormChange = (field, value) => {
        setCategoryForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const result = await createCategory(categoryForm);

        if (result.success) {
            setCategoryForm({ name: '', description: '' });
            showSuccess('Thành công', result.message);
        } else {
            showError('Lỗi', result.message);
        }

        setIsSubmitting(false);
    };

    const handleDeleteClick = (category) => {
        showDeleteConfirm(
            category.name,
            async () => {
                const result = await deleteCategory(category.id);

                if (result.success) {
                    showSuccess('Thành công', result.message);
                } else {
                    showError('Lỗi', result.message);
                }
            }
        );
    };

    const categoryList = categories?.result || [];

    const filteredCategories = categoryList.filter(category =>
        category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <SimpleLoading />;
    }

    if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý danh mục</h1>
                    <p className="text-gray-600">Thêm mới và quản lý danh mục nội dung</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form thêm danh mục */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                <Plus className="w-5 h-5 mr-2 text-green-500" />
                                Thêm danh mục mới
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Tên danh mục
                                    </label>
                                    <input
                                        type="text"
                                        value={categoryForm.name}
                                        onChange={(e) => handleFormChange('name', e.target.value)}
                                        placeholder="Nhập tên danh mục..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Mô tả
                                    </label>
                                    <textarea
                                        value={categoryForm.description}
                                        onChange={(e) => handleFormChange('description', e.target.value)}
                                        placeholder="Nhập mô tả danh mục..."
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 resize-none"
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FileCheck className="w-4 h-4" />
                                    <span>{isSubmitting ? 'Đang thêm...' : 'Thêm danh mục'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Danh sách danh mục */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <FileText className="w-5 h-5 mr-2 text-green-600" />
                                        Danh sách danh mục
                                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 text-sm rounded-full">
                                            {filteredCategories.length} danh mục
                                        </span>
                                    </h3>
                                </div>

                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm danh mục..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((category) => (
                                        <div key={category._id || category.id} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3">
                                                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                            {category.count || 0} bài viết
                                                        </span>
                                                    </div>
                                                    {category.description && (
                                                        <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(category)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">
                                            {searchTerm ? 'Không tìm thấy danh mục nào' : 'Chưa có danh mục nào'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Alert
                type={alert.type}
                title={alert.title}
                message={alert.message}
                isVisible={alert.isVisible}
                onClose={hideAlert}
                autoClose={true}
                duration={3000}
            />

            <ConfirmDialog
                isVisible={confirmDialog.isVisible}
                title={confirmDialog.title}
                message={confirmDialog.message}
                confirmText={confirmDialog.confirmText}
                cancelText={confirmDialog.cancelText}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                type={confirmDialog.type}
            />
        </div>
    );
};

export default AddCategory;