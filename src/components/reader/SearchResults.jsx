import { Link } from "react-router-dom";

const SearchResults = ({ results, totalElements, onClick }) => {
    if (!results.length) return null;

    return (
        <>
            <div className="px-3 pt-2.5 pb-1 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                    {totalElements} kết quả
                </span>
            </div>

            {results.slice(0, 6).map((article) => (
                <Link
                    key={article.id}
                    to={`/detail/${article.slug}`}
                    state={{ articleSlug: article.slug }}
                    onClick={onClick}
                    className="flex gap-3 px-3 py-2.5 hover:bg-gray-50 group"
                >
                    <div className="w-12 h-9 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                        {article.featuredImage ? (
                            <img
                                src={article.featuredImage}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                                📰
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-green-600">
                            {article.title}
                        </p>

                        {article.summary && (
                            <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                                {article.summary}
                            </p>
                        )}
                    </div>
                </Link>
            ))}
        </>
    );
};

export default SearchResults;