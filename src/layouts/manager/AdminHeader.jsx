import React, { useState } from "react";
import {
    Search, Bell, Settings, User, ChevronDown, Menu,
    MessageSquare, HelpCircle, LogOut, Shield, Moon,
    Sun, Globe, Plus, Bookmark, Activity
} from "lucide-react";

const AdminHeader = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);



    const notifications = [
        {
            id: 1,
            type: "comment",
            title: "Bình luận mới",
            message: "Nguyễn Văn A đã bình luận về bài viết 'Microsoft AI'",
            time: "2 phút trước",
            unread: true
        },
        {
            id: 2,
            type: "article",
            title: "Bài viết chờ duyệt",
            message: "Bài viết 'Công nghệ blockchain' cần được duyệt",
            time: "15 phút trước",
            unread: true
        },
        {
            id: 3,
            type: "user",
            title: "Người dùng mới",
            message: "5 người dùng mới đã đăng ký hôm nay",
            time: "1 giờ trước",
            unread: false
        }
    ];

    const profileMenuItems = [
        { icon: User, label: "Hồ sơ cá nhân", action: () => { } },
        { icon: Settings, label: "Cài đặt tài khoản", action: () => { } },
        { icon: Shield, label: "Bảo mật", action: () => { } },
        { icon: HelpCircle, label: "Trợ giúp", action: () => { } },
        { icon: LogOut, label: "Đăng xuất", action: () => { }, danger: true }
    ];


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


                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                        title="Thông báo"
                    >
                        <Bell className="w-4 h-4 text-gray-600" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {notifications.filter(n => n.unread).length}
                        </span>
                    </button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 max-h-96 overflow-y-auto">
                            <div className="px-4 py-3 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">Thông báo</h3>
                                    <button className="text-sm text-green-600 hover:text-green-700">
                                        Đánh dấu tất cả đã đọc
                                    </button>
                                </div>
                            </div>

                            <div className="max-h-64 overflow-y-auto">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`px-4 py-3 hover:bg-gray-50 border-l-4 ${notification.unread ? 'border-green-500 bg-green-50/30' : 'border-transparent'
                                            }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notification.type === 'comment' ? 'bg-blue-100' :
                                                notification.type === 'article' ? 'bg-green-100' : 'bg-purple-100'
                                                }`}>
                                                <MessageSquare className={`w-4 h-4 ${notification.type === 'comment' ? 'text-blue-600' :
                                                    notification.type === 'article' ? 'text-green-600' : 'text-purple-600'
                                                    }`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {notification.title}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                            {notification.unread && (
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="px-4 py-3 border-t border-gray-200">
                                <button className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium">
                                    Xem tất cả thông báo
                                </button>
                            </div>
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
                            <span className="text-white text-sm font-semibold">A</span>
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-medium text-gray-900">Admin User</p>
                            <p className="text-xs text-gray-500">Quản trị viên</p>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown */}
                    {showProfile && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                            <div className="px-4 py-3 border-b border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold">A</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Admin User</p>
                                        <p className="text-sm text-gray-500">admin@magnews.com</p>
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