// components/CategoryList.jsx
import { Hash, Edit, Trash2, Search, Tag } from "lucide-react";

const TagList = ({ tags = [], searchTerm, setSearchTerm, handleDelete, getTagColor, }) => {

    const tagList = tags?.result || [];

    const filteredTags = tagList.filter(tag =>
        tag.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tag.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <Hash className="w-5 h-5 mr-2 text-green-600" />
                                Danh sách thẻ
                                <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 text-sm rounded-full">
                                    {filteredTags.length} thẻ
                                </span>
                            </h3>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm thẻ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="p-6">
                        {filteredTags.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredTags.map((tag, index) => (
                                    <div key={tag.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(index)}`}>
                                                    <Hash className="w-3 h-3 inline mr-1" />
                                                    {tag.name}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {tag.count || 0} bài viết
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <button className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                                                    <Edit className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(tag)}
                                                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                        {tag.description && (
                                            <p className="text-xs text-gray-600">{tag.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">
                                    {searchTerm ? 'Không tìm thấy thẻ nào' : 'Chưa có thẻ nào'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TagList;
