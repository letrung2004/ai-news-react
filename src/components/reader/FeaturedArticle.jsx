import React from "react";
import { Link } from "react-router-dom";

const FeaturedArticle = ({ article }) => {
    if (!article) {
        return (
            <div className="relative h-104 rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Không có bài viết nổi bật</p>
            </div>
        );
    }

    return (
        <Link to={`/detail/${article.slug}`} state={{ articleSlug: article.slug }}>
            <div className="relative h-104 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block bg-blue-600 text-xs px-2 py-1 rounded mb-3">
                        {article.category?.name || "Tin tức"}
                    </span>
                    <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                    <div className="flex items-center text-sm text-gray-300">
                        <span>
                            {article.authors?.length > 0
                                ? article.authors.join(", ")
                                : "Admin"}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{article.created}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default FeaturedArticle;
