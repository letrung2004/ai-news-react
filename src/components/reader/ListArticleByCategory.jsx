import React from "react";
import { Link } from "react-router-dom";

const ListArticleByCategory = ({ articles }) => {
    if (!articles || articles.length === 0) {
        return (
            <div className="text-center py-10 bg-white rounded-lg shadow">
                <p className="text-gray-500 text-lg italic">Không có bài viết</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {articles.map((article) => (
                <Link
                    key={article.id}
                    to={`/detail/${article.slug}`}
                    state={{ articleSlug: article.slug }}
                    className="block"
                >
                    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="flex">
                            <div className="w-80 h-48 flex-shrink-0 mt-5 pl-3 pb-4">
                                <img
                                    src={article.featuredImage}
                                    alt={article.title}
                                    className="w-full h-full rounded-lg object-cover group-hover:scale-105"
                                />
                            </div>
                            <div className="flex-1 p-6">
                                <div className="flex flex-col h-full">
                                    <div className="flex-1">
                                        <div className="mb-2">
                                            <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                                {article.category.name}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 cursor-pointer">
                                            {article.title}
                                        </h2>
                                        <div className="flex items-center text-sm text-gray-500 mb-3">
                                            <span>
                                                {article.authors?.length > 0
                                                    ? article.authors.join(", ")
                                                    : "Admin"}
                                            </span>
                                            <span className="mx-2">•</span>
                                            <span>{article.created}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
                                            Đọc thêm
                                            <svg
                                                className="w-4 h-4 ml-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>
                                    </div>
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
