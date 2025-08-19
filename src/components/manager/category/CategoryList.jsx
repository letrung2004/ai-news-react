// components/CategoryList.jsx
import { FileText, Edit, Trash2, Search } from "lucide-react";

const CategoryList = ({
    categories = [],
    searchTerm,
    setSearchTerm,
    onDelete,
}) => {
    const filteredCategories = categories.filter(
        (category) =>
            category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-green-600" />
                            Danh sách danh mục
                            <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 text-sm rounded-full">
                                {filteredCategories.length} danh mục
                            </span>
                        </h3>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm danh mục..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <div
                                key={category._id || category.id}
                                className="p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            <h4 className="font-medium text-gray-900">
                                                {category.name}
                                            </h4>
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                {category.count || 0} bài viết
                                            </span>
                                        </div>
                                        {category.description && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(category)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">
                                {searchTerm
                                    ? "Không tìm thấy danh mục nào"
                                    : "Chưa có danh mục nào"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
