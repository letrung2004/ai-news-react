import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Flame } from "lucide-react";
import { articleService } from "../../services/articleService";

const PopularArticles = ({ title = "Phổ biến nhất", limit = 5 }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await articleService.getTrendingArticle();
                setArticles(res.data?.slice(0, limit) || []);
            } catch (err) {
                console.error("Error loading trending:", err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [limit]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-1 h-6 bg-green-500 rounded-full" />
                <h3 className="text-base font-bold text-gray-900 flex-1">{title}</h3>
                <Flame className="w-4 h-4 text-orange-400" />
            </div>

            <div className="divide-y divide-gray-50">
                {loading ? (
                    [...Array(limit)].map((_, i) => (
                        <div key={i} className="flex gap-3 px-5 py-4">
                            <div className="w-6 h-6 bg-gray-100 rounded-full animate-pulse flex-shrink-0 mt-0.5" />
                            <div className="w-24 h-16 bg-gray-100 rounded-lg animate-pulse flex-shrink-0" />
                            <div className="flex-1 space-y-2 py-1">
                                <div className="h-3 bg-gray-100 rounded animate-pulse" />
                                <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                                <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                            </div>
                        </div>
                    ))
                ) : articles.length > 0 ? articles.map((article, index) => (
                    <Link
                        key={article.id}
                        to={`/detail/${article.slug}`}
                        state={{ articleSlug: article.slug }}
                        className="group flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                        {/* Rank */}
                        <span className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center mt-0.5 ${
                            index === 0 ? "bg-green-500 text-white" :
                            index === 1 ? "bg-green-400 text-white" :
                            index === 2 ? "bg-green-300 text-white" :
                            "bg-gray-100 text-gray-400"
                        }`}>
                            {index + 1}
                        </span>

                        {/* Thumbnail */}
                        <div className="flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden bg-gray-100">
                            {article.featuredImage ? (
                                <img
                                    src={article.featuredImage}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xl">📰</div>
                            )}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2 leading-snug mb-2">
                                {article.title}
                            </h4>
                            <div className="flex items-center justify-between gap-2">
                                {article.category?.name && (
                                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium truncate">
                                        {article.category.name}
                                    </span>
                                )}
                                {article.viewCount != null && (
                                    <span className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                                        <Eye className="w-3 h-3" />
                                        {article.viewCount.toLocaleString("vi-VN")}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                )) : (
                    <p className="px-5 py-8 text-center text-gray-400 text-sm">Chưa có bài viết</p>
                )}
            </div>
        </div>
    );
};

export default PopularArticles;