import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import FilterBar from "../../components/manager/FilterBar";
import Pagination from "../../components/Pagination";
import ArticlesList from "../../components/manager/article/ArticlesList";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import { Error } from "../../components/Error";
import SimpleLoading from "../../components/SimpleLoading";

import { useArticle } from "../../hooks/useArticle";
import { useArticleSearch } from "../../hooks/useArticleSearch";
import useAlert from "../../hooks/useAlert";
import useConfirmDialog from "../../hooks/useConfirmDialog";

const useDebounce = (value, delay = 300) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
};

const statusOptions = [
    { value: "PUBLISHED", label: "Xuất bản" },
    { value: "PENDING",   label: "Chờ duyệt" },
    { value: "DRAFT",     label: "Nháp" },
    { value: "ARCHIVED",  label: "Lưu trữ" },
    { value: "REJECTED",  label: "Từ chối" },
];

const AllArticles = () => {
    const [searchTerm, setSearchTerm]     = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const { alert, showSuccess, showError, hideAlert } = useAlert();
    const { confirmDialog, handleConfirm, handleCancel, showDeleteConfirm, showWarningConfirm } = useConfirmDialog();
    const { articles, pagination, loading, error, loadArticles, changeArticleStatus, deleteArticle } = useArticle();

    const debouncedSearch = useDebounce(searchTerm, 400);
    const isSearching = debouncedSearch.trim().length > 0;

    // Gọi API search khi có keyword
    const { results: searchResults, totalElements: searchTotal, loading: searchLoading } = useArticleSearch(debouncedSearch);

    useEffect(() => { loadArticles(1); }, []);

    // Nguồn data: search results hoặc articles thường
    const sourceArticles = isSearching ? searchResults : (articles || []);

    // Filter status client-side trên kết quả hiện tại
    const filtered = useMemo(() => {
        return sourceArticles.filter(a =>
            statusFilter === "all" || a.status === statusFilter
        );
    }, [sourceArticles, statusFilter]);

    const handleDelete = (articleId, title) => {
        showDeleteConfirm(title || "bài viết này", async (id) => {
            const result = await deleteArticle(id);
            result.success ? showSuccess("Thành công", result.message) : showError("Lỗi", result.message);
        }, articleId);
    };

    const handleStatusChange = (articleId, newStatus) => {
        const label = statusOptions.find(o => o.value === newStatus)?.label || newStatus;
        showWarningConfirm(
            "Xác nhận thay đổi trạng thái",
            `Bạn có muốn đổi trạng thái thành "${label}"?`,
            async (data) => {
                const result = await changeArticleStatus(data.articleId, data.newStatus);
                result.success ? showSuccess("Thành công", result.message) : showError("Lỗi", result.message);
            },
            { articleId, newStatus }
        );
    };

    const isLoading = isSearching ? searchLoading : loading;
    const totalCount = isSearching ? searchTotal : pagination.totalElements;

    if (error && !isSearching) return <Error message={error} onRetry={() => window.location.reload()} />;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-5">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tất cả bài viết</h1>
                        <p className="text-sm text-gray-400 mt-0.5">Quản lý và theo dõi tất cả nội dung</p>
                    </div>
                    <Link to="/manager/articles/create">
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
                            <Plus className="w-4 h-4" />
                            Thêm bài viết
                        </button>
                    </Link>
                </div>

                {/* Filter */}
                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Tìm theo tiêu đề, nội dung..."
                    selectOptions={statusOptions}
                    selectValue={statusFilter}
                    onSelectChange={setStatusFilter}
                    total={isLoading ? undefined : filtered.length}
                    label={isSearching ? `/ ${searchTotal} kết quả` : "bài viết"}
                />

                {/* List */}
                {isLoading ? (
                    <SimpleLoading />
                ) : (
                    <>
                        <ArticlesList
                            articles={filtered}
                            onDelete={handleDelete}
                            onStatusChange={handleStatusChange}
                            loading={isLoading}
                        />

                        {/* Pagination — chỉ khi không search */}
                        {!isSearching && statusFilter === "all" && pagination.totalPages > 1 && (
                            <Pagination
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={(page) => loadArticles(page)}
                            />
                        )}

                        {/* Empty state khi search */}
                        {isSearching && filtered.length === 0 && !isLoading && (
                            <div className="text-center py-16 text-gray-400">
                                <p className="text-sm">Không tìm thấy bài viết nào cho "<span className="font-medium text-gray-600">{debouncedSearch}</span>"</p>
                            </div>
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

export default AllArticles;