import React, { useEffect, useMemo, useState } from "react";
import { MessageSquare, CheckCircle, Clock, XCircle } from "lucide-react";
import FilterBar from "../../components/manager/FilterBar";
import Pagination from "../../components/Pagination";
import ListComment from "../../components/manager/comment/ListComment";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import { Error } from "../../components/Error";
import SimpleLoading from "../../components/SimpleLoading";
import StatsCard from "../../components/manager/StatsCard";
import useComment from "../../hooks/useComment";
import useAlert from "../../hooks/useAlert";
import useConfirmDialog from "../../hooks/useConfirmDialog";

const STATUS_OPTIONS = [
    { value: "APPROVED", label: "Đã duyệt" },
    { value: "PENDING",  label: "Chờ duyệt" },
    { value: "REJECTED", label: "Từ chối" },
];

const CommentManagement = () => {
    const [searchTerm, setSearchTerm]     = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");

    const { comments, pagination, loading, error, loadComments, approveComment, rejectComment, deleteComment } = useComment();
    const { alert, showSuccess, showError, hideAlert } = useAlert();
    const { confirmDialog, handleConfirm, handleCancel, showDeleteConfirm, showWarningConfirm } = useConfirmDialog();

    useEffect(() => { loadComments(1); }, []);

    // Stats từ data trang hiện tại
    const totalApproved = comments.filter(c => c.status === "APPROVED").length;
    const totalPending  = comments.filter(c => c.status === "PENDING").length;
    const totalRejected = comments.filter(c => c.status === "REJECTED").length;

    const statsData = [
        { title: "Tổng bình luận", value: pagination.totalElements, icon: MessageSquare, bgColor: "bg-blue-50",   iconColor: "text-blue-600" },
        { title: "Đã duyệt",       value: totalApproved,            icon: CheckCircle,   bgColor: "bg-green-50",  iconColor: "text-green-600" },
        { title: "Chờ duyệt",      value: totalPending,             icon: Clock,         bgColor: "bg-amber-50",  iconColor: "text-amber-500" },
        { title: "Từ chối",        value: totalRejected,            icon: XCircle,       bgColor: "bg-red-50",    iconColor: "text-red-500" },
    ];

    // Filter client-side trên trang hiện tại
    const filtered = useMemo(() => comments.filter(c => {
        const matchSearch = !searchTerm.trim() ||
            c.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.userName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = selectedStatus === "all" || c.status === selectedStatus;
        return matchSearch && matchStatus;
    }), [comments, searchTerm, selectedStatus]);

    const handleApprove = (id) => showWarningConfirm(
        "Xác nhận duyệt", "Duyệt bình luận này?",
        async (commentId) => {
            const r = await approveComment(commentId);
            r.success ? showSuccess("Thành công", r.message) : showError("Lỗi", r.message);
        }, id
    );

    const handleReject = (id) => showWarningConfirm(
        "Xác nhận từ chối", "Từ chối bình luận này?",
        async (commentId) => {
            const r = await rejectComment(commentId);
            r.success ? showSuccess("Thành công", r.message) : showError("Lỗi", r.message);
        }, id
    );

    const handleDelete = (id, content) => showDeleteConfirm(
        `"${content?.substring(0, 40)}..."`,
        async (commentId) => {
            const r = await deleteComment(commentId);
            r.success ? showSuccess("Thành công", r.message) : showError("Lỗi", r.message);
        }, id
    );

    const handlePageChange = (page) => {
        setSearchTerm(""); setSelectedStatus("all");
        loadComments(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (error && comments.length === 0) return <Error message={error} onRetry={() => loadComments(1)} />;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-5">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý bình luận</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Kiểm duyệt và quản lý bình luận của người dùng</p>
                </div>

                <StatsCard statsData={statsData} />

                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Tìm theo nội dung, tên người dùng..."
                    selectOptions={STATUS_OPTIONS}
                    selectValue={selectedStatus}
                    onSelectChange={setSelectedStatus}
                    total={filtered.length}
                    label="bình luận"
                />

                {loading ? <SimpleLoading /> : (
                    <>
                        <ListComment
                            comments={filtered}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onDelete={handleDelete}
                        />

                        {!searchTerm && selectedStatus === "all" && pagination.totalPages > 1 && (
                            <Pagination
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>

            <Alert type={alert.type} title={alert.title} message={alert.message}
                isVisible={alert.isVisible} onClose={hideAlert} autoClose duration={3000} />
            <ConfirmDialog isVisible={confirmDialog.isVisible} title={confirmDialog.title}
                message={confirmDialog.message} confirmText={confirmDialog.confirmText}
                cancelText={confirmDialog.cancelText} onConfirm={handleConfirm} onCancel={handleCancel}
                type={confirmDialog.type} />
        </div>
    );
};

export default CommentManagement;