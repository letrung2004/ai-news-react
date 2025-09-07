import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, BarChart3, FileText, Folder, Users, MessageSquare, Settings, Plus, List, Tag, BarChart2 } from "lucide-react";
import { useRole } from "../../hooks/useRole";

const AdminSidebar = () => {
    const location = useLocation();
    const [expandedMenus, setExpandedMenus] = useState({});
    const { isAdmin, isEditor, isAdminAndEditor } = useRole();

    const sidebarItems = [
        {
            id: 'dashboard',
            label: 'Tổng quan',
            icon: BarChart3,
            path: '/manager',
            hasSubmenu: false,
            requiredRoles: ['ADMIN', 'EDITOR']
        },
        {
            id: 'articles',
            label: 'Quản lý nội dung',
            icon: FileText,
            hasSubmenu: true,
            requiredRoles: ['ADMIN', 'EDITOR'],
            submenu: [
                {
                    id: 'all-articles',
                    label: 'Tất cả bài báo',
                    icon: List,
                    path: '/manager/articles',
                    requiredRoles: ['ADMIN', 'EDITOR']
                },
                {
                    id: 'add-new',
                    label: 'Thêm bài báo mới',
                    icon: Plus,
                    path: '/manager/articles/new',
                    requiredRoles: ['ADMIN', 'EDITOR']
                },
                {
                    id: 'article-categories',
                    label: 'Danh mục bài báo',
                    icon: Folder,
                    path: '/manager/categories',
                    requiredRoles: ['ADMIN', 'EDITOR']
                },
                {
                    id: 'tags',
                    label: 'Thẻ bài báo',
                    icon: Tag,
                    path: '/manager/tags',
                    requiredRoles: ['ADMIN', 'EDITOR']
                }
            ]
        },
        {
            id: 'users',
            label: 'Quản lý người dùng',
            icon: Users,
            path: '/manager/users',
            hasSubmenu: false,
            requiredRoles: ['ADMIN']
        },
        {
            id: 'comments',
            label: 'Quản lý bình luận',
            icon: MessageSquare,
            path: '/manager/comments',
            hasSubmenu: false,
            requiredRoles: ['ADMIN', 'EDITOR']
        },
        {
            id: 'analytics',
            label: 'Báo cáo thống kê',
            icon: BarChart2,
            path: '/manager/analytics',
            hasSubmenu: false,
            requiredRoles: ['ADMIN', 'EDITOR']
        },
        {
            id: 'settings',
            label: 'Cài đặt hệ thống',
            icon: Settings,
            path: '/manager/settings',
            hasSubmenu: false,
            requiredRoles: ['ADMIN']
        }
    ];

    const getFilteredMenuItems = () => {
        return sidebarItems.filter(item => {

            if (item.requiredRoles) {
                const hasAccess = item.requiredRoles.some(role => {
                    if (role === 'ADMIN') return isAdmin();
                    if (role === 'EDITOR') return isEditor();
                    return false;
                });

                if (!hasAccess) return false;
            }


            if (item.hasSubmenu && item.submenu) {
                const filteredSubmenu = item.submenu.filter(subItem => {
                    if (subItem.requiredRoles) {
                        return subItem.requiredRoles.some(role => {
                            if (role === 'ADMIN') return isAdmin();
                            if (role === 'EDITOR') return isEditor();
                            return false;
                        });
                    }
                    return true;
                });

                if (filteredSubmenu.length === 0) return false;
                item.submenu = filteredSubmenu;
            }

            return true;
        });
    };

    const filteredSidebarItems = getFilteredMenuItems();

    const toggleSubmenu = (itemId) => {
        setExpandedMenus(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    const handleMenuClick = (item) => {
        if (item.hasSubmenu) {
            toggleSubmenu(item.id);
        }
    };

    const isActiveParent = (item) => {
        if (item.hasSubmenu && item.submenu) {
            return item.submenu.some(subItem => location.pathname === subItem.path);
        }
        return location.pathname === item.path;
    };

    const isCurrentPath = (path) => {
        return location.pathname === path;
    };


    useEffect(() => {
        filteredSidebarItems.forEach(item => {
            if (item.hasSubmenu && item.submenu) {
                const hasActiveSubmenu = item.submenu.some(subItem => location.pathname === subItem.path);
                if (hasActiveSubmenu) {
                    setExpandedMenus(prev => ({
                        ...prev,
                        [item.id]: true
                    }));
                }
            }
        });
    }, [location.pathname]);

    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 z-40">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
                <Link to="/manager" className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">
                            <span className="text-green-600">MAG</span>
                            <span className="text-gray-800">NEWS</span>
                        </h1>
                        <p className="text-xs text-gray-500 font-medium">
                            Admin Panel {isAdmin() ? '(Admin)' : '(Editor)'}
                        </p>
                    </div>
                </Link>
            </div>

            {/* Menu */}
            <nav className="mt-4 px-3">
                {filteredSidebarItems.map((item) => {
                    const IconComponent = item.icon;
                    const isExpanded = expandedMenus[item.id];
                    const isActive = isActiveParent(item);

                    return (
                        <div key={item.id} className="mb-1">
                            {item.hasSubmenu ? (
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

                                    <div className={`transform transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"
                                        }`}>
                                        <ChevronDown className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"
                                            }`} />
                                    </div>

                                    {/* Active indicator */}
                                    {isActive && (
                                        <div className="absolute left-0 top-0 w-1 h-full bg-white rounded-r-full"></div>
                                    )}
                                </button>
                            ) : (

                                <Link
                                    to={item.path}
                                    className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 rounded-lg group relative overflow-hidden block
                                        ${isCurrentPath(item.path)
                                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-[1.02]"
                                            : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-1.5 rounded-md transition-colors duration-200 ${isCurrentPath(item.path) ? "bg-white/20" : "bg-gray-100 group-hover:bg-green-100"
                                            }`}>
                                            <IconComponent className={`w-4 h-4 ${isCurrentPath(item.path) ? "text-white" : "text-gray-600 group-hover:text-green-600"
                                                }`} />
                                        </div>
                                        <span className="font-medium text-sm">{item.label}</span>
                                    </div>

                                    {isCurrentPath(item.path) && (
                                        <div className="absolute left-0 top-0 w-1 h-full bg-white rounded-r-full"></div>
                                    )}
                                </Link>
                            )}

                            {item.hasSubmenu && (
                                <div className={`mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}>
                                    <div className="border-l-2 border-gray-200 pl-4 py-2">
                                        {item.submenu?.map((subItem, index) => {
                                            const SubIconComponent = subItem.icon;
                                            const isSubActive = isCurrentPath(subItem.path);

                                            return (
                                                <Link
                                                    key={subItem.id}
                                                    to={subItem.path}
                                                    className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left text-sm transition-all duration-200 rounded-lg group block
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

                                                    {isSubActive && (
                                                        <div className="ml-auto w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

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