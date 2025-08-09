import React, { useEffect, useState } from 'react';
import ListCategories from '../../components/ListCategories';
import PopularArticles from '../../components/PopularArticles';
import usePublicArticles from '../../hooks/usePublicArticles';
import { useParams } from 'react-router-dom';
import SimpleLoading from '../../components/SimpleLoading';

const ListArticle = () => {
    const { categorySlug } = useParams();
    const { articles, loading, error, loadArticlesByCategory } = usePublicArticles(categorySlug);

    useEffect(() => {
        if (categorySlug) {
            loadArticlesByCategory(categorySlug);
        }
    }, [categorySlug]);

    console.log("article:", articles);


    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <button className="hover:text-green-600 cursor-pointer">
                                Trang chủ
                            </button>
                        </li>
                        <li><i className="fas fa-chevron-right text-xs"></i></li>
                        <li className="text-gray-800">Danh sách bài viết</li>
                    </ol>
                </nav>

                {/* Main Content */}
                {loading ? (
                    <SimpleLoading />
                ) : (
                    <div className="grid grid-cols-12 gap-8">
                        {/* Main Content */}
                        <div className="col-span-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-8">Danh sách bài viết</h1>

                            <div className="space-y-8">
                                <div className="space-y-8">
                                    {articles?.length === 0 ? (
                                        <div className="text-center py-10 bg-white rounded-lg shadow">
                                            <p className="text-gray-500 text-lg italic">
                                                Không có bài viết
                                            </p>
                                        </div>
                                    ) : (
                                        articles.map((article) => (
                                            <article
                                                key={article.id}
                                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                            >
                                                <div className="flex">
                                                    <div className="w-80 h-48 flex-shrink-0 mt-5 pl-3">
                                                        <img
                                                            src={article.featuredImage}
                                                            alt={article.title}
                                                            className="w-full h-full object-cover"
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
                                                                            ? article.authors.join(', ')
                                                                            : 'Admin'}
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
                                        ))
                                    )}
                                </div>

                            </div>

                            {/* Pagination */}
                            <div className="mt-12 flex justify-center">
                                <nav className="flex items-center space-x-2">
                                    <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                                        Trước
                                    </button>
                                    <button className="px-3 py-2 text-sm bg-green-600 text-white rounded">
                                        1
                                    </button>
                                    <button className="px-3 py-2 text-sm text-gray-700 hover:text-green-600">
                                        2
                                    </button>
                                    <button className="px-3 py-2 text-sm text-gray-700 hover:text-green-600">
                                        3
                                    </button>
                                    <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                                        Sau
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-span-4">
                            <div className="space-y-8">
                                {/* Popular Articles Component */}
                                <PopularArticles title="Tin phổ biến" limit={5} />

                                {/* Categories Component */}
                                <ListCategories />
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default ListArticle;