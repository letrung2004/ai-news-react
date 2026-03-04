import React from "react";
import { Link } from "react-router-dom";

const FeaturedArticle = ({ article }) => {
    if (!article) return (
        <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center" style={{ height: "420px" }}>
            <p className="text-gray-500">Không có bài viết nổi bật</p>
        </div>
    );

    return (
        <Link to={`/detail/${article.slug}`} state={{ articleSlug: article.slug }} className="block group">
            <div className="relative rounded-xl overflow-hidden shadow-lg" style={{ height: "420px" }}>
                <img src={article.featuredImage} alt={article.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block bg-green-500 text-xs font-semibold px-2.5 py-1 rounded mb-3 tracking-wide uppercase">
                        {article.category?.name || "Tin tức"}
                    </span>
                    <h2 className="text-2xl font-bold leading-tight mb-2 group-hover:text-green-300 transition-colors">
                        {article.title}
                    </h2>
                    {/* SUMMARY */}
                    {article.summary && (
                        <p className="text-sm text-gray-200 line-clamp-2 mb-3 leading-relaxed">
                            {article.summary}
                        </p>
                    )}
                    <div className="flex items-center text-xs text-gray-400 gap-2">
                        <span>{article.authors?.length > 0 ? article.authors.join(", ") : "Admin"}</span>
                        <span>·</span>
                        <span>{article.created}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default FeaturedArticle;