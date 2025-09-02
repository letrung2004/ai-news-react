import React, { useState } from "react";
import { Eye, Edit, Trash2, MoreVertical, User, Calendar, Eye as EyeIcon, FileText, CheckCircle, XCircle, Clock, Tag, Archive } from "lucide-react";
import SimpleLoading from "../../SimpleLoading";

const ArticlesList = ({ articles, onDelete, onStatusChange, loading }) => {
    const [expandedDropdown, setExpandedDropdown] = useState(null);

    const statusConfig = {
        'PENDING': {
            label: 'Chờ duyệt',
            color: 'bg-yellow-100 text-yellow-600',
            icon: Clock
        },
        'PUBLISHED': {
            label: 'Xuất bản',
            color: 'bg-green-100 text-green-600',
            icon: CheckCircle
        },
        'ARCHIVED': {
            label: 'Lưu trữ',
            color: 'bg-gray-100 text-gray-600',
            icon: Archive
        },
        'REJECTED': {
            label: 'Từ chối',
            color: 'bg-red-100 text-red-600',
            icon: XCircle
        }
    };

    const handleStatusChange = (articleId, newStatus) => {
        onStatusChange(articleId, newStatus);
        setExpandedDropdown(null);
    };

    const formatAuthors = (authors) => {
        if (!authors || authors.length === 0) return 'Chưa có tác giả';
        if (authors.length === 1) return authors[0].name || authors[0];
        return `${authors[0].name || authors[0]} và ${authors.length - 1} người khác`;
    };

    if (loading) {
        return (
            <SimpleLoading />
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="divide-y divide-gray-200">
                {articles.length > 0 ? (
                    articles.map((article) => {
                        const statusInfo = statusConfig[article.status] || statusConfig['PENDING'];
                        const StatusIcon = statusInfo.icon;

                        return (
                            <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start space-x-4">
                                    <div className="w-26 h-23 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                        {article.featuredImage ? (
                                            <img
                                                src={article.featuredImage}
                                                alt={article.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <FileText className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 cursor-pointer line-clamp-1">
                                                        {article.title || 'Không có tiêu đề'}
                                                    </h3>

                                                    <span className={`px-2 py-1 text-xs rounded-full font-medium flex items-center space-x-1 ${statusInfo.color}`}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        <span>{statusInfo.label}</span>
                                                    </span>
                                                </div>

                                                {/* Content Preview */}
                                                {article.summary && (
                                                    <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                                                        {article.summary}
                                                    </p>
                                                )}

                                                <div className="flex items-center space-x-6 text-sm text-gray-500 flex-wrap">
                                                    <div className="flex items-center space-x-1">
                                                        <User className="w-4 h-4" />
                                                        <span>{formatAuthors(article.authors)}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{article.created}</span>
                                                    </div>

                                                    {article.category && (
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full flex items-center space-x-1">
                                                            <Tag className="w-3 h-3" />
                                                            <span>{article.category.name}</span>
                                                        </span>
                                                    )}
                                                    {article.summary && article.audioUrl && article.embedding ? (
                                                        <div className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-lg flex items-center space-x-2">
                                                            <CheckCircle className="w-4 h-4" />
                                                            <span>Các thông tin do AI xử lý đã chuẩn bị xong</span>
                                                        </div>
                                                    ) : (
                                                        <div className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg flex items-center space-x-2">
                                                            <XCircle className="w-4 h-4" />
                                                            <span>Các thông tin do AI xử lý chưa chuẩn bị xong</span>
                                                        </div>
                                                    )}
                                                </div>


                                            </div>

                                            <div className="flex items-center space-x-2 ml-4">
                                                {/* <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button> */}

                                                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(article.id, article.title)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>

                                                <div className="relative">
                                                    <button
                                                        onClick={() => setExpandedDropdown(expandedDropdown === article.id ? null : article.id)}
                                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>

                                                    {expandedDropdown === article.id && (
                                                        <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                                            <div className="py-1">
                                                                <div className="px-3 py-2 text-xs text-gray-500 font-medium border-b border-gray-100">
                                                                    Thay đổi trạng thái
                                                                </div>
                                                                {Object.entries(statusConfig).map(([status, config]) => {
                                                                    if (status === article.status) return null;
                                                                    const Icon = config.icon;
                                                                    return (
                                                                        <button
                                                                            key={status}
                                                                            onClick={() => handleStatusChange(article.id, status)}
                                                                            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                                                        >
                                                                            <Icon className="w-4 h-4" />
                                                                            <span>{config.label}</span>
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="p-12 text-center">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Không tìm thấy bài viết nào</p>
                    </div>
                )}
            </div>

            {expandedDropdown && (
                <div
                    className="fixed inset-0 z-5"
                    onClick={() => setExpandedDropdown(null)}
                />
            )}
        </div>
    );
};

export default ArticlesList;