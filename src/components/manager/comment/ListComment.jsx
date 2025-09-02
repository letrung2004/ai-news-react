import React from "react";
import { CheckCircle, X, Trash2, Calendar, User } from "lucide-react";
import SimpleLoading from "../../SimpleLoading";

const statusConfig = {
    APPROVED: {
        label: "Đã duyệt",
        color: "bg-green-100 text-green-800 border-green-200"
    },
    PENDING: {
        label: "Chờ duyệt",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200"
    },
    REJECTED: {
        label: "Đã từ chối",
        color: "bg-red-100 text-red-800 border-red-200"
    }
};

export default function ListComment({
    comments,
    searchTerm,
    selectedStatus,
    selectedArticle,
    onApprove,
    onReject,
    onDelete,
    loading
}) {
    const getStatusBadge = (status) => {
        return statusConfig[status] || statusConfig.PENDING;
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };


    const filteredComments = React.useMemo(() => {
        if (!comments) return [];

        return comments.filter(comment => {
            // Search filter
            const matchesSearch = !searchTerm ||
                comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                comment.userName.toLowerCase().includes(searchTerm.toLowerCase());

            // Status filter
            const matchesStatus = selectedStatus === 'all' || comment.status === selectedStatus;

            // Article filter (if needed)
            const matchesArticle = selectedArticle === 'all' || comment.articleId === selectedArticle;

            return matchesSearch && matchesStatus && matchesArticle;
        });
    }, [comments, searchTerm, selectedStatus, selectedArticle]);

    if (loading) {
        <SimpleLoading />
    }

    if (!comments || filteredComments.length === 0) {
        return (
            <div className="bg-white p-8 rounded-xl shadow text-center">
                <div className="text-gray-500 mb-2">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <p className="text-lg font-medium text-gray-900 mb-1">Không có bình luận nào</p>
                <p className="text-sm text-gray-500">
                    {searchTerm || selectedStatus !== 'all'
                        ? 'Thử thay đổi bộ lọc để xem thêm bình luận'
                        : 'Chưa có bình luận nào được tạo'}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
                Hiển thị {filteredComments.length} / {comments.length} bình luận
            </div>

            {filteredComments.map((comment) => {
                const statusBadge = getStatusBadge(comment.status);
                const canModerate = comment.status === "PENDING";

                return (
                    <div key={comment.id} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className="flex-1 pr-4">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <User className="w-4 h-4" />
                                        <span className="font-medium text-gray-900">{comment.userName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatDate(comment.createdDate)}</span>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-500 mb-2">
                                    Mã bài báo: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{comment.articleId}</code>
                                </div>

                                <div className="mb-3">
                                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                        Nội dung:   {comment.content}
                                    </p>
                                </div>

                                <div className="inline-flex">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.color}`}>
                                        {statusBadge.label}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                {canModerate && (
                                    <>
                                        <button
                                            onClick={() => onApprove(comment.id)}
                                            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                                            title="Phê duyệt bình luận"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => onReject(comment.id)}
                                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Từ chối bình luận"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => onDelete(comment.id, comment.content)}
                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Xóa bình luận"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}


        </div>
    );
}