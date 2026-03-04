import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../../hooks/useAuth";
import { useCategory } from "../../hooks/useCategory";
import {
    Settings, User, ChevronDown, HelpCircle,
    LogOut, Shield, Activity, Search, X
} from "lucide-react";

// ─── SearchBar ────────────────────────────────────────────────
const SearchBar = ({ onSearch }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);
    const wrapRef = useRef(null);
    const navigate = useNavigate();

    // Auto-focus khi mo
    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    // Dong khi click ra ngoai
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setOpen(false);
                setQuery("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        if (onSearch) {
            onSearch(query.trim());
        } else {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
        setOpen(false);
        setQuery("");
    };

    const handleClose = () => { setOpen(false); setQuery(""); };

    return (
        <div ref={wrapRef} className="flex items-center">
            {open ? (
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Tìm kiếm bài viết..."
                            className="w-48 sm:w-64 text-sm border border-gray-300 rounded-full pl-9 pr-4 py-1.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all bg-white"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Đóng tìm kiếm"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </form>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors border border-gray-200 rounded-full px-3 py-1.5 hover:border-green-400 bg-gray-50 hover:bg-white"
                    aria-label="Tìm kiếm"
                >
                    <Search className="w-4 h-4" />
                    <span className="hidden md:inline font-medium">Tìm kiếm</span>
                </button>
            )}
        </div>
    );
};

// ─── Header ───────────────────────────────────────────────────
const Header = () => {
    const { categories } = useCategory();
    const { user, logout } = useAuth();

    const [activeCategory, setActiveCategory] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const dropdownRef = useRef(null);

    const handleLogout = () => { logout(); setShowProfile(false); };

    const profileMenuItems = [
        { icon: User,       label: "Hồ sơ cá nhân",    action: () => console.log("Profile") },
        { icon: Settings,   label: "Cài đặt tài khoản", action: () => console.log("Settings") },
        { icon: Shield,     label: "Bảo mật",           action: () => console.log("Security") },
        { icon: HelpCircle, label: "Trợ giúp",          action: () => console.log("Help") },
        { icon: LogOut,     label: "Đăng xuất",         action: handleLogout, danger: true },
    ];

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        if (categories?.result?.length > 0) {
            setActiveCategory(categories.result[0].name);
        }
    }, [categories]);

    const renderUserAvatar = (size = "w-8 h-8") => (
        <div className={`${size} bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center`}>
            <span className="text-white text-sm font-semibold">
                {(user?.username || "U").charAt(0).toUpperCase()}
            </span>
        </div>
    );

    return (
        <>
            {/* ── Top Bar ── */}
            <div className={`bg-gray-900 text-white px-6 py-2 transition-all duration-300 ${
                isScrolled
                    ? "transform -translate-y-full opacity-0 fixed top-0 left-0 right-0 z-50"
                    : "transform translate-y-0 opacity-100 relative z-50"
            }`}>
                <div className="py-2 max-w-7xl mx-auto flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4">
                        <span>Việt Nam</span>
                        <span>
                            {new Date().toLocaleDateString("vi-VN", {
                                weekday: "long", year: "numeric",
                                month: "2-digit", day: "2-digit",
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
                                    <span className="hidden sm:block text-sm font-medium text-white">
                                        {user.username}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfile ? "rotate-180" : ""}`} />
                                </button>

                                {showProfile && (
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2" style={{ zIndex: 99999 }}>
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <p className="font-medium text-gray-900">{user.username}</p>
                                        </div>
                                        <div className="py-1">
                                            {profileMenuItems.map((item, i) => (
                                                <button
                                                    key={i}
                                                    onClick={item.action}
                                                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors ${item.danger ? "text-red-600 hover:bg-red-50" : "text-gray-700"}`}
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                    <span className="text-sm">{item.label}</span>
                                                </button>
                                            ))}
                                        </div>
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
                                <Link to="/register" className="hover:text-green-400 transition-colors">Đăng ký</Link>
                                <Link to="/login"    className="hover:text-green-400 transition-colors">Đăng nhập</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Main Header ── */}
            <header className={`bg-white shadow-sm transition-all duration-300 z-40 ${
                isScrolled ? "fixed top-0 left-0 right-0 shadow-lg" : "relative"
            }`}>
                <div className="max-w-7xl mx-auto px-6">

                    {/* Logo + SearchBar — hien khi CHUA scroll */}
                    {!isScrolled && (
                        <div className="flex items-center justify-between py-5">
                            {/* Spacer trai */}
                            <div className="flex-1" />

                            {/* Logo giua */}
                            <Link to="/" className="flex-shrink-0">
                                <h1 className="text-5xl font-bold tracking-tight">
                                    <span className="text-green-500">MAG</span>
                                    <span className="text-gray-800">NEWS</span>
                                </h1>
                            </Link>

                            {/* SearchBar phai */}
                            <div className="flex-1 flex justify-end">
                                <SearchBar />
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className={`transition-all duration-300 ${
                        isScrolled
                            ? "flex items-center justify-between py-3"
                            : "flex justify-center pb-4"
                    }`}>

                        {/* Logo nho khi scroll */}
                        {isScrolled && (
                            <Link to="/" className="flex-shrink-0 mr-6">
                                <h1 className="text-2xl font-bold">
                                    <span className="text-green-500">MAG</span>
                                    <span className="text-gray-800">NEWS</span>
                                </h1>
                            </Link>
                        )}

                        {/* Categories */}
                        <div className="flex space-x-1 overflow-x-auto no-scrollbar flex-1">
                            {categories?.result?.map((category) => (
                                <Link
                                    key={category.name}
                                    to={`/category/${category.slug}`}
                                    state={{ categorySlug: category.slug }}
                                    onClick={() => setActiveCategory(category.name)}
                                    className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-full ${
                                        activeCategory === category.name
                                            ? "text-green-600 bg-green-50 border-b-2 border-green-600"
                                            : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                                    }`}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>

                        {/* SearchBar ben phai nav — CHI hien khi da scroll */}
                        {isScrolled && (
                            <div className="flex-shrink-0 ml-4">
                                <SearchBar />
                            </div>
                        )}
                    </nav>
                </div>
            </header>

            {/* Spacer khi scroll de tranh content bi che */}
            {isScrolled && <div className="h-16" />}
        </>
    );
};

export default Header;