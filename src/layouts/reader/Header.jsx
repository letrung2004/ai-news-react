import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../../hooks/useAuth";
import usePublicArticles from "../../hooks/usePublicArticles";

const Header = () => {

    const { categories, loading, error } = usePublicArticles();
    console.log("danh muc: ", categories.result);
    const [activeCategory, setActiveCategory] = useState(null);


    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };


    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Debug: kiểm tra giá trị user
    console.log("User trong ReaderHeader:", user);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (categories?.result?.length > 0) {
            setActiveCategory(categories.result[0].name);
        }
    }, [categories]);



    return (
        <>
            {/* Top Header */}
            <div className="bg-gray-900 text-white px-6 py-2">
                <div className="py-2 max-w-7xl mx-auto flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4">
                        <span>Việt Nam</span>
                        <span>{new Date().toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                        <span>Về chúng tôi</span>
                        <span>Liên Hệ</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center gap-2 bg-transparent border-none text-inherit cursor-pointer p-0"
                                >
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        {(user.username || 'U').charAt(0).toUpperCase()}
                                    </div>
                                    <span>{user.username || 'User'}</span>
                                    <i className="fas fa-chevron-down text-xs"></i>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md min-w-[160px] text-sm z-50">
                                        <Link
                                            to="/profile"
                                            className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 border-b border-gray-100 gap-3"
                                        >
                                            <i className="fas fa-user text-gray-600 w-4"></i>
                                            <span>Hồ sơ của bạn</span>
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 gap-3"
                                        >
                                            <i className="fas fa-sign-out-alt text-gray-600 w-4"></i>
                                            <span>Đăng xuất</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="hover:text-green-400 transition-colors cursor-pointer"
                                >
                                    Đăng ký
                                </Link>
                                <Link
                                    to="/login"
                                    className="hover:text-green-400 transition-colors cursor-pointer"
                                >
                                    Đăng nhập
                                </Link>
                            </>
                        )}
                    </div>


                </div>
            </div>
            {/* Main Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="text-center mb-8">
                        <h1
                            className="text-5xl font-bold cursor-pointer"
                        >
                            <span className="text-green-500">MAG</span>
                            <span className="text-gray-800">NEWS</span>
                        </h1>
                    </div>
                    {/* Navigation */}
                    <nav className="flex justify-center mb-6">
                        <div className="flex space-x-8">
                            {categories?.result?.slice(0, 9).map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => setActiveCategory(category.name)}
                                    className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap !rounded-button ${activeCategory === category.name
                                        ? 'text-green-600 border-b-2 border-green-600'
                                        : 'text-gray-700 hover:text-green-600'
                                        }`}
                                >
                                    {category.name}
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