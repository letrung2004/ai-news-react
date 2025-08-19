import React from "react";
import { Eye, Edit, Trash2, MoreVertical, User, Calendar, Eye as EyeIcon } from "lucide-react";

const ArticlesList = ({ articles, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="divide-y divide-gray-200">
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start space-x-4">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                                />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 cursor-pointer">
                                                    {article.title}
                                                </h3>
                                                {article.featured && (
                                                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                                                        Nổi bật
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {article.excerpt}
                                            </p>

                                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                <div className="flex items-center space-x-1">
                                                    <User className="w-4 h-4" />
                                                    <span>{article.author}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{article.publishDate}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <EyeIcon className="w-4 h-4" />
                                                    <span>{article.views.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <span>{article.comments} bình luận</span>
                                                </div>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 ml-4">
                                            <div className="flex items-center space-x-1">
                                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(article.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Không tìm thấy bài viết nào</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticlesList;
