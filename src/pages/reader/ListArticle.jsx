import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListCategories from '../../components/reader/ListCategories';
import PopularArticles from '../../components/reader/PopularArticles';
import usePublicArticles from '../../hooks/usePublicArticles';
import SimpleLoading from '../../components/SimpleLoading';
import Breadcrumb from '../../components/Breadcrumb';
import { Error } from '../../components/Error';
import ListArticleByCategory from '../../components/reader/ListArticleByCategory';

const ListArticle = () => {
    const { categorySlug } = useParams();
    const { articles, loading, error, loadArticlesByCategory } = usePublicArticles(categorySlug);

    useEffect(() => {
        if (categorySlug) {
            loadArticlesByCategory(categorySlug);
        }
    }, [categorySlug]);

    // Xử lý error
    if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

    return (
        <>
            {loading ? (
                <SimpleLoading />
            ) : (
                <div className="bg-gray-50 min-h-screen">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <Breadcrumb />

                        <div className="grid grid-cols-12 gap-8">
                            {/* Main Content */}
                            <div className="col-span-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-8">Danh sách bài viết</h1>

                                <ListArticleByCategory articles={articles} />

                                {/* Pagination - chưa xử lý phân trang*/}
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
                    </div>
                </div>
            )}
        </>
    );
};

export default ListArticle;