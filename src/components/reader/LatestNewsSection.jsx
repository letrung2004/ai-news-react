import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => (
    <Link
        to={`/detail/${article.slug}`}
        state={{ articleSlug: article.slug }}
        className="group block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
    >
        <div className="overflow-hidden flex-shrink-0" style={{ height: "180px" }}>
            <img src={article.featuredImage} alt={article.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded mb-2 w-fit uppercase">
                {article.category?.name || 'Tin tức'}
            </span>
            <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">
                {article.title}
            </h3>
            {article.summary && (
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3 flex-grow">
                    {article.summary}
                </p>
            )}
            <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-2 border-t border-gray-50">
                <span className="font-medium text-gray-500">{article.authors?.[0] || 'Admin'}</span>
                <span>{article.created}</span>
            </div>
        </div>
    </Link>
);

// Style giống PopularArticles — có ảnh + rank number
const SidebarItem = ({ article, rank }) => (
    <Link
        to={`/detail/${article.slug}`}
        state={{ articleSlug: article.slug }}
        className="block group"
    >
        <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded transition-colors">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center mt-1">
                {rank}
            </span>
            <div className="flex gap-3 flex-1 min-w-0">
                <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="flex-shrink-0 w-20 h-[68px] rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 leading-tight mb-2">
                        {article.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded-full font-medium">
                            {article.category?.name || 'Tin tức'}
                        </span>
                        <span>{article.created}</span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
);

const LatestNewsSection = ({ articles, hasMore, loadingMore, onLoadMore }) => {
    const safeArticles = articles || [];
    const sidebarArticles = safeArticles.slice(0, 5);

    return (
        <section className="mt-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-7 bg-green-500 rounded-full" />
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Tin Mới Nhất</h2>
                <div className="flex-1 h-px bg-gray-200 ml-1" />
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Grid cards + nút xem thêm */}
                <div className="col-span-12 lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {safeArticles.length > 0 ? (
                            safeArticles.map((article, i) => (
                                <ArticleCard key={article.id || i} article={article} />
                            ))
                        ) : (
                            Array.from({ length: 6 }, (_, i) => (
                                <article key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                                    <div className="bg-gray-200 flex items-center justify-center" style={{ height: "180px" }}>
                                        <p className="text-gray-500 text-sm">Không có bài viết</p>
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded mb-2 w-fit">Tin tức</span>
                                        <h3 className="font-bold text-gray-800 text-sm">Đang tải...</h3>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>

                    {/* Nút xem thêm — nằm dưới grid */}
                    {hasMore && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={onLoadMore}
                                disabled={loadingMore}
                                className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-2.5 px-10 rounded-full transition-all duration-300 text-sm disabled:opacity-50 flex items-center gap-2"
                            >
                                {loadingMore ? (
                                    <>
                                        <span className="animate-spin inline-block w-4 h-4 border-b-2 border-current rounded-full" />
                                        Đang tải...
                                    </>
                                ) : 'Xem thêm'}
                            </button>
                        </div>
                    )}
                    {!hasMore && safeArticles.length > 0 && (
                        <p className="text-center mt-6 text-sm text-gray-400">Đã hiển thị tất cả bài báo</p>
                    )}
                </div>

                {/* Sidebar Phổ biến nhất */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                        <div className="flex items-center mb-4">
                            <div className="w-1 h-6 bg-green-600 rounded-full mr-3" />
                            <h3 className="text-lg font-bold text-gray-900">Phổ biến nhất</h3>
                        </div>
                        <div className="space-y-1">
                            {sidebarArticles.map((article, i) => (
                                <SidebarItem key={article.id || i} article={article} rank={i + 1} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestNewsSection;