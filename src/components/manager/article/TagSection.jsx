import React, { useState } from "react";
import { Hash, Search, X } from "lucide-react";

const TAG_COLORS = [
    "bg-green-50 text-green-700 border-green-200",
    "bg-blue-50 text-blue-700 border-blue-200",
    "bg-violet-50 text-violet-700 border-violet-200",
    "bg-amber-50 text-amber-700 border-amber-200",
    "bg-pink-50 text-pink-700 border-pink-200",
    "bg-cyan-50 text-cyan-700 border-cyan-200",
    "bg-orange-50 text-orange-700 border-orange-200",
    "bg-rose-50 text-rose-700 border-rose-200",
];

const TagSection = ({ tags, selectedTags, onTagChange }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = tags.filter((t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-2">
                <Hash className="w-3.5 h-3.5 text-pink-500" />
                <span className="text-xs font-medium text-gray-600">Thẻ</span>
                {selectedTags.length > 0 && (
                    <span className="ml-auto text-xs text-green-600 font-medium">{selectedTags.length} đã chọn</span>
                )}
            </div>

            <div className="p-4 space-y-3">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Tìm thẻ..."
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

                {/* Tags dạng pill click */}
                <div className="max-h-40 overflow-y-auto">
                    {filtered.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                            {filtered.map((tag, i) => {
                                const isSelected = selectedTags.includes(tag.id);
                                return (
                                    <button
                                        key={tag.id}
                                        onClick={() => onTagChange(tag.id)}
                                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                                            isSelected
                                                ? TAG_COLORS[i % TAG_COLORS.length] + " shadow-sm"
                                                : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <Hash className="w-3 h-3" />
                                        {tag.name}
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-xs text-gray-400 text-center py-3">Không tìm thấy thẻ</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TagSection;