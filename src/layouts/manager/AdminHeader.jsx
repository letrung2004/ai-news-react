import React, { useState } from "react";
import { Search, Settings, User, ChevronDown, MessageSquare, HelpCircle, LogOut, Shield, Bookmark, Activity } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useRole } from "../../hooks/useRole";


const AdminHeader = () => {
    const { user, logout } = useAuth();
    const { isAdmin } = useRole();

    const [searchQuery, setSearchQuery] = useState("");
    const [showProfile, setShowProfile] = useState(false);


    const profileMenuItems = [
        { icon: User, label: "Hồ sơ cá nhân", action: () => { } },
        { icon: Settings, label: "Cài đặt tài khoản", action: () => { } },
        { icon: Shield, label: "Bảo mật", action: () => { } },
        { icon: HelpCircle, label: "Trợ giúp", action: () => { } },
        { icon: LogOut, label: "Đăng xuất", action: () => { handleLogout }, danger: true }
    ];

    const handleLogout = () => {
        logout();
        setShowProfile(false);
    };


    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Left Section */}
            <div className="flex items-center space-x-4">

            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">


                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64 md:w-80 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white text-sm transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

                    {/* Search suggestions - shown when typing */}
                    {searchQuery && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 max-h-60 overflow-y-auto">
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Kết quả tìm kiếm
                            </div>
                            {[
                                { type: "Bài viết", title: "Microsoft AI và tương lai", icon: MessageSquare },
                                { type: "Người dùng", title: "Nguyễn Văn A", icon: User },
                                { type: "Danh mục", title: "Công nghệ", icon: Bookmark }
                            ].map((item, index) => (
                                <button
                                    key={index}
                                    className="w-full px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-left"
                                >
                                    <item.icon className="w-4 h-4 text-gray-400" />
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                        <div className="text-xs text-gray-500">{item.type}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Profile Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">{(user.username || 'U').charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-medium text-gray-900">{user.username}</p>
                            <p className="text-xs text-gray-500">
                                {isAdmin() ? "Quản trị viên" : "Biên tập viên"}
                            </p>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown */}
                    {showProfile && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                            <div className="px-4 py-3 border-b border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold">{(user.username || 'U').charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{user.username}</p>
                                    </div>
                                </div>
                            </div>

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
            </div>
        </header>
    );
};

export default AdminHeader;