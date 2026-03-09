// components/manager/ArticleRow.jsx
import { User, Calendar, Tag } from "lucide-react";
import StatusBadge from "./StatusBadge";

const ArticleRow = ({ article }) => (
    <div className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/70 transition-colors group border-b border-gray-50 last:border-0">

        {/* Thumbnail */}
        <div className="w-20 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
            {article.featuredImage ? (
                <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xl bg-gray-50">
                    📰
                </div>
            )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
            {/* Title */}
            <p className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-green-600 transition-colors leading-snug mb-1.5">
                {article.title}
            </p>

            {/* Meta row */}
            <div className="flex items-center gap-3 flex-wrap">
                {article.authors?.[0] && (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <User className="w-3 h-3" />
                        {article.authors[0]}
                    </span>
                )}
                {article.created && (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.created).toLocaleDateString("vi-VN")}
                    </span>
                )}
                {article.category?.name && (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Tag className="w-3 h-3" />
                        {article.category.name}
                    </span>
                )}
            </div>
        </div>

        {/* Status badge — luôn visible */}
        <div className="flex-shrink-0">
            <StatusBadge status={article.status} />
        </div>
    </div>
);

export default ArticleRow;