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
    const {
        articles, loading, error,
        loadArticlesByCategory,
        loadingMore, hasMore,
        loadMoreArticlesByCategory
    } = usePublicArticles(categorySlug);

    useEffect(() => {
        if (categorySlug) loadArticlesByCategory(categorySlug);
    }, [categorySlug]);

    if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) loadMoreArticlesByCategory();
    };

    return (
        <>
            {loading ? (
                <SimpleLoading />
            ) : (
                <div className="bg-gray-50 min-h-screen">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <Breadcrumb />

                        <div className="grid grid-cols-12 gap-8 mt-6">
                            {/* Main content */}
                            <div className="col-span-12 lg:col-span-8">
                                {/* Section header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-8 bg-green-500 rounded-full" />
                                    <h1 className="text-2xl font-bold text-gray-900">Danh sách bài viết</h1>
                                    <div className="flex-1 h-px bg-gray-200" />
                                </div>

                                <ListArticleByCategory articles={articles} />

                                {/* Load more */}
                                {hasMore && (
                                    <div className="flex justify-center mt-8">
                                        <button
                                            onClick={handleLoadMore}
                                            disabled={loadingMore}
                                            className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-2.5 px-10 rounded-full transition-all duration-300 text-sm disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {loadingMore ? (
                                                <>
                                                    <span className="animate-spin inline-block w-4 h-4 border-b-2 border-current rounded-full" />
                                                    Đang tải...
                                                </>
                                            ) : 'Xem thêm bài viết'}
                                        </button>
                                    </div>
                                )}
                                {!hasMore && articles.length > 0 && (
                                    <p className="text-center mt-6 text-sm text-gray-400">
                                        Đã hiển thị tất cả bài báo
                                    </p>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="col-span-12 lg:col-span-4">
                                <div className="space-y-6 sticky top-24">
                                    <PopularArticles title="Tin phổ biến" limit={5} />
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