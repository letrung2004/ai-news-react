import React, { useState } from "react";
import { ChevronDown, ChevronRight, BarChart3, FileText, Folder, Users, MessageSquare, Settings, Plus, List, Tag } from "lucide-react";

const AdminSidebar = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [expandedMenus, setExpandedMenus] = useState({});

    const sidebarItems = [
        {
            id: 'dashboard',
            label: 'Tổng quan',
            icon: BarChart3,
            hasSubmenu: false
        },
        {
            id: 'articles',
            label: 'Quản lý bài viết',
            icon: FileText,
            hasSubmenu: true,
            submenu: [
                { id: 'all-articles', label: 'Tất cả bài viết', icon: List },
                { id: 'add-new', label: 'Thêm bài báo mới', icon: Plus },
                { id: 'article-categories', label: 'Danh mục bài viết', icon: Folder },
                { id: 'tags', label: 'Thẻ bài viết', icon: Tag }
            ]
        },
        {
            id: 'users',
            label: 'Quản lý người dùng',
            icon: Users,
            hasSubmenu: false
        },
        {
            id: 'comments',
            label: 'Quản lý bình luận',
            icon: MessageSquare,
            hasSubmenu: false
        },
        {
            id: 'settings',
            label: 'Cài đặt hệ thống',
            icon: Settings,
            hasSubmenu: false
        }
    ];

    const toggleSubmenu = (itemId) => {
        setExpandedMenus(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    const handleMenuClick = (item) => {
        if (item.hasSubmenu) {
            toggleSubmenu(item.id);
            // Nếu submenu đang đóng, set active tab là item chính
            if (!expandedMenus[item.id]) {
                setActiveTab(item.id);
            }
        } else {
            setActiveTab(item.id);
        }
    };

    const handleSubmenuClick = (subItemId) => {
        setActiveTab(subItemId);
    };

    const isActiveParent = (item) => {
        if (item.hasSubmenu && item.submenu) {
            return item.submenu.some(subItem => subItem.id === activeTab) || activeTab === item.id;
        }
        return activeTab === item.id;
    };

    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 z-40">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">
                            <span className="text-green-600">MAG</span>
                            <span className="text-gray-800">NEWS</span>
                        </h1>
                        <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <nav className="mt-4 px-3">
                {sidebarItems.map((item) => {
                    const IconComponent = item.icon;
                    const isExpanded = expandedMenus[item.id];
                    const isActive = isActiveParent(item);

                    return (
                        <div key={item.id} className="mb-1">
                            {/* Main menu item */}
                            <button
                                onClick={() => handleMenuClick(item)}
                                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 rounded-lg group relative overflow-hidden
                                    ${isActive
                                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-[1.02]"
                                        : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`p-1.5 rounded-md transition-colors duration-200 ${isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-green-100"
                                        }`}>
                                        <IconComponent className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-600 group-hover:text-green-600"
                                            }`} />
                                    </div>
                                    <span className="font-medium text-sm">{item.label}</span>
                                </div>

                                {item.hasSubmenu && (
                                    <div className={`transform transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"
                                        }`}>
                                        <ChevronDown className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"
                                            }`} />
                                    </div>
                                )}

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-0 w-1 h-full bg-white rounded-r-full"></div>
                                )}
                            </button>

                            {/* Submenu */}
                            {item.hasSubmenu && (
                                <div className={`mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}>
                                    <div className="border-l-2 border-gray-200 pl-4 py-2">
                                        {item.submenu?.map((subItem, index) => {
                                            const SubIconComponent = subItem.icon;
                                            const isSubActive = activeTab === subItem.id;

                                            return (
                                                <button
                                                    key={subItem.id}
                                                    onClick={() => handleSubmenuClick(subItem.id)}
                                                    className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left text-sm transition-all duration-200 rounded-lg group
                                                        ${isSubActive
                                                            ? "bg-green-50 text-green-700 border-l-4 border-green-500 shadow-sm transform translate-x-1"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:transform hover:translate-x-1"
                                                        }`}
                                                    style={{
                                                        animationDelay: `${index * 50}ms`
                                                    }}
                                                >
                                                    <div className={`p-1 rounded-md transition-colors duration-200 ${isSubActive ? "bg-green-100" : "bg-gray-100 group-hover:bg-green-50"
                                                        }`}>
                                                        <SubIconComponent className={`w-3.5 h-3.5 ${isSubActive ? "text-green-600" : "text-gray-500 group-hover:text-green-600"
                                                            }`} />
                                                    </div>
                                                    <span className="font-medium">{subItem.label}</span>

                                                    {/* Sub-item active indicator */}
                                                    {isSubActive && (
                                                        <div className="ml-auto w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-4 left-3 right-3">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 border border-green-100">
                    <div className="text-xs text-gray-600 text-center">
                        <div className="font-semibold">Version 2.0</div>
                        <div className="text-gray-500">© 2025 MagNews</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;