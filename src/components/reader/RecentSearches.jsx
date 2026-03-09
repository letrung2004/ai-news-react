import { Clock, X } from "lucide-react";

const RecentSearches = ({ searches, onClick, onClear }) => {
    if (!searches.length) return null;

    return (
        <div className="px-3 py-2.5">

            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> Gần đây
            </p>

            {searches.map((term, i) => (
                <div
                    key={i}
                    onClick={() => onClick(term)}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                >

                    <span className="text-sm text-gray-600 group-hover:text-green-600">
                        {term}
                    </span>

                    <button
                        onClick={(e) => onClear(e, term)}
                        className="opacity-0 group-hover:opacity-100"
                    >
                        <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                    </button>

                </div>
            ))}
        </div>
    );
};

export default RecentSearches;