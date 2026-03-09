import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Edit, Trash2, MoreVertical, User, Calendar,
    FileText, CheckCircle, XCircle, Clock, Tag, Archive
} from "lucide-react";
import SimpleLoading from "../../SimpleLoading";

const statusConfig = {
    PENDING:   { label: "Chờ duyệt", bg: "bg-amber-50 text-amber-700 border-amber-200",   icon: Clock },
    PUBLISHED: { label: "Xuất bản",  bg: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle },
    ARCHIVED:  { label: "Lưu trữ",  bg: "bg-gray-50 text-gray-600 border-gray-200",       icon: Archive },
    REJECTED:  { label: "Từ chối",  bg: "bg-red-50 text-red-600 border-red-200",           icon: XCircle },
    DRAFT:     { label: "Nháp",     bg: "bg-gray-50 text-gray-500 border-gray-200",        icon: FileText },
};

const StatusBadge = ({ status }) => {
    const cfg = statusConfig[status] || statusConfig.PENDING;
    const Icon = cfg.icon;
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${cfg.bg}`}>
            <Icon className="w-3 h-3" />
            {cfg.label}
        </span>
    );
};

const AiBadge = ({ article }) => {
    const ready = article.summary && article.audioUrl && article.embedding;
    return ready ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-indigo-50 text-indigo-600 border border-indigo-200">
            <CheckCircle className="w-3 h-3" /> AI sẵn sàng
        </span>
    ) : (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-gray-50 text-gray-400 border border-gray-200">
            <XCircle className="w-3 h-3" /> AI chưa xong
        </span>
    );
};

const formatAuthors = (authors) => {
    if (!authors?.length) return "Chưa có tác giả";
    if (authors.length === 1) return authors[0].name || authors[0];
    return `${authors[0].name || authors[0]} +${authors.length - 1}`;
};

const ArticlesList = ({ articles, onDelete, onStatusChange, loading }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    if (loading) return <SimpleLoading />;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {articles.length === 0 ? (
                <div className="py-20 text-center">
                    <FileText className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-sm text-gray-400">Không tìm thấy bài viết nào</p>
                </div>
            ) : (
                <div className="divide-y divide-gray-50">
                    {articles.map((article) => (
                        <div
                            key={article.id}
                            className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50/70 transition-colors group"
                        >
                            {/* Thumbnail */}
                            <div className="w-20 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                                {article.featuredImage ? (
                                    <img
                                        src={article.featuredImage}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-gray-300" />
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                {/* Title + status */}
                                <div className="flex items-start gap-2 mb-1.5 flex-wrap">
                                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-green-600 transition-colors flex-1 min-w-0">
                                        {article.title || "Không có tiêu đề"}
                                    </h3>
                                    <StatusBadge status={article.status} />
                                </div>

                                {/* Summary */}
                                {article.summary && (
                                    <p className="text-xs text-gray-400 line-clamp-1 mb-2">{article.summary}</p>
                                )}

                                {/* Meta row */}
                                <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                        <User className="w-3 h-3" />
                                        {formatAuthors(article.authors)}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                        <Calendar className="w-3 h-3" />
                                        {article.created
                                            ? new Date(article.created).toLocaleDateString("vi-VN")
                                            : "—"}
                                    </span>
                                    {article.category?.name && (
                                        <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                                            <Tag className="w-3 h-3" />
                                            {article.category.name}
                                        </span>
                                    )}
                                    <AiBadge article={article} />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link to={`/manager/articles/update/${article.slug}`}>
                                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                </Link>

                                <button
                                    onClick={() => onDelete(article.id, article.title)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                {/* Status dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setOpenDropdown(openDropdown === article.id ? null : article.id)}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </button>

                                    {openDropdown === article.id && (
                                        <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-20 py-1">
                                            <p className="px-3 py-1.5 text-xs font-medium text-gray-400 border-b border-gray-50">
                                                Đổi trạng thái
                                            </p>
                                            {Object.entries(statusConfig).map(([status, cfg]) => {
                                                if (status === article.status) return null;
                                                const Icon = cfg.icon;
                                                return (
                                                    <button
                                                        key={status}
                                                        onClick={() => {
                                                            onStatusChange(article.id, status);
                                                            setOpenDropdown(null);
                                                        }}
                                                        className="w-full px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                                                    >
                                                        <Icon className="w-4 h-4" />
                                                        {cfg.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Click outside to close dropdown */}
            {openDropdown && (
                <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
            )}
        </div>
    );
};

export default ArticlesList;