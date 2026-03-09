import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Loader } from "lucide-react";

import { useArticleSearch } from "../../hooks/useArticleSearch";
import { useRecentSearches } from "../../hooks/useRecentSearches";

import SearchDropdown from "./SearchDropdown";

const useDebounce = (value, delay = 300) => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);

    return debounced;
};

const SearchBar = ({ onSearch }) => {

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const wrapRef = useRef(null);
    const inputRef = useRef(null);

    const navigate = useNavigate();

    const debouncedQuery = useDebounce(query, 300);

    const { results, totalElements, loading } =
        useArticleSearch(debouncedQuery);

    const { recentSearches, saveRecent, clearRecent } =
        useRecentSearches();

    // đóng dropdown khi click ngoài
    useEffect(() => {
        const handler = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSubmit = (e) => {
        e?.preventDefault();

        if (!query.trim()) return;

        saveRecent(query.trim());

        if (onSearch) {
            onSearch(query.trim());
        } else {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }

        setOpen(false);
        setQuery("");
    };

    const handleArticleClick = () => {
        if (query.trim()) saveRecent(query.trim());

        setOpen(false);
        setQuery("");
    };

    const handleRecentClick = (term) => {
        setQuery(term);
        inputRef.current?.focus();
    };

    const handleClearRecent = (e, term) => {
        e.stopPropagation();
        clearRecent(term);
    };

    const showDropdown =
        open && (query.trim() || recentSearches.length > 0);

    return (
        <div ref={wrapRef} className="relative w-full">

            {/* Input */}
            <form onSubmit={handleSubmit}>
                <div className="relative flex items-center">

                    <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />

                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setOpen(true);
                        }}
                        onFocus={() => setOpen(true)}
                        placeholder="Tìm kiếm bài viết..."
                        className="w-full text-sm bg-gray-50 border border-gray-200 rounded-full pl-9 pr-9 py-2 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white transition-all"
                    />

                    {/* Clear / Loading */}
                    <div className="absolute right-3">
                        {loading ? (
                            <Loader className="w-3.5 h-3.5 text-green-500 animate-spin" />
                        ) : query ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setQuery("");
                                    inputRef.current?.focus();
                                }}
                            >
                                <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                            </button>
                        ) : null}
                    </div>

                </div>
            </form>

            {/* Dropdown */}
            {showDropdown && (
                <SearchDropdown
                    query={query}
                    results={results}
                    totalElements={totalElements}
                    loading={loading}
                    recentSearches={recentSearches}
                    onArticleClick={handleArticleClick}
                    onRecentClick={handleRecentClick}
                    onClearRecent={handleClearRecent}
                    onSubmit={handleSubmit}
                />
            )}

        </div>
    );
};

export default SearchBar;