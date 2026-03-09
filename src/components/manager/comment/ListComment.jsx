import React from "react";
import { CheckCircle, XCircle, Trash2, User, Clock, MessageSquare } from "lucide-react";

const STATUS_CONFIG = {
    APPROVED: { label: "Đã duyệt",  cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    PENDING:  { label: "Chờ duyệt", cls: "bg-amber-50 text-amber-700 border-amber-200" },
    REJECTED: { label: "Từ chối",   cls: "bg-red-50 text-red-600 border-red-200" },
};

const Avatar = ({ name }) => (
    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
        {(name || "?").charAt(0).toUpperCase()}
    </div>
);

const formatDate = (str) => {
    try {
        return new Date(str).toLocaleString("vi-VN", {
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
    } catch { return str; }
};

export default function ListComment({ comments = [], onApprove, onReject, onDelete }) {
    if (comments.length === 0) return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
            <MessageSquare className="w-8 h-8 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">Không có bình luận nào</p>
        </div>
    );

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
                {comments.map((comment) => {
                    const status = STATUS_CONFIG[comment.status] || STATUS_CONFIG.PENDING;
                    const isPending = comment.status === "PENDING";

                    return (
                        <div key={comment.id} className="px-6 py-4 hover:bg-gray-50/60 transition-colors group">
                            <div className="flex items-start gap-4">

                                {/* Avatar */}
                                <Avatar name={comment.userName} />

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <span className="text-sm font-semibold text-gray-800">{comment.userName}</span>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium border ${status.cls}`}>
                                            {status.label}
                                        </span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(comment.createdDate)}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-700 leading-relaxed mb-2">
                                        {comment.content}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Bài viết: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">{comment.articleId?.slice(0, 8)}...</code>
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                    {isPending && (
                                        <>
                                            <button
                                                onClick={() => onApprove(comment.id)}
                                                title="Duyệt"
                                                className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onReject(comment.id)}
                                                title="Từ chối"
                                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => onDelete(comment.id, comment.content)}
                                        title="Xóa"
                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}