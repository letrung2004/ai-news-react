import React, { useState, useEffect } from "react";
import FilterBar from "../../components/manager/FilterBar";
import Pagination from "../../components/Pagination";
import ArticlesList from "../../components/manager/article/ArticlesList";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import { Error } from "../../components/Error";
import SimpleLoading from "../../components/SimpleLoading";

import { useArticle } from "../../hooks/useArticle";
import useAlert from "../../hooks/useAlert";
import useConfirmDialog from "../../hooks/useConfirmDialog";

const AllArticles = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { alert, showSuccess, showError, hideAlert } = useAlert();
    const {
        confirmDialog,
        handleConfirm,
        handleCancel,
        showDeleteConfirm,
        showWarningConfirm
    } = useConfirmDialog();

    const {
        articles,
        pagination,
        loading,
        error,
        loadArticles,
        changeArticleStatus,
        deleteArticle
    } = useArticle();

    const statusLabels = {
        'PENDING': 'Chờ duyệt',
        'PUBLISHED': 'Xuất bản',
        'ARCHIVED': 'Lưu trữ',
        'REJECTED': 'Từ chối'
    };

    useEffect(() => {
        loadArticles(1);
    }, []);


    const handleDeleteAction = async (articleId) => {
        const result = await deleteArticle(articleId);

        if (result.success) {
            showSuccess('Thành công', result.message);
        } else {
            showError('Lỗi', result.message);
        }
    };

    const handleDelete = (articleId, title) => {
        showDeleteConfirm(
            title || 'bài viết này',
            handleDeleteAction,
            articleId
        );
    };

    const handleStatusChangeAction = async (data) => {
        const { articleId, newStatus } = data;
        const result = await changeArticleStatus(articleId, newStatus);

        if (result.success) {
            showSuccess('Thành công', result.message);
        } else {
            showError('Lỗi', result.message);
        }
    };

    const handleStatusChange = (articleId, newStatus) => {
        showWarningConfirm(
            'Xác nhận thay đổi trạng thái',
            `Bạn có muốn thay đổi trạng thái bài viết thành "${statusLabels[newStatus]}"?`,
            handleStatusChangeAction,
            { articleId, newStatus }
        );
    };

    const handlePageChange = (page) => {
        loadArticles(page);
    };

    const handleRetry = () => {
        window.location.reload();
    };

    if (error) {
        return <Error message={error} onRetry={handleRetry} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Tất cả bài viết
                            </h1>
                            <p className="text-gray-600">
                                Quản lý và theo dõi tất cả nội dung
                            </p>
                        </div>

                        {/* <div className="flex items-center space-x-3">
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                <Filter className="w-4 h-4" />
                                <span>Bộ lọc</span>
                            </button>
                            <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center space-x-2">
                                <FileText className="w-4 h-4" />
                                <span>Thêm bài viết</span>
                            </button>
                        </div> */}
                    </div>
                </div>

                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                // selectOptions={categories}
                // selectValue={categoryFilter}
                // onSelectChange={setCategoryFilter}
                />

                {loading ? (
                    <SimpleLoading />
                ) : (
                    <>
                        <ArticlesList
                            articles={articles}
                            onDelete={handleDelete}
                            onStatusChange={handleStatusChange}
                            loading={loading}
                        />

                        {pagination.totalPages > 1 && (
                            <Pagination
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
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

export default AllArticles;