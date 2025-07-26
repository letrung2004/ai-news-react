import React, { useState } from "react";
const Header = () => {
    const [activeCategory, setActiveCategory] = useState('Trang chủ');
    const categories = [
        'Trang chủ', 'Tin mới', 'Giải trí', 'Kinh doanh',
        'Du lịch', 'Đời sống', 'Pháp luật', 'Kinh tế', 'Công nghệ'
    ];
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    return (
        <>
            {/* Top Header */}
            <div className="bg-gray-900 text-white px-6 py-2">
                <div className="py-2 max-w-7xl mx-auto flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4">
                        <span>Việt Nam</span>
                        <span>Thứ Bảy, 26/07/2025</span>
                        <span>Về chúng tôi</span>
                        <span>Liên Hệ</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setCurrentView('register')}
                            className="hover:text-green-400 transition-colors cursor-pointer"
                        >
                            Đăng ký
                        </button>
                        <button
                            onClick={() => setCurrentView('login')}
                            className="hover:text-green-400 transition-colors cursor-pointer"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
            {/* Main Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="text-center mb-8">
                        <h1
                            className="text-5xl font-bold cursor-pointer"
                            onClick={() => setCurrentView('home')}
                        >
                            <span className="text-green-500">MAG</span>
                            <span className="text-gray-800">NEWS</span>
                        </h1>
                    </div>
                    {/* Navigation */}
                    <nav className="flex justify-center mb-6">
                        <div className="flex space-x-8">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap !rounded-button ${activeCategory === category
                                        ? 'text-green-600 border-b-2 border-green-600'
                                        : 'text-gray-700 hover:text-green-600'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </nav>
                    {/* Search Bar */}
                    <div className="max-w-md mx-auto">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm"
                                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 cursor-pointer"
                            >
                                <i className="fas fa-search text-sm"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </header>
        </>
    );

};

export default Header;