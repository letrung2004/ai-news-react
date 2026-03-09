import React from "react";
import { Search, Trash2, Edit, Tag, X } from "lucide-react";

const CategoryList = ({ categories = [], searchTerm, setSearchTerm, onDelete }) => {
    const filtered = categories.filter(
        (c) =>
            c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-gray-900">Danh sách danh mục</h3>
                            <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                                {filtered.length}
                            </span>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Tìm danh mục..."
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

                {/* List */}
                <div className="divide-y divide-gray-50">
                    {filtered.length > 0 ? (
                        filtered.map((category) => (
                            <div
                                key={category.id || category._id}
                                className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors group"
                            >
                                {/* Icon */}
                                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Tag className="w-3.5 h-3.5 text-green-500" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium text-gray-800 truncate">{category.name}</p>
                                        {category.count > 0 && (
                                            <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md flex-shrink-0">
                                                {category.count} bài
                                            </span>
                                        )}
                                    </div>
                                    {category.description && (
                                        <p className="text-xs text-gray-400 mt-0.5 truncate">{category.description}</p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                        <Edit className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(category)}
                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-16 text-center">
                            <Tag className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                            <p className="text-sm text-gray-400">
                                {searchTerm ? `Không tìm thấy "${searchTerm}"` : "Chưa có danh mục nào"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;