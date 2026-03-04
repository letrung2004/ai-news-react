import React from "react";
import { Link } from "react-router-dom";
import useRecommendations from "../../hooks/useRecommendations";

const RecommendedArticles = () => {
    const { recommendations, loading, isLoggedIn } = useRecommendations(6);

    if (!isLoggedIn) return null;

    if (loading) return (
        <section className="mt-10">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-green-500 rounded-full" />
                <div className="h-4 w-44 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1 h-px bg-gray-200 ml-1" />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg border border-gray-100 overflow-hidden flex gap-3 p-3">
                        <div className="w-20 h-16 bg-gray-200 rounded animate-pulse flex-shrink-0" />
                        <div className="flex-1 space-y-2 pt-1">
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
                            <div className="h-3 bg-gray-200 rounded animate-pulse" />
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );

    if (!recommendations.length) return null;

    return (
        <section className="mt-10">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-green-500 rounded-full" />
                <h2 className="text-base font-bold text-gray-900 tracking-tight">Dành cho bạn</h2>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Đề xuất dựa trên lịch sử đọc của bạn
                </span>
                <div className="flex-1 h-px bg-gray-200 ml-1" />
            </div>

            {/* 2 hàng x 3 cột — horizontal card nhỏ gọn */}
            <div className="grid grid-cols-3 gap-3">
                {recommendations.map((article, i) => (
                    <Link
                        key={article.id || i}
                        to={`/detail/${article.slug}`}
                        state={{ articleSlug: article.slug }}
                        className="group flex gap-3 bg-white rounded-lg border border-gray-100 hover:border-green-200 hover:shadow-sm transition-all duration-200 p-3"
                    >
                        {/* Thumbnail nhỏ */}
                        <div className="flex-shrink-0 w-37 h-25 rounded overflow-hidden bg-gray-100">
                            {article.featuredImage ? (
                                <img
                                    src={article.featuredImage}
                                    alt={article.title}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">📰</div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-medium text-green-600">
                                    {article.category?.name || 'Tin tức'}
                                </span>
                                <h3 className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 mt-0.5 group-hover:text-green-600 transition-colors">
                                    {article.title}
                                </h3>
                               
                            </div>
                            {article.publishDate && (
                                <span className="text-xs text-gray-400 mt-1 block">
                                    {new Date(article.publishDate).toLocaleDateString('vi-VN', {
                                        day: 'numeric', month: 'numeric', year: 'numeric',
                                        timeZone: 'UTC'
                                    })}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default RecommendedArticles;