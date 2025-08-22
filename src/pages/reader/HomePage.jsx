import React from 'react';
import usePublicArticles from '../../hooks/usePublicArticles';
import SimpleLoading from '../../components/SimpleLoading';
import { Error } from '../../components/Error';
import BreakingNewsTicker from '../../components/reader/BreakingNewsTicker';
import FeaturedArticle from '../../components/reader/FeaturedArticle';
import SideArticles from '../../components/reader/SideArticleList';
import LatestNewsSection from '../../components/reader/LatestNewsSection';

const HomePage = () => {
    const {
        articles, loading, error, loadMoreArticles, loadingMore,
        hasMore,
        currentPage,
        totalPages
    } = usePublicArticles();

    console.log('Articles:', articles);
    console.log('Pagination Info:', { currentPage, totalPages, hasMore, articlesCount: articles.length });

    if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

    const safeArticles = articles || [];
    const featuredArticle = safeArticles[0];
    const subArticles = safeArticles.slice(1, 3);
    const latestArticles = safeArticles.slice(4);

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            loadMoreArticles();
        }
    };

    return (
        <>
            <BreakingNewsTicker featuredArticle={featuredArticle} />

            {loading && safeArticles.length === 0 ? (
                <SimpleLoading />
            ) : (
                <main className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-7">
                            <FeaturedArticle article={featuredArticle} />
                        </div>

                        <div className="col-span-5">
                            <SideArticles articles={subArticles} />
                        </div>
                    </div>

                    <LatestNewsSection articles={latestArticles} />

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
                </main>
            )}
        </>
    );
};

export default HomePage;