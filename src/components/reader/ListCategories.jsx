import React from 'react';
import { Link } from 'react-router-dom';
import { useCategory } from '../../hooks/useCategory';
import { 
    ChevronRight, Newspaper, TrendingUp, Globe, 
    Trophy, Cpu, Clapperboard, GraduationCap, 
    Stethoscope, Users, LayoutGrid 
} from 'lucide-react';

// Sử dụng Lucide Components thay vì Emoji
const CATEGORY_ICONS = {
    'Thời sự': Newspaper,
    'Kinh tế': TrendingUp,
    'Thế giới': Globe,
    'Thể thao': Trophy,
    'Công nghệ': Cpu,
    'Giải trí': Clapperboard,
    'Giáo dục': GraduationCap,
    'Sức khỏe': Stethoscope,
    'Xã hội': Users,
};

const ListCategories = () => {
    const { categories } = useCategory();
    const list = categories?.result || [];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-1 h-6 bg-green-500 rounded-full" />
                <h3 className="text-base font-bold text-gray-900">Danh mục</h3>
            </div>

            {/* Grid danh mục */}
            <div className="p-4 grid grid-cols-2 gap-2">
                {list.map((category) => {
                    // Lấy Component icon tương ứng hoặc mặc định là LayoutGrid
                    const IconComponent = CATEGORY_ICONS[category.name] || LayoutGrid;

                    return (
                        <Link
                            key={category.id}
                            to={`/category/${category.slug}`}
                            state={{ categorySlug: category.slug }}
                            className="group flex items-center gap-2.5 p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all duration-200"
                        >
                            {/* Icon đơn sắc (Gray), đổi màu sang Green khi hover */}
                            <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors flex-shrink-0" />
                            
                            <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors block truncate">
                                    {category.name}
                                </span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-green-500 flex-shrink-0 transition-colors" />
                        </Link>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="px-5 pb-4 pt-1">
                <Link
                    to="/categories"
                    className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-green-700 font-medium py-2.5 px-4 rounded-lg hover:bg-green-50 border border-gray-200 hover:border-green-300 transition-all"
                >
                    Xem tất cả danh mục
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

export default ListCategories;