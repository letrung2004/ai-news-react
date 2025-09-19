// src/components/manager/TopArticleTable.jsx
import React from "react";
import { Eye, Edit3, Trash2, Calendar, Star } from "lucide-react";

const TopArticleTable = ({ articles }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Top bài viết
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Danh sách các bài báo được xem nhiều
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
                        Xem tất cả
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Tiêu đề
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Danh mục
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Tác giả
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Ngày
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Lượt xem
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {articles.map((article) => {
                            const categoryColor = article.category;
                            return (
                                <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-start space-x-3">
                                            {article.featured && (
                                                <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                                            )}
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 line-clamp-2 max-w-xs">
                                                    {article.title}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    ID: {article.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColor}`}
                                        >
                                            {article.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                                                {article.author.charAt(0)}
                                            </div>
                                            <span className="text-sm text-gray-900">{article.author}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                                            <Calendar className="w-3 h-3" />
                                            <span>{article.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                                            <Eye className="w-3 h-3" />
                                            <span className="font-medium">{article.views}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="p-1 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-1 text-green-600 hover:bg-green-100 rounded-md transition-colors"
                                                title="Xem"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-1 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                                                title="Xóa"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopArticleTable;
