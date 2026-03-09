import SearchResults from "./SearchResults";
import RecentSearches from "./RecentSearches";

const SearchDropdown = ({
    query,
    results,
    totalElements,
    loading,
    recentSearches,
    onArticleClick,
    onRecentClick,
    onClearRecent
}) => {

    const hasResults = results.length > 0;
    const noResults = query.trim() && !loading && !hasResults;

    return (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50"
         style={{
                    maxHeight: "480px",
                    overflowY: "auto",
                    minWidth: "330px",
                    maxWidth: "480px"
                }}
        >

            <SearchResults
                results={results}
                totalElements={totalElements}
                onClick={onArticleClick}
            />

            {noResults && (
                <div className="px-4 py-6 text-center">
                    Không tìm thấy "{query}"
                </div>
            )}

            {!query.trim() && (
                <RecentSearches
                    searches={recentSearches}
                    onClick={onRecentClick}
                    onClear={onClearRecent}
                />
            )}

        </div>
    );
};

export default SearchDropdown;