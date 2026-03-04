import React from "react";
import { Link } from "react-router-dom";

const ListArticleByCategory = ({ articles }) => {
    if (!articles || articles.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <div className="text-5xl mb-3">📭</div>
                <p className="text-gray-400 font-medium">Không có bài viết trong danh mục này</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {articles.map((article, index) => (
                <Link
                    key={article.id}
                    to={`/detail/${article.slug}`}
                    state={{ articleSlug: article.slug }}
                    className="group block"
                >
                    <article className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-green-200 transition-all duration-300">
                        <div className="flex gap-0">
                            {/* Thumbnail */}
                            <div className="flex-shrink-0 w-64 overflow-hidden" style={{ minHeight: '160px' }}>
                                <img
                                    src={article.featuredImage}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    style={{ minHeight: '160px' }}
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-5 flex flex-col justify-between">
                                <div>
                                    {/* Category + Date */}
                                    <div className="flex items-center gap-2 mb-2.5">
                                        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                                            {article.category?.name || 'Tin tức'}
                                        </span>
                                        <span className="text-xs text-gray-400">{article.created}</span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-snug mb-2 line-clamp-2">
                                        {article.title}
                                    </h2>

                                    {/* Summary */}
                                    {article.summary && (
                                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                            {article.summary}
                                        </p>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>{article.authors?.length > 0 ? article.authors.join(', ') : 'Admin'}</span>
                                    </div>
                                    <span className="text-xs text-green-600 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                                        Đọc thêm
                                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </article>
                </Link>
            ))}
        </div>
    );
};

export default ListArticleByCategory;