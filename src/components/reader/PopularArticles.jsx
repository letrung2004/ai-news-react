import React from 'react';
import { Link } from 'react-router-dom';
import usePublicArticles from '../../hooks/usePublicArticles';

const PopularArticles = ({ title = "Phổ biến nhất", limit = 5 }) => {
    const { articles } = usePublicArticles();
    const displayArticles = articles?.slice(0, limit) || [];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-1 h-6 bg-green-500 rounded-full" />
                <h3 className="text-base font-bold text-gray-900">{title}</h3>
            </div>

            <div className="divide-y divide-gray-50">
                {displayArticles.length > 0 ? displayArticles.map((article, index) => (
                    <Link
                        key={article.id || index}
                        to={`/detail/${article.slug}`}
                        state={{ articleSlug: article.slug }}
                        className="group flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                        {/* Rank */}
                        <span className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center mt-0.5 ${
                            index === 0 ? 'bg-green-500 text-white' :
                            index === 1 ? 'bg-green-400 text-white' :
                            index === 2 ? 'bg-green-300 text-white' :
                            'bg-gray-100 text-gray-400'
                        }`}>
                            {index + 1}
                        </span>

                        {/* Thumbnail */}
                        <div className="flex-shrink-0 w-27 rounded-lg overflow-hidden" style={{ height: '70px' }}>
                            <img
                                src={article.featuredImage}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2 leading-snug mb-1.5">
                                {article.title}
                            </h4>
                            <div className="flex items-center justify-between">
                                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                                    {article.category?.name || 'Tin tức'}
                                </span>
                                <span className="text-xs text-gray-400">{article.created}</span>
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