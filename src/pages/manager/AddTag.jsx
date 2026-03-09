import React, { useState } from "react";
import { useTag } from "../../hooks/useTag";
import SimpleLoading from "../../components/SimpleLoading";
import { Error } from "../../components/Error";
import useAlert from "../../hooks/useAlert";
import useConfirmDialog from "../../hooks/useConfirmDialog";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import AddItemForm from "../../components/manager/AddItemForm";
import TagList from "../../components/manager/tag/TagList";

const AddTag = () => {
    const { tags, isLoading, error, createTag, deleteTag } = useTag();
    const { alert, showSuccess, showError, hideAlert } = useAlert();
    const { confirmDialog, showDeleteConfirm, handleConfirm, handleCancel } = useConfirmDialog();

    const [tagForm, setTagForm] = useState({ name: "", description: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleFormChange = (field, value) =>
        setTagForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const result = await createTag(tagForm);
        if (result.success) {
            setTagForm({ name: "", description: "" });
            showSuccess("Thành công", result.message);
        } else {
            showError("Lỗi", result.message);
        }
        setIsSubmitting(false);
    };

    const handleDelete = (tag) => {
        showDeleteConfirm(tag.name, async () => {
            const result = await deleteTag(tag.id);
            result.success
                ? showSuccess("Thành công", result.message)
                : showError("Lỗi", result.message);
        });
    };

    if (isLoading) return <SimpleLoading />;
    if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý thẻ</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Thêm mới và quản lý thẻ nội dung</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <AddItemForm
                        title="thẻ"
                        formData={tagForm}
                        onFormChange={handleFormChange}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                    />
                    <TagList
                        tags={tags}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>

            <Alert
                type={alert.type}
                title={alert.title}
                message={alert.message}
                isVisible={alert.isVisible}
                onClose={hideAlert}
                autoClose
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

export default AddTag;