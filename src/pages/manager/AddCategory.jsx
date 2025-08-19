import React, { useEffect, useState } from "react";
import { useCategory } from "../../hooks/useCategory";
import Alert from "./../../components/Alert";
import ConfirmDialog from "./../../components/ConfirmDialog";
import SimpleLoading from "../../components/SimpleLoading";
import { Error } from "../../components/Error";
import useAlert from "../../hooks/useAlert";
import useConfirmDialog from "../../hooks/useConfirmDialog";
import AddItemForm from "../../components/manager/AddItemForm";
import CategoryList from "../../components/manager/category/CategoryList";

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
    if (isLoading) {
        return <SimpleLoading />;
    }

    if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý danh mục</h1>
                    <p className="text-gray-600">Thêm mới và quản lý danh mục nội dung</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <AddItemForm
                        title="danh mục"
                        formData={categoryForm}
                        onFormChange={handleFormChange}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                    />

                    <CategoryList
                        categories={categories?.result || []}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onDelete={handleDeleteClick}
                    />
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