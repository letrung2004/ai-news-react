import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListCategories from '../../components/reader/ListCategories';
import PopularArticles from '../../components/reader/PopularArticles';
import usePublicArticles from '../../hooks/usePublicArticles';
import SimpleLoading from '../../components/SimpleLoading';
import Breadcrumb from '../../components/Breadcrumb';
import { Error } from '../../components/Error';
import ListArticleByCategory from '../../components/reader/ListArticleByCategory';
import Chatbot from '../../components/reader/Chatbot';

const ListArticle = () => {
    const { categorySlug } = useParams();
    const { articles, loading, error, loadArticlesByCategory, loadingMore, hasMore, currentPage, totalPages, loadMoreArticlesByCategory } = usePublicArticles(categorySlug);

    useEffect(() => {
        if (categorySlug) {
            loadArticlesByCategory(categorySlug);
        }
    }, [categorySlug]);

    if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            loadMoreArticlesByCategory();
        }
    };

    return (
        <>
            {loading ? (
                <SimpleLoading />
            ) : (
                <div className="bg-gray-50 min-h-screen">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <Breadcrumb />

                        <div className="grid grid-cols-12 gap-8">

                            <div className="col-span-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-8">Danh sách bài viết</h1>

                                <ListArticleByCategory articles={articles} />

                                {hasMore && (
                                    <div className="flex justify-center mt-8">
                                        <button
                                            onClick={handleLoadMore}
                                            disabled={loadingMore}
                                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                                        >
                                            {loadingMore ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    Đang tải...
                                                </>
                                            ) : (
                                                'Xem thêm'
                                            )}
                                        </button>
                                    </div>
                                )}
                                {!hasMore && articles.length > 0 && (
                                    <div className="text-center mt-4 text-sm text-gray-500">
                                        Đã hiển thị tất cả bài báo
                                    </div>
                                )}
                            </div>

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