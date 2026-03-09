// Pagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Smart pagination — hiển thị tối đa 7 nút số, dùng "…" khi totalPages > 7.
 * Không bao giờ render 30 ô một lúc dù có nhiều trang.
 */
function getPageRange(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    if (current <= 4) return [1, 2, 3, 4, 5, '…', total];
    if (current >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
    return [1, '…', current - 1, current, current + 1, '…', total];
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const range = getPageRange(currentPage, totalPages);
    const canPrev = currentPage > 1;
    const canNext = currentPage < totalPages;

    const btnBase =
        'inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-all duration-150 select-none';
    const btnActive = 'bg-green-500 text-white shadow-sm shadow-green-200';
    const btnDefault = 'border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300';
    const btnDisabled = 'border border-gray-100 text-gray-300 cursor-not-allowed';
    const btnNav = `${btnBase} border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:border-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed`;

    return (
        <div className="flex items-center justify-between">
            {/* Info text */}
            <p className="text-xs text-gray-400 hidden sm:block">
                Trang <span className="font-medium text-gray-600">{currentPage}</span> / {totalPages}
            </p>

            <div className="flex items-center gap-1 mx-auto sm:mx-0">
                {/* Prev */}
                <button
                    className={btnNav}
                    onClick={() => canPrev && onPageChange(currentPage - 1)}
                    disabled={!canPrev}
                    aria-label="Trang trước"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                {range.map((page, idx) =>
                    page === '…' ? (
                        <span
                            key={`ellipsis-${idx}`}
                            className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-300 select-none"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            className={`${btnBase} ${page === currentPage ? btnActive : btnDefault}`}
                            onClick={() => onPageChange(page)}
                            aria-current={page === currentPage ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    )
                )}

                {/* Next */}
                <button
                    className={btnNav}
                    onClick={() => canNext && onPageChange(currentPage + 1)}
                    disabled={!canNext}
                    aria-label="Trang sau"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}