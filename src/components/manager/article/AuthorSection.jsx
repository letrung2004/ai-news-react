import React from "react";
import { User, Plus, PenLine, X } from "lucide-react";

const AuthorSection = ({ authors, newAuthor, setNewAuthor, onAddAuthor, onRemoveAuthor }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-violet-500" />
            <span className="text-xs font-medium text-gray-600">Tác giả</span>
            {authors.length > 0 && (
                <span className="ml-auto text-xs text-gray-400">{authors.length} người</span>
            )}
        </div>

        <div className="p-4 space-y-3">
            {/* Input */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onAddAuthor()}
                    placeholder="Nhập tên tác giả..."
                    className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white transition-all placeholder-gray-300"
                />
                <button
                    onClick={onAddAuthor}
                    disabled={!newAuthor.trim()}
                    className="p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-100 text-white disabled:text-gray-300 rounded-xl transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Tags */}
            {authors.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {authors.map((author, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-1 pl-2 pr-1 py-1 bg-violet-50 text-violet-700 text-xs font-medium rounded-lg"
                        >
                            <PenLine className="w-3 h-3" />
                            {author}
                            <button
                                onClick={() => onRemoveAuthor(author)}
                                className="ml-0.5 p-0.5 hover:bg-violet-200 rounded transition-colors"
                            >
                                <X className="w-2.5 h-2.5" />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    </div>
);

export default AuthorSection;