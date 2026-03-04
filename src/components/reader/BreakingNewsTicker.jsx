import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * BreakingNewsTicker
 * Props:
 *   articles - mang bai viet (dung de chay chu)
 *   featuredArticle - fallback neu chua co mang
 */
const BreakingNewsTicker = ({ articles = [], featuredArticle }) => {
    const [paused, setPaused] = useState(false);

    // Lay toi da 8 bai de chay
    const tickerItems = articles.length > 0
        ? articles.slice(0, 8)
        : featuredArticle
            ? [featuredArticle]
            : [];

    const fallbackText = "Bộ Nội vụ đề xuất tăng lương tối thiểu vùng 7,2% từ 1/1/2026";

    return (
        <div className="bg-white border-b border-gray-200 overflow-hidden">
            <style>{`
                @keyframes ticker {
                    0%   { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .ticker-track {
                    display: flex;
                    white-space: nowrap;
                    animation: ticker 40s linear infinite;
                }
                .ticker-track.paused {
                    animation-play-state: paused;
                }
                .ticker-track:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-6 flex items-stretch">
                {/* Label "NONG" ben trai */}
                <div className="flex items-center flex-shrink-0 pr-4 mr-2 border-r border-gray-200">
                    <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded tracking-widest uppercase animate-pulse">
                        Tin mới
                    </span>
                </div>

                {/* Ticker track */}
                <div
                    className="flex-1 overflow-hidden py-2.5 cursor-pointer"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div className={`ticker-track text-sm ${paused ? 'paused' : ''}`}>
                        {tickerItems.length > 0 ? (
                            /* Nhan doi de khong bi trong khi chay */
                            [...tickerItems, ...tickerItems].map((article, i) => (
                                <span key={i} className="inline-flex items-center">
                                    {article.slug ? (
                                        <Link
                                            to={`/detail/${article.slug}`}
                                            state={{ articleSlug: article.slug }}
                                            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                                        >
                                            {article.title}
                                        </Link>
                                    ) : (
                                        <span className="text-gray-700 font-medium">{article.title}</span>
                                    )}
                                    {/* Separator giua cac tin */}
                                    <span className="mx-6 text-green-500 font-bold select-none">✦</span>
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-700 font-medium">{fallbackText}</span>
                        )}
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default BreakingNewsTicker;