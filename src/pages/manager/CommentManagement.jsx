import React, { useState, useEffect } from "react";
import FilterBar from "../../components/manager/FilterBar";
import ListComment from "../../components/manager/comment/ListComment";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import { Error } from "../../components/Error";
import SimpleLoading from "../../components/SimpleLoading";

import useComment from "../../hooks/useComment";
import useAlert from "../../hooks/useAlert";
import useConfirmDialog from "../../hooks/useConfirmDialog";

const CommentManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedArticle, setSelectedArticle] = useState("all");

    const {
        comments,
        loading,
        error,
        loadComments,
        deleteComment,
        approveComment,
        rejectComment
    } = useComment();

    console.log("comment data" + comments);


    const { alert, showSuccess, showError, hideAlert } = useAlert();

    const {
        confirmDialog,
        handleConfirm,
        handleCancel,
        showDeleteConfirm,
        showWarningConfirm
    } = useConfirmDialog();

    useEffect(() => {
        loadComments();
    }, []);

    const statuses = [
        { value: 'all', label: 'Tất cả' },
        { value: 'APPROVED', label: 'Đã duyệt' },
        { value: 'REJECTED', label: 'Từ chối' },
        { value: 'PENDING', label: 'Chờ duyệt' }
    ];


    const handleApproveAction = async (commentId) => {
        const result = await approveComment(commentId);

        if (result.success) {
            showSuccess('Thành công', result.message);
        } else {
            showError('Lỗi', result.message);
        }
    };

    const handleApprove = (commentId) => {
        showWarningConfirm(
            'Xác nhận phê duyệt',
            'Bạn có chắc chắn muốn phê duyệt bình luận này?',
            handleApproveAction,
            commentId
        );
    };

    const handleRejectAction = async (commentId) => {
        const result = await rejectComment(commentId);

        if (result.success) {
            showSuccess('Thành công', result.message);
        } else {
            showError('Lỗi', result.message);
        }
    };

    const handleReject = (commentId) => {
        showWarningConfirm(
            'Xác nhận từ chối',
            'Bạn có chắc chắn muốn từ chối bình luận này?',
            handleRejectAction,
            commentId
        );
    };

    const handleDeleteAction = async (commentId) => {
        const result = await deleteComment(commentId);

        if (result.success) {
            showSuccess('Thành công', result.message);
        } else {
            showError('Lỗi', result.message);
        }
    };

    const handleDelete = (commentId, content) => {
        showDeleteConfirm(
            `"${content?.substring(0, 50)}..."` || 'bình luận này',
            handleDeleteAction,
            commentId
        );
    };

    const handleRetry = () => {
        loadComments();
    };

    if (error && comments.length === 0) {
        return <Error message={error} onRetry={handleRetry} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Quản lý bình luận</h1>
                </div>

                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectOptions={statuses}
                    selectValue={selectedStatus}
                    onSelectChange={setSelectedStatus}
                />

                {loading ? (
                    <SimpleLoading />
                ) : (
                    <ListComment
                        comments={comments}
                        searchTerm={searchTerm}
                        selectedStatus={selectedStatus}
                        selectedArticle={selectedArticle}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onDelete={handleDelete}
                        loading={loading}
                    />
                )}

                {/* Alert Component */}
                <Alert
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    isVisible={alert.isVisible}
                    onClose={hideAlert}
                    autoClose={true}
                    duration={3000}
                />

                {/* Confirm Dialog */}
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
        </div>
    );
};

export default CommentManagement;