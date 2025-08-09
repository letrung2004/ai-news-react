import React from 'react';
import { useCategory } from '../hooks/useCategory';

const ListCategories = () => {

    const { categories } = useCategory();
    console.log("danh muc: ", categories.result);

    const handleCategoryClick = (category) => {
        console.log('Selected category:', category);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-green-600 rounded-full mr-3"></div>
                <h3 className="text-lg font-bold text-gray-900">Danh mục</h3>
            </div>

            <div className="space-y-2">
                {categories?.result?.map((category) => (
                    <div
                        key={category.id}
                        onClick={() => handleCategoryClick(category)}
                        className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-200"
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                                {category.name}
                            </span>
                        </div>
                        {/* {showCount && (
                            <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-400 group-hover:text-gray-600">
                                    ({category.count})
                                </span>
                                <i className="fas fa-chevron-right text-xs text-gray-300 group-hover:text-gray-400 transition-colors"></i>
                            </div>
                        )} */}
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full text-sm text-green-600 hover:text-green-700 font-medium py-2 px-4 rounded-lg hover:bg-green-50 transition-colors">
                    Xem tất cả danh mục
                    <i className="fas fa-arrow-right ml-2 text-xs"></i>
                </button>
            </div>
        </div>
    );
};

export default ListCategories;