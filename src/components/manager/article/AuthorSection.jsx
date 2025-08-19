import React from 'react';
import { User, Plus, PenLine, X } from 'lucide-react';

const AuthorSection = ({
    authors,
    newAuthor,
    setNewAuthor,
    onAddAuthor,
    onRemoveAuthor
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <User className="w-4 h-4 text-purple-600" />
                    <span>Biên tập viên</span>
                </h4>
            </div>

            <div className="p-4 space-y-3">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && onAddAuthor()}
                        placeholder="Nhập họ và tên"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        onClick={onAddAuthor}
                        className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                {authors.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {authors.map((author, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                                <PenLine className="w-3 h-3 mr-1" />
                                {author}
                                <button
                                    onClick={() => onRemoveAuthor(author)}
                                    className="ml-1 text-green-600 hover:text-green-800"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthorSection;
