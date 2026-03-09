// components/manager/ArticleTable.jsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ArticleRow from "./ArticleRow";
import Pagination from "../../Pagination";

const SkeletonRow = () => (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 last:border-0">
        <div className="w-20 h-14 bg-gray-100 rounded-xl animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-2">
            <div className="h-3.5 bg-gray-100 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-100 rounded animate-pulse w-1/3" />
        </div>
        <div className="h-6 w-16 bg-gray-100 rounded-md animate-pulse flex-shrink-0" />
    </div>
);

const ArticleTable = ({ articles, pagination, loading, onPageChange }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
                <h3 className="text-sm font-semibold text-gray-800">Danh sách bài viết</h3>
                {!loading && (
                    <p className="text-xs text-gray-400 mt-0.5">
                        {pagination.totalElements?.toLocaleString("vi-VN")} bài viết
                    </p>
                )}
            </div>
            <Link
                to="/admin/articles"
                className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1 transition-colors"
            >
                Xem tất cả <ArrowRight className="w-3 h-3" />
            </Link>
        </div>

        {/* Body */}
        {loading ? (
            <div>
                {[...Array(6)].map((_, i) => <SkeletonRow key={i} />)}
            </div>
        ) : (articles ?? []).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-300">
                <span className="text-4xl mb-3">📭</span>
                <p className="text-sm">Chưa có bài viết nào</p>
            </div>
        ) : (
            <>
                <div>
                    {(articles ?? []).map(article => (
                        <ArticleRow key={article.id} article={article} />
                    ))}
                </div>

                <div className="px-6 py-4 border-t border-gray-50">
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            </>
        )}
    </div>
);

export default ArticleTable;