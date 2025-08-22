import React from 'react';
import { Link } from 'react-router-dom';

const SideArticles = ({ articles }) => {

    return (
        <div className="space-y-4">
            {articles.length > 0 ? (
                articles.map((article, index) => (
                    <Link
                        key={article.id || index}
                        to={`/detail/${article.slug}`}
                        state={{ articleSlug: article.slug }}
                        className="block"
                    >
                        <div className="relative h-50 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={article.featuredImage}
                                alt={article.title}
                                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                            <div className="absolute inset-0 p-4 text-white flex flex-col justify-end">
                                <span className="inline-block bg-purple-600 text-xs px-2 py-1 rounded mb-2 w-fit">
                                    {article.category?.name || 'Tin tức'}
                                </span>
                                <h3 className="text-sm font-bold line-clamp-2 leading-tight">{article.title}</h3>
                                <div className="flex items-center justify-between text-xs text-gray-200 mt-2">
                                    <span>{article.authors?.[0] || 'Admin'}</span>
                                    <span>{article.created}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                // Placeholder khi không có bài viết
                Array.from({ length: 2 }, (_, index) => (
                    <div key={index} className="relative h-40 rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Không có bài viết</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default SideArticles;