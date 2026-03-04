import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { articleService } from "../../services/articleService";

const RelatedArticles = ({ currentArticleId, categorySlug, categoryName }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!categorySlug) return;
        const fetch = async () => {
            setLoading(true);
            try {
                const result = await articleService.getAllArticleByCategory(categorySlug, 1);
                const list = result?.data || (Array.isArray(result) ? result : []);
                // Lọc bỏ bài hiện tại, lấy tối đa 4
                setArticles(list.filter(a => a.id !== currentArticleId).slice(0, 4));
            } catch (err) {
                console.error('Error loading related articles:', err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [categorySlug, currentArticleId]);

    if (loading) return (
        <div className="py-8 border-t border-gray-100">
            <div className="h-4 w-32 bg-gray-100 rounded animate-pulse mb-6" />
            <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                        <div className="w-20 h-16 bg-gray-100 rounded flex-shrink-0 animate-pulse" />
                        <div className="flex-1 space-y-2 pt-1">
                            <div className="h-3 bg-gray-100 rounded animate-pulse" />
                            <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (!articles.length) return null;

    return (
        <section className="pt-8 mt-8 border-t border-gray-100">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-5 bg-green-500 rounded-full flex-shrink-0" />
                <h2 className="text-sm font-semibold text-gray-800 tracking-wide uppercase">
                    Bài viết liên quan
                </h2>
                {categoryName && (
                    <span className="text-xs text-gray-400 font-normal normal-case tracking-normal">
                        trong {categoryName}
                    </span>
                )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {articles.map((article, index) => (
                    <Link
                        key={article.id}
                        to={`/detail/${article.slug}`}
                        className="flex gap-3 group"
                    >
                        {/* Thumbnail */}
                        <div className="w-35 h-25 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                            {article.featuredImage ? (
                                <img
                                    src={article.featuredImage}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-300 text-lg">📰</span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            {/* Số thứ tự */}
                            <span className="text-xs font-bold text-green-500 mb-1 block">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 group-hover:text-green-600 transition-colors">
                                {article.title}
                            </p>
                            {article.publishDate && (
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(article.publishDate).toLocaleDateString('vi-VN', {
                                        day: 'numeric', month: 'numeric', year: 'numeric',
                                        timeZone: 'UTC'
                                    })}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default RelatedArticles;