import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../../hooks/useAuth";
import { useCategory } from "../../hooks/useCategory";
import { Settings, User, ChevronDown, HelpCircle, LogOut, Shield, Activity } from "lucide-react";

const Header = () => {
    const { categories } = useCategory();
    const { user, logout } = useAuth();

    // States
    const [activeCategory, setActiveCategory] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    // Refs
    const dropdownRef = useRef(null);

    // Handlers
    const handleLogout = () => {
        logout();
        setShowProfile(false);
    };

    // Profile menu items
    const profileMenuItems = [
        { icon: User, label: "Hồ sơ cá nhân", action: () => console.log('Profile') },
        { icon: Settings, label: "Cài đặt tài khoản", action: () => console.log('Settings') },
        { icon: Shield, label: "Bảo mật", action: () => console.log('Security') },
        { icon: HelpCircle, label: "Trợ giúp", action: () => console.log('Help') },
        { icon: LogOut, label: "Đăng xuất", action: handleLogout, danger: true }
    ];

    // Effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (categories?.result?.length > 0) {
            setActiveCategory(categories.result[0].name);
        }
    }, [categories]);

    // Render user avatar
    const renderUserAvatar = (size = "w-8 h-8") => (
        <div className={`${size} bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center`}>
            <span className="text-white text-sm font-semibold">
                {(user?.username || 'U').charAt(0).toUpperCase()}
            </span>
        </div>
    );

    return (
        <>
            {/* Top Bar */}
            <div className={`bg-gray-900 text-white px-6 py-2 transition-all duration-300 ${isScrolled ? 'transform -translate-y-full opacity-0 fixed top-0 left-0 right-0 z-50' : 'transform translate-y-0 opacity-100 relative z-50'
                }`}>
                <div className="py-2 max-w-7xl mx-auto flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4">
                        <span>Việt Nam</span>
                        <span>
                            {new Date().toLocaleDateString("vi-VN", {
                                weekday: 'long',
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })}
                        </span>
                        <span>Về chúng tôi</span>
                        <span>Liên Hệ</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    {renderUserAvatar()}
                                    <div className="hidden sm:block text-left">
                                        <p className="text-sm font-medium text-white">{user.username}</p>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfile ? 'rotate-180' : ''
                                        }`} />
                                </button>

                                {/* Profile Dropdown */}
                                {showProfile && (
                                    <div
                                        className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
                                        style={{ zIndex: 99999 }}
                                    >
                                        {/* User Info */}
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <div className="flex items-center space-x-3">
                                                {/* {renderUserAvatar("w-10 h-10")} */}
                                                <div>
                                                    <p className="font-medium text-gray-900">{user.username}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-1">
                                            {profileMenuItems.map((item, index) => (
                                                <button
                                                    key={index}
                                                    onClick={item.action}
                                                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors ${item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                                                        }`}
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                    <span className="text-sm">{item.label}</span>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="px-4 py-3 border-t border-gray-200">
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>Phiên bản 2.0</span>
                                                <div className="flex items-center space-x-1">
                                                    <Activity className="w-3 h-3 text-green-500" />
                                                    <span>Online</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="hover:text-green-400 transition-colors"
                                >
                                    Đăng ký
                                </Link>
                                <Link
                                    to="/login"
                                    className="hover:text-green-400 transition-colors"
                                >
                                    Đăng nhập
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className={`bg-white shadow-sm transition-all duration-300 z-40 ${isScrolled ? 'fixed top-0 left-0 right-0 shadow-lg' : 'relative'
                }`}>
                <div className="max-w-7xl mx-auto px-6">
                    {/* Logo - ẩn khi scroll */}
                    {!isScrolled && (
                        <div className="text-center py-6 mb-8">
                            <Link to="/">
                                <h1 className="text-5xl font-bold">
                                    <span className="text-green-500">MAG</span>
                                    <span className="text-gray-800">NEWS</span>
                                </h1>
                            </Link>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className={`transition-all duration-300 ${isScrolled
                        ? 'flex items-center justify-start py-3 space-x-8'
                        : 'flex justify-center mb-6'
                        }`}>
                        {/* Logo nhỏ khi scroll */}
                        {isScrolled && (
                            <Link to="/" className="flex-shrink-0">
                                <h1 className="text-2xl font-bold">
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
                                    className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === category.name
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

            {/* Spacer khi scroll */}
            {isScrolled && <div className="h-16" />}
        </>
    );
};

export default Header;