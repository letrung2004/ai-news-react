import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center space-x-2">
                <button
                    className="px-3 py-2 border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                >
                    Trước
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        className={`px-3 py-2 rounded-lg transition-colors ${page === currentPage
                                ? "bg-green-500 text-white"
                                : "border border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className="px-3 py-2 border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                >
                    Sau
                </button>
            </div>
        </div>
    );
}
