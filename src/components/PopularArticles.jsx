import React from 'react';
import usePublicArticles from '../hooks/usePublicArticles';

const PopularArticles = ({ title = "Phổ biến nhất", limit = 5 }) => {
    const { articles, loading, error } = usePublicArticles();

    const displayArticles = articles?.slice(0, limit) || [];

    const formatDate = (dateValue) => {
        if (!dateValue) return '';
        // Nếu là object Date
        if (dateValue instanceof Date) {
            return dateValue.toLocaleDateString('vi-VN', { timeZone: 'UTC' });
        }
        // Nếu là string
        if (typeof dateValue === 'string' && !isNaN(new Date(dateValue))) {
            return new Date(dateValue).toLocaleDateString('vi-VN', { timeZone: 'UTC' });
        }
        // Nếu không parse được, trả nguyên chuỗi
        return String(dateValue);
    };

    const getCategoryName = (category) => {
        if (!category) return '';
        if (typeof category === 'string') return category;
        if (typeof category === 'object' && category.name) return category.name;
        return '';
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-green-600 rounded-full mr-3"></div>
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            </div>

            <div className="space-y-4">
                {displayArticles.map((article, index) => (
                    <div key={article.id || index} className="group cursor-pointer">
                        <div className="flex items-start space-x-3">
                            <div className="flex-1 min-w-0">
                                <div className="flex space-x-3">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={article.featuredImage}
                                            alt={article.title}
                                            className="w-20 h-17 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 leading-tight mb-2">
                                            {article.title}
                                        </h4>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                                                    {getCategoryName(article.category)}
                                                </span>
                                            </div>
                                            <span>{article.created}</span>
                                        </div>
                                        {/* <div className="mt-1 text-xs text-gray-400">
                                            {article.authors?.length > 0 ? article.authors.join(', ') : 'Admin'}
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {index < displayArticles.length - 1 && (
                            <div className="mt-4 border-b border-gray-100"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularArticles;
