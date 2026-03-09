import React from "react";
import { Hash, Edit, Trash2, Search, X } from "lucide-react";

const TAG_COLORS = [
    { bg: "bg-green-50",  text: "text-green-600",  dot: "bg-green-400" },
    { bg: "bg-blue-50",   text: "text-blue-600",   dot: "bg-blue-400" },
    { bg: "bg-violet-50", text: "text-violet-600", dot: "bg-violet-400" },
    { bg: "bg-amber-50",  text: "text-amber-600",  dot: "bg-amber-400" },
    { bg: "bg-pink-50",   text: "text-pink-600",   dot: "bg-pink-400" },
    { bg: "bg-cyan-50",   text: "text-cyan-600",   dot: "bg-cyan-400" },
    { bg: "bg-orange-50", text: "text-orange-600", dot: "bg-orange-400" },
    { bg: "bg-rose-50",   text: "text-rose-600",   dot: "bg-rose-400" },
];

const TagList = ({ tags = [], searchTerm, setSearchTerm, handleDelete }) => {
    const tagList = tags?.result || [];

    const filtered = tagList.filter(
        (t) =>
            t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-gray-900">Danh sách thẻ</h3>
                            <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                                {filtered.length}
                            </span>
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Tìm thẻ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-9 py-2 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white transition-all"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Tags grid */}
                <div className="p-6">
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {filtered.map((tag, index) => {
                                const color = TAG_COLORS[index % TAG_COLORS.length];
                                return (
                                    <div
                                        key={tag.id}
                                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group"
                                    >
                                        {/* Tag pill */}
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${color.bg} flex-shrink-0`}>
                                            <Hash className={`w-3 h-3 ${color.text}`} />
                                            <span className={`text-xs font-semibold ${color.text}`}>{tag.name}</span>
                                        </div>

                                        {/* Description + count */}
                                        <div className="flex-1 min-w-0">
                                            {tag.description ? (
                                                <p className="text-xs text-gray-500 truncate">{tag.description}</p>
                                            ) : (
                                                tag.count > 0 && (
                                                    <p className="text-xs text-gray-400">{tag.count} bài viết</p>
                                                )
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                            <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                <Edit className="w-3 h-3" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(tag)}
                                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <Hash className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                            <p className="text-sm text-gray-400">
                                {searchTerm ? `Không tìm thấy "${searchTerm}"` : "Chưa có thẻ nào"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TagList;