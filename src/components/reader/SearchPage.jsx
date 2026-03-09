import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, X, Loader } from "lucide-react";
import { useArticleSearch } from "../../hooks/useArticleSearch";

const useDebounce = (value, delay = 300) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
};

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [inputValue, setInputValue] = useState(initialQuery);
    const debouncedQuery = useDebounce(inputValue, 300);

    const { results, totalElements, loading } = useArticleSearch(debouncedQuery);

    // Sync URL khi query thay đổi
    useEffect(() => {
        if (debouncedQuery.trim()) {
            setSearchParams({ q: debouncedQuery.trim() }, { replace: true });
        } else {
            setSearchParams({}, { replace: true });
        }
    }, [debouncedQuery]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <main className="max-w-4xl mx-auto px-6 py-10">

            {/* Search input */}
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        autoFocus
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Tìm kiếm bài viết..."
                        className="w-full text-base bg-white border-2 border-gray-200 rounded-full pl-12 pr-12 py-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all shadow-sm"
                    />
                    {inputValue && (
                        <button
                            type="button"
                            onClick={() => setInputValue("")}
                            className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </form>

            {/* Meta */}
            {debouncedQuery.trim() && !loading && (
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm text-gray-500">
                        {totalElements > 0
                            ? <>Tìm thấy <span className="font-semibold text-gray-800">{totalElements}</span> kết quả cho <span className="font-semibold text-gray-800">"{debouncedQuery}"</span></>
                            : <>Không tìm thấy kết quả nào cho <span className="font-semibold text-gray-800">"{debouncedQuery}"</span></>
                        }
                    </span>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
                            <div className="w-24 h-16 bg-gray-100 rounded-lg animate-pulse flex-shrink-0" />
                            <div className="flex-1 space-y-2 py-1">
                                <div className="h-3 bg-gray-100 rounded animate-pulse w-1/4" />
                                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                                <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Results */}
            {!loading && results.length > 0 && (
                <div className="space-y-3">
                    {results.map((article) => (
                        <Link
                            key={article.id}
                            to={`/detail/${article.slug}`}
                            state={{ articleSlug: article.slug }}
                            className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-sm transition-all group"
                        >
                            {/* Thumbnail */}
                            <div className="w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                {article.featuredImage ? (
                                    <img
                                        src={article.featuredImage}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xl">📰</div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    {article.category?.name && (
                                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                            {article.category.name}
                                        </span>
                                    )}
                                    {article.authors?.[0] && (
                                        <span className="text-xs text-gray-400">{article.authors[0]}</span>
                                    )}
                                </div>
                                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-green-600 transition-colors mb-1">
                                    {article.title}
                                </h3>
                                {article.summary && (
                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                        {article.summary}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!loading && debouncedQuery.trim() && results.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-5xl mb-4">🔍</div>
                    <p className="text-gray-500 mb-1">Không tìm thấy kết quả nào</p>
                    <p className="text-sm text-gray-400">Thử tìm với từ khóa khác</p>
                </div>
            )}

            {/* Initial state — chưa gõ gì */}
            {!debouncedQuery.trim() && !loading && (
                <div className="text-center py-20">
                    <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400">Nhập từ khóa để tìm kiếm bài viết</p>
                </div>
            )}

        </main>
    );
};

export default SearchPage;