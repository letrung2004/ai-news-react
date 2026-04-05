import React from "react";
import { Eye, Edit3, Trash2, Calendar } from "lucide-react";

const TopArticleTable = ({ articles = [] }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">Top bài viết</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Danh sách các bài báo được xem nhiều</p>
                    </div>
                    <button className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-xs font-medium">
                        Xem tất cả
                    </button>
                </div>
            </div>

            {articles.length === 0 ? (
                <div className="py-16 text-center text-sm text-gray-400">Không có dữ liệu</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {['Tiêu đề', 'Danh mục', 'Tác giả', 'Ngày', 'Lượt xem', 'Thao tác'].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {articles.map((article) => (
                                <tr key={article.id} className="hover:bg-gray-50/70 transition-colors">
                                    {/* Tiêu đề */}
                                    <td className="px-5 py-4">
                                        <div className="text-sm font-medium text-gray-800 line-clamp-2 max-w-xs">
                                            {article.title}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-0.5">#{article.id?.slice(0, 8)}</div>
                                    </td>

                                    {/* Danh mục */}
                                    <td className="px-5 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                            {article.category}
                                        </span>
                                    </td>

                                    {/* Tác giả */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                                                {article.author?.charAt(0)?.toUpperCase() ?? '?'}
                                            </div>
                                            <span className="text-sm text-gray-700">{article.author}</span>
                                        </div>
                                    </td>

                                    {/* Ngày */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <Calendar className="w-3 h-3" />
                                            {article.date}
                                        </div>
                                    </td>

                                    {/* Lượt xem */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                                            <Eye className="w-3 h-3 text-gray-400" />
                                            {article.views}
                                        </div>
                                    </td>

                                    {/* Thao tác */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-1">
                                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                <Eye className="w-3.5 h-3.5" />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TopArticleTable;