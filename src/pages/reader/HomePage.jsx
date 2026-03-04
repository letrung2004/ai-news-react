import React from 'react';
import usePublicArticles from '../../hooks/usePublicArticles';
import SimpleLoading from '../../components/SimpleLoading';
import { Error } from '../../components/Error';
import BreakingNewsTicker from '../../components/reader/BreakingNewsTicker';
import FeaturedArticle from '../../components/reader/FeaturedArticle';
import SideArticles from '../../components/reader/SideArticleList';
import LatestNewsSection from '../../components/reader/LatestNewsSection';
import RecommendedArticles from '../../components/reader/RecommendedArticles';

const HomePage = () => {
    const {
        articles, loading, error,
        loadMoreArticles, loadingMore, hasMore,
        currentPage, totalPages
    } = usePublicArticles();

    if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

    const safeArticles = articles || [];
    const featuredArticle = safeArticles[0];
    const subArticles = safeArticles.slice(1, 3);
    const latestArticles = safeArticles.slice(4);

    return (
        <>
            <BreakingNewsTicker featuredArticle={featuredArticle} />

            {loading && safeArticles.length === 0 ? (
                <SimpleLoading />
            ) : (
                <main className="max-w-7xl mx-auto px-6 py-8">
                    {/* Featured + Side articles */}
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-7">
                            <FeaturedArticle article={featuredArticle} />
                        </div>
                        <div className="col-span-5">
                            <SideArticles articles={subArticles} />
                        </div>
                    </div>

                    {/* Đề xuất cá nhân — chỉ hiện khi đã login, nằm giữa featured và latest */}
                    <RecommendedArticles />

                    {/* Tin mới nhất + sidebar phổ biến nhất */}
                    <LatestNewsSection
                        articles={latestArticles}
                        hasMore={hasMore}
                        loadingMore={loadingMore}
                        onLoadMore={() => { if (!loadingMore && hasMore) loadMoreArticles(); }}
                    />
                </main>
            )}
        </>
    );
};

export default HomePage;