import React, { useState } from 'react';
import { Hash, Search } from 'lucide-react';

const TagSection = ({
    tags,
    selectedTags,
    onTagChange
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    // lọc tag theo từ khóa
    const filteredTags = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-purple-600" />
                    <span>Thẻ</span>
                </h4>
            </div>

            {/* Ô tìm kiếm */}
            <div className="px-4 pb-2">
                <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Tìm thẻ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div className="max-h-32 overflow-y-auto space-y-2">
                    {filteredTags.length > 0 ? (
                        filteredTags.map((tag, index) => (
                            <label
                                key={index}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedTags.includes(tag.id)}
                                    onChange={() => onTagChange(tag.id)}
                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                />
                                <span className="text-sm text-gray-700">{tag.name}</span>
                            </label>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400 italic">Không tìm thấy thẻ nào</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TagSection;
