import React from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";

const FilterBar = ({
    searchTerm,
    onSearchChange,
    selectOptions = [],
    selectValue,
    onSelectChange,
    placeholder = "Tìm kiếm...",
    total,
    label = "bài viết",
}) => {
    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">

            {/* Search input — cùng style SearchBar header */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => onSearchChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full text-sm bg-gray-50 border border-gray-200 rounded-full pl-9 pr-9 py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white transition-all"
                />
                {searchTerm && (
                    <button
                        onClick={() => onSearchChange("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            {/* Select filter */}
            {selectOptions.length > 0 && (
                <div className="relative">
                    <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                        value={selectValue}
                        onChange={e => onSelectChange(e.target.value)}
                        className="text-sm bg-gray-50 border border-gray-200 rounded-full pl-9 pr-8 py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white transition-all appearance-none cursor-pointer text-gray-700"
                    >
                        <option value="all">Tất cả</option>
                        {selectOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Total count */}
            {total !== undefined && (
                <span className="text-sm text-gray-400 whitespace-nowrap self-center px-1">
                    <span className="font-semibold text-gray-700">{total}</span> {label}
                </span>
            )}
        </div>
    );
};

export default FilterBar;