import React, { useState } from "react";
import { LayoutGrid, Search, X, Check } from "lucide-react";

const CategorySection = ({ categories, selectedCategory, onCategoryChange }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = categories.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-2">
                <LayoutGrid className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs font-medium text-gray-600">Danh mục</span>
                {selectedCategory && (
                    <span className="ml-auto text-xs text-green-600 font-medium">
                        {categories.find(c => c.id === selectedCategory)?.name}
                    </span>
                )}
            </div>

            <div className="p-4 space-y-3">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Tìm danh mục..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-8 py-2 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white transition-all placeholder-gray-300"
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                {/* List */}
                <div className="max-h-40 overflow-y-auto space-y-1 -mx-1 px-1">
                    {filtered.length > 0 ? filtered.map((cat) => (
                        <label
                            key={cat.id}
                            className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer transition-colors ${
                                selectedCategory === cat.id
                                    ? "bg-green-50 text-green-700"
                                    : "hover:bg-gray-50 text-gray-700"
                            }`}
                        >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                selectedCategory === cat.id
                                    ? "border-green-500 bg-green-500"
                                    : "border-gray-300"
                            }`}>
                                {selectedCategory === cat.id && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                            </div>
                            <input
                                type="radio"
                                checked={selectedCategory === cat.id}
                                onChange={() => onCategoryChange(cat.id)}
                                className="hidden"
                            />
                            <span className="text-sm">{cat.name}</span>
                        </label>
                    )) : (
                        <p className="text-xs text-gray-400 text-center py-3">Không tìm thấy danh mục</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategorySection;