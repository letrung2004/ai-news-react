import React, { useState } from 'react';
import usePublicArticles from '../../hooks/usePublicArticles';
import SimpleLoading from '../../components/SimpleLoading';
import { Link } from 'react-router-dom';
import { Error } from '../../components/Error';

const HomePage = () => {
    const { articles, loading, error } = usePublicArticles();
    console.log('Articles:', articles);

    if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

    const safeArticles = articles || [];
    const featuredArticle = safeArticles[0];
    const subArticle = safeArticles.slice(1, 4);
    const orderArticle = safeArticles.slice(4);


    return (
        <>
            {/* Breaking News Ticker */}
            <div className="bg-red-600 text-white py-2">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center">
                        <span className="font-bold mr-4">Tin mới:</span>
                        {featuredArticle ? (
                            <span className="text-sm">{featuredArticle.title}</span>
                        ) : (
                            <span className="text-sm">Bộ Nội vụ đề xuất tăng lương tối thiểu vùng 7,2% từ 1/1/2026</span>
                        )}

                    </div>
                </div>
            </div>

            {/* Main Content */}
            {loading ? (
                <SimpleLoading />
            ) : (
                <main className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-12 gap-6">
                        {/* Featured Article */}
                        <div className="col-span-7">
                            {featuredArticle ? (
                                <Link
                                    to={`/detail/${featuredArticle.slug}`}
                                    state={{ articleSlug: featuredArticle.slug }}
                                >
                                    <div className="relative h-104 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                                        <img
                                            src={featuredArticle.featuredImage}
                                            alt={featuredArticle.title}
                                            className="w-full h-full object-cover object-top"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <span className="inline-block bg-blue-600 text-xs px-2 py-1 rounded mb-3">
                                                {featuredArticle.category?.name || 'Tin tức'}
                                            </span>
                                            <h2 className="text-2xl font-bold mb-2">{featuredArticle.title}</h2>
                                            <div className="flex items-center text-sm text-gray-300">
                                                <span>{featuredArticle.authors?.length > 0 ? featuredArticle.authors.join(', ') : 'Admin'}</span>
                                                <span className="mx-2">•</span>
                                                <span>{featuredArticle.created}</span>
                                            </div>
                                        </div>
                                    </div>

                                </Link>

                            ) : (
                                <div className="relative h-104 rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
                                    <p className="text-gray-500">Không có bài viết nổi bật</p>
                                </div>
                            )}
                        </div>

                        {/* Side Articles */}
                        <div className="col-span-5 space-y-4">
                            {subArticle.length > 0 ? (
                                subArticle.map((article, index) => (
                                    <Link
                                        key={article.id || index}
                                        to={`/detail/${article.slug}`}
                                        state={{ articleSlug: article.slug }}
                                        className="block"
                                    >
                                        <div className="relative h-32 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                                            <img
                                                src={article.featuredImage}
                                                alt={article.title}
                                                className="w-full h-full object-cover object-top"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                                            <div className="absolute inset-0 p-4 text-white flex flex-col justify-end">
                                                <span className="inline-block bg-purple-600 text-xs px-2 py-1 rounded mb-2 w-fit">
                                                    {article.category?.name || 'Tin tức'}
                                                </span>
                                                <h3 className="text-sm font-bold line-clamp-2">{article.title}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                Array.from({ length: 3 }, (_, index) => (
                                    <div key={index} className="relative h-32 rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
                                        <p className="text-gray-500 text-sm">Không có bài viết</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Latest News Section */}
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tin Mới Nhất</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {orderArticle.length > 0 ? (
                                orderArticle.map((article, index) => (
                                    <Link
                                        key={article.id || index}
                                        to={`/detail/${article.slug}`}
                                        state={{ articleSlug: article.slug }}
                                    >
                                        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                            <div className="h-48 overflow-hidden">
                                                <img
                                                    src={article.featuredImage}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                                                    {article.category?.name || 'Tin tức'}
                                                </span>
                                                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                {/* <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                                {article.summary || 'Đang cập nhật nội dung...'}
                                            </p> */}
                                                <div className="flex items-center justify-between text-xs text-gray-500">
                                                    <span>{article.authors?.[0] || 'Admin'}</span>
                                                    <span>{article.created}</span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))
                            ) : (
                                // Placeholder khi không có order articles
                                Array.from({ length: 6 }, (_, index) => (
                                    <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                                            <p className="text-gray-500">Không có bài viết</p>
                                        </div>
                                        <div className="p-4">
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">Tin tức</span>
                                            <h3 className="font-bold text-gray-800 mb-2">
                                                Đang tải bài viết...
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-3">
                                                Vui lòng đợi trong giây lát...
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>Admin</span>
                                                <span>Đang tải...</span>
                                            </div>
                                        </div>
                                    </article>
                                ))
                            )}
                        </div>
                    </section>
                </main >
            )}
        </>
    );
};

export default HomePage;