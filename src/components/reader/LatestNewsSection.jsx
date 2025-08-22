import React from 'react';
import { Link } from 'react-router-dom';

const LatestNewsSection = ({ articles }) => {
    return (
        <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tin Mới Nhất</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles && articles.length > 0 ? (
                    articles.map((article, index) => (
                        <Link
                            key={article.id || index}
                            to={`/detail/${article.slug}`}
                            state={{ articleSlug: article.slug }}
                        >
                            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col">
                                <div className="h-50 overflow-hidden flex-shrink-0">
                                    <img
                                        src={article.featuredImage}
                                        alt={article.title}
                                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <div className="p-4 flex flex-col flex-grow">
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2 w-fit">
                                        {article.category?.name || 'Tin tức'}
                                    </span>

                                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 flex-grow">
                                        {article.title}
                                    </h3>

                                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                                        <span>{article.authors?.[0] || 'Admin'}</span>
                                        <span>{article.created}</span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))
                ) : (
                    Array.from({ length: 6 }, (_, index) => (
                        <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                            <div className="h-48 bg-gray-200 flex items-center justify-center flex-shrink-0">
                                <p className="text-gray-500">Không có bài viết</p>
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2 w-fit">Tin tức</span>
                                <h3 className="font-bold text-gray-800 mb-2 flex-grow">
                                    Đang tải bài viết...
                                </h3>
                                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                                    <span>Admin</span>
                                    <span>Đang tải...</span>
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
};

export default LatestNewsSection;