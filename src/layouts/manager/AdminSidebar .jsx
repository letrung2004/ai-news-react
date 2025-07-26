import React, { useState } from "react";

const AdminSidebar = () => {
    // Quản lý tab đang chọn
    const [activeTab, setActiveTab] = useState("dashboard");

    const sidebarItems = [
        { id: 'dashboard', label: 'Tổng quan', icon: 'fas fa-chart-line' },
        { id: 'articles', label: 'Quản lý bài viết', icon: 'fas fa-newspaper' },
        { id: 'categories', label: 'Quản lý danh mục', icon: 'fas fa-folder' },
        { id: 'users', label: 'Quản lý người dùng', icon: 'fas fa-users' },
        { id: 'comments', label: 'Quản lý bình luận', icon: 'fas fa-comments' },
        { id: 'settings', label: 'Cài đặt hệ thống', icon: 'fas fa-cog' }
    ];

    const articlesSubmenu = [
        { id: 'all-articles', label: 'Tất cả bài viết' },
        { id: 'add-new', label: 'Thêm bài báo mới' },
        { id: 'categories', label: 'Danh mục' },
        { id: 'tags', label: 'Thẻ' }
    ];

    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-40">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3 pl-5">
                    <div>
                        <h1
                            className="text-3xl font-bold cursor-pointer"
                            onClick={() => setCurrentView('home')}
                        >
                            <span className="text-green-500">MAG</span>
                            <span className="text-gray-800">NEWS</span>
                        </h1>
                        <p className="text-sm text-gray-500">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <nav className="mt-6">
                {sidebarItems.map((item) => (
                    <div key={item.id}>
                        <button
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between px-6 py-3 text-left transition-colors cursor-pointer whitespace-nowrap
                                ${activeTab === item.id || (activeTab === "add-new" && item.id === "articles")
                                    ? "bg-green-50 text-green-600 border-r-2 border-green-500"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <div className="flex items-center">
                                <i className={`${item.icon} w-5 mr-3`}></i>
                                {item.label}
                            </div>
                            {item.id === "articles" && (
                                <i
                                    className={`fas fa-chevron-${activeTab === "articles" || activeTab === "add-new"
                                        ? "down"
                                        : "right"
                                        } text-xs`}
                                ></i>
                            )}
                        </button>

                        {/* Submenu cho Articles */}
                        {item.id === "articles" &&
                            (activeTab === "articles" || activeTab === "add-new") && (
                                <div className="ml-6 mt-1">
                                    {articlesSubmenu.map((subItem) => (
                                        <button
                                            key={subItem.id}
                                            onClick={() => setActiveTab(subItem.id)}
                                            className={`w-full flex items-center px-6 py-2 text-left text-sm transition-colors cursor-pointer whitespace-nowrap
                                                ${activeTab === subItem.id
                                                    ? "text-green-600 bg-green-50"
                                                    : "text-gray-600 hover:bg-gray-50"
                                                }`}
                                        >
                                            {subItem.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default AdminSidebar;
