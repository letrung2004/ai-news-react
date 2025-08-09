import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../../hooks/useAuth";
import { useCategory } from "../../hooks/useCategory";

const Header = () => {
    const { categories } = useCategory();
    console.log("danh muc: ", categories.result);
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);

    const handleSearch = (e) => {
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


    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

            <div className={`bg-gray-900 text-white px-6 py-2 transition-all duration-300 ${isScrolled ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
                }`}>
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


            <header className={`bg-white shadow-sm transition-all duration-300 ${isScrolled
                ? 'fixed top-0 left-0 right-0 z-40 shadow-lg'
                : 'relative'
                }`}>
                <div className="max-w-7xl mx-auto px-6">
                    {/* Logo - ẩn khi scroll */}
                    {!isScrolled && (
                        <div className="text-center py-6 mb-8">
                            <Link to="/">
                                <h1 className="text-5xl font-bold cursor-pointer">
                                    <span className="text-green-500">MAG</span>
                                    <span className="text-gray-800">NEWS</span>
                                </h1>
                            </Link>
                        </div>
                    )}


                    <nav className={`transition-all duration-300 ${isScrolled
                        ? 'flex items-center justify-start py-3 space-x-8'
                        : 'flex justify-center mb-6'
                        }`}>
                        {/* Logo nhỏ khi scroll - nằm cùng hàng với menu */}
                        {isScrolled && (
                            <Link to="/" className="flex-shrink-0">
                                <h1 className="text-2xl font-bold cursor-pointer">
                                    <span className="text-green-500">MAG</span>
                                    <span className="text-gray-800">NEWS</span>
                                </h1>
                            </Link>
                        )}

                        {/* Categories */}
                        <div className="flex space-x-8 overflow-x-auto no-scrollbar">
                            {categories?.result?.map((category) => (
                                <Link
                                    key={category.name}
                                    to={`/category/${category.slug}`}
                                    state={{ categorySlug: category.slug }}
                                    onClick={() => setActiveCategory(category.name)}
                                    className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${activeCategory === category.name
                                        ? 'text-green-600 border-b-2 border-green-600'
                                        : 'text-gray-700 hover:text-green-600'
                                        }`}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>

                    </nav>
                </div>
            </header>


            {isScrolled && <div className="h-16"></div>}
        </>
    );
};

export default Header;