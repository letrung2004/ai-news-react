import React from 'react';
import { Link } from 'react-router-dom';

const SideArticles = ({ articles }) => (
    <div className="flex flex-col gap-4 h-full">
        {articles.length > 0 ? articles.map((article, index) => (
            <Link key={article.id || index} to={`/detail/${article.slug}`}
                state={{ articleSlug: article.slug }} className="block group flex-1">
                <div className="relative rounded-xl overflow-hidden shadow-md" style={{ height: "196px" }}>
                    <img src={article.featuredImage} alt={article.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <span className="inline-block bg-green-500 text-xs font-semibold px-2 py-0.5 rounded mb-2 w-fit uppercase">
                            {article.category?.name || 'Tin tức'}
                        </span>
                        <h3 className="text-sm font-bold line-clamp-2 leading-snug group-hover:text-green-300 transition-colors mb-1.5">
                            {article.title}
                        </h3>
                        {/* SUMMARY - 1 dòng */}
                        {article.summary && (
                            <p className="text-xs text-gray-300 line-clamp-1 mb-1.5">{article.summary}</p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{article.authors?.[0] || 'Admin'}</span>
                            <span>{article.created}</span>
                        </div>
                    </div>
                </div>
            </Link>
        )) : Array.from({ length: 2 }, (_, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center" style={{ height: "196px" }}>
                <p className="text-gray-500 text-sm">Không có bài viết</p>
            </div>
        ))}
    </div>
);

export default SideArticles;