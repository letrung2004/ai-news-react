import React, { useState } from "react";
import {
    Settings, Shield, Key, Users, Globe, Database, Mail,
    Save, Plus, Edit3, Trash2, Check, X, AlertTriangle,
    Crown, UserCheck, Eye, FileText, MessageSquare, ArrowUpRight,
    Server, Lock, Palette, Bell, Search
} from "lucide-react";

const SystemSettings = () => {
    const [activeTab, setActiveTab] = useState("general");
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedPermission, setSelectedPermission] = useState(null);

    // Mock data for roles
    const [roles, setRoles] = useState([
        {
            id: 1,
            name: "Super Admin",
            displayName: "Quản trị tối cao",
            description: "Quyền cao nhất, quản lý toàn bộ hệ thống",
            color: "red",
            userCount: 2,
            permissions: ["all"],
            isSystem: true,
            createdAt: "01/01/2024"
        },
        {
            id: 2,
            name: "Admin",
            displayName: "Quản trị viên",
            description: "Quản lý nội dung và người dùng",
            color: "blue",
            userCount: 5,
            permissions: ["manage_users", "manage_content", "manage_comments", "view_analytics"],
            isSystem: true,
            createdAt: "15/01/2024"
        },
        {
            id: 3,
            name: "Editor",
            displayName: "Biên tập viên",
            description: "Tạo và chỉnh sửa nội dung",
            color: "green",
            userCount: 12,
            permissions: ["create_content", "edit_content", "manage_comments", "view_content"],
            isSystem: false,
            createdAt: "20/02/2024"
        },
        {
            id: 4,
            name: "Moderator",
            displayName: "Điều hành viên",
            description: "Quản lý bình luận và tương tác",
            color: "purple",
            userCount: 8,
            permissions: ["manage_comments", "moderate_users", "view_content"],
            isSystem: false,
            createdAt: "10/03/2024"
        },
        {
            id: 5,
            name: "User",
            displayName: "Người dùng",
            description: "Quyền cơ bản cho người dùng thông thường",
            color: "gray",
            userCount: 234,
            permissions: ["view_content", "comment", "like"],
            isSystem: true,
            createdAt: "01/01/2024"
        }
    ]);

    // Mock data for permissions
    const [permissions, setPermissions] = useState([
        {
            id: 1,
            name: "all",
            displayName: "Toàn quyền",
            description: "Quyền truy cập tất cả chức năng",
            category: "System",
            isSystem: true
        },
        {
            id: 2,
            name: "manage_users",
            displayName: "Quản lý người dùng",
            description: "Tạo, sửa, xóa tài khoản người dùng",
            category: "User Management",
            isSystem: false
        },
        {
            id: 3,
            name: "manage_content",
            displayName: "Quản lý nội dung",
            description: "Quản lý bài viết, danh mục",
            category: "Content",
            isSystem: false
        },
        {
            id: 4,
            name: "create_content",
            displayName: "Tạo nội dung",
            description: "Tạo bài viết mới",
            category: "Content",
            isSystem: false
        },
        {
            id: 5,
            name: "edit_content",
            displayName: "Chỉnh sửa nội dung",
            description: "Chỉnh sửa bài viết",
            category: "Content",
            isSystem: false
        },
        {
            id: 6,
            name: "view_content",
            displayName: "Xem nội dung",
            description: "Xem bài viết đã xuất bản",
            category: "Content",
            isSystem: false
        },
        {
            id: 7,
            name: "manage_comments",
            displayName: "Quản lý bình luận",
            description: "Duyệt, xóa bình luận",
            category: "Interaction",
            isSystem: false
        },
        {
            id: 8,
            name: "comment",
            displayName: "Bình luận",
            description: "Viết bình luận",
            category: "Interaction",
            isSystem: false
        },
        {
            id: 9,
            name: "like",
            displayName: "Thích bài viết",
            description: "Like/unlike bài viết",
            category: "Interaction",
            isSystem: false
        },
        {
            id: 10,
            name: "moderate_users",
            displayName: "Điều hành người dùng",
            description: "Khóa/mở khóa tài khoản",
            category: "User Management",
            isSystem: false
        },
        {
            id: 11,
            name: "view_analytics",
            displayName: "Xem thống kê",
            description: "Truy cập dashboard thống kê",
            category: "Analytics",
            isSystem: false
        }
    ]);

    // General settings
    const [generalSettings, setGeneralSettings] = useState({
        siteName: "News Portal",
        siteDescription: "Trang tin tức công nghệ hàng đầu",
        siteUrl: "https://newsportal.com",
        adminEmail: "admin@newsportal.com",
        timezone: "Asia/Ho_Chi_Minh",
        language: "vi",
        allowRegistration: true,
        requireEmailVerification: true,
        moderateComments: true,
        enableNotifications: true
    });

    const getRoleColorClass = (color) => {
        const colorMap = {
            red: "bg-red-100 text-red-800 border-red-200",
            blue: "bg-blue-100 text-blue-800 border-blue-200",
            green: "bg-green-100 text-green-800 border-green-200",
            purple: "bg-purple-100 text-purple-800 border-purple-200",
            gray: "bg-gray-100 text-gray-800 border-gray-200",
            yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
            orange: "bg-orange-100 text-orange-800 border-orange-200"
        };
        return colorMap[color] || colorMap.gray;
    };

    const getCategoryColor = (category) => {
        const categoryColors = {
            "System": "bg-red-100 text-red-800 border-red-200",
            "User Management": "bg-blue-100 text-blue-800 border-blue-200",
            "Content": "bg-green-100 text-green-800 border-green-200",
            "Interaction": "bg-purple-100 text-purple-800 border-purple-200",
            "Analytics": "bg-orange-100 text-orange-800 border-orange-200"
        };
        return categoryColors[category] || "bg-gray-100 text-gray-800 border-gray-200";
    };

    const RoleModal = ({ role, onClose, onSave }) => {
        const [formData, setFormData] = useState(role || {
            name: '',
            displayName: '',
            description: '',
            color: 'blue',
            permissions: []
        });

        const handlePermissionToggle = (permissionName) => {
            const newPermissions = formData.permissions.includes(permissionName)
                ? formData.permissions.filter(p => p !== permissionName)
                : [...formData.permissions, permissionName];
            setFormData({ ...formData, permissions: newPermissions });
        };

        const handleSave = () => {
            if (!formData.name.trim() || !formData.displayName.trim()) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }
            onSave(formData);
        };

        const groupedPermissions = permissions.reduce((acc, permission) => {
            if (!acc[permission.category]) {
                acc[permission.category] = [];
            }
            acc[permission.category].push(permission);
            return acc;
        }, {});

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl m-4 max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {role ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
                        </h3>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Basic Info */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-900">Thông tin cơ bản</h4>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tên vai trò <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="admin, editor, user..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tên hiển thị <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.displayName}
                                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Quản trị viên"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                        placeholder="Mô tả vai trò và quyền hạn..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Màu sắc</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['red', 'blue', 'green', 'purple', 'yellow', 'orange', 'gray'].map(color => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, color })}
                                                className={`w-8 h-8 rounded-lg border-2 ${formData.color === color ? 'border-gray-800' : 'border-gray-300'
                                                    } ${getRoleColorClass(color).replace('text-', 'bg-').replace('border-', '').replace('100', '300')}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Permissions */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-900">Quyền hạn</h4>
                                <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
                                    {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                                        <div key={category} className="border-b border-gray-100 last:border-b-0">
                                            <div className="p-3 bg-gray-50">
                                                <h5 className="font-medium text-sm text-gray-700">{category}</h5>
                                            </div>
                                            <div className="p-3 space-y-2">
                                                {categoryPermissions.map(permission => (
                                                    <label key={permission.id} className="flex items-start space-x-3 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.permissions.includes(permission.name)}
                                                            onChange={() => handlePermissionToggle(permission.name)}
                                                            disabled={permission.name === 'all' && !role?.isSystem}
                                                            className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {permission.displayName}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {permission.description}
                                                            </div>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                {role ? 'Cập nhật' : 'Thêm mới'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const PermissionModal = ({ permission, onClose, onSave }) => {
        const [formData, setFormData] = useState(permission || {
            name: '',
            displayName: '',
            description: '',
            category: 'Content'
        });

        const handleSave = () => {
            if (!formData.name.trim() || !formData.displayName.trim()) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }
            onSave(formData);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-md m-4">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {permission ? 'Chỉnh sửa quyền hạn' : 'Thêm quyền hạn mới'}
                        </h3>
                    </div>

                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tên quyền hạn <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="create_content, edit_user..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tên hiển thị <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.displayName}
                                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Tạo nội dung"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                placeholder="Mô tả chức năng của quyền hạn..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="System">System</option>
                                <option value="User Management">User Management</option>
                                <option value="Content">Content</option>
                                <option value="Interaction">Interaction</option>
                                <option value="Analytics">Analytics</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-end space-x-3 pt-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                {permission ? 'Cập nhật' : 'Thêm mới'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const handleSaveRole = (roleData) => {
        if (selectedRole) {
            setRoles(roles.map(role =>
                role.id === selectedRole.id
                    ? { ...role, ...roleData }
                    : role
            ));
        } else {
            const newRole = {
                ...roleData,
                id: Math.max(...roles.map(r => r.id)) + 1,
                userCount: 0,
                isSystem: false,
                createdAt: new Date().toLocaleDateString('vi-VN')
            };
            setRoles([...roles, newRole]);
        }
        setShowRoleModal(false);
        setSelectedRole(null);
    };

    const handleSavePermission = (permissionData) => {
        if (selectedPermission) {
            setPermissions(permissions.map(permission =>
                permission.id === selectedPermission.id
                    ? { ...permission, ...permissionData }
                    : permission
            ));
        } else {
            const newPermission = {
                ...permissionData,
                id: Math.max(...permissions.map(p => p.id)) + 1,
                isSystem: false
            };
            setPermissions([...permissions, newPermission]);
        }
        setShowPermissionModal(false);
        setSelectedPermission(null);
    };

    const handleDeleteRole = (roleId) => {
        const role = roles.find(r => r.id === roleId);
        if (role.isSystem) {
            alert('Không thể xóa vai trò hệ thống');
            return;
        }
        if (window.confirm('Bạn có chắc chắn muốn xóa vai trò này?')) {
            setRoles(roles.filter(role => role.id !== roleId));
        }
    };

    const handleDeletePermission = (permissionId) => {
        const permission = permissions.find(p => p.id === permissionId);
        if (permission.isSystem) {
            alert('Không thể xóa quyền hạn hệ thống');
            return;
        }
        if (window.confirm('Bạn có chắc chắn muốn xóa quyền hạn này?')) {
            setPermissions(permissions.filter(permission => permission.id !== permissionId));
        }
    };

    const handleSaveSettings = () => {
        // In a real app, this would save to backend
        alert('Cài đặt đã được lưu thành công!');
    };

    const tabs = [
        { id: "general", label: "Tổng quan", icon: Settings },
        { id: "roles", label: "Vai trò", icon: Crown },
        { id: "permissions", label: "Quyền hạn", icon: Key },
        { id: "security", label: "Bảo mật", icon: Lock },
        { id: "notifications", label: "Thông báo", icon: Bell }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Cài đặt hệ thống</h1>
                            <p className="text-gray-600">Quản lý cấu hình, vai trò và quyền hạn của hệ thống.</p>
                        </div>
                        <button
                            onClick={handleSaveSettings}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                            <Save className="w-4 h-4" />
                            <span>Lưu thay đổi</span>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                    <div className="flex overflow-x-auto">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                            ? 'border-green-500 text-green-600 bg-green-50'
                                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    {activeTab === "general" && (
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Cài đặt tổng quan</h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tên website</label>
                                        <input
                                            type="text"
                                            value={generalSettings.siteName}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                                        <textarea
                                            value={generalSettings.siteDescription}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">URL website</label>
                                        <input
                                            type="url"
                                            value={generalSettings.siteUrl}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, siteUrl: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email quản trị</label>
                                        <input
                                            type="email"
                                            value={generalSettings.adminEmail}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, adminEmail: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Múi giờ</label>
                                        <select
                                            value={generalSettings.timezone}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            <option value="Asia/Ho_Chi_Minh">Việt Nam (UTC+7)</option>
                                            <option value="UTC">UTC (UTC+0)</option>
                                            <option value="America/New_York">New York (UTC-5)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Ngôn ngữ</label>
                                        <select
                                            value={generalSettings.language}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            <option value="vi">Tiếng Việt</option>
                                            <option value="en">English</option>
                                        </select>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-900">Cài đặt chức năng</h4>

                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={generalSettings.allowRegistration}
                                                onChange={(e) => setGeneralSettings({ ...generalSettings, allowRegistration: e.target.checked })}
                                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-700">Cho phép đăng ký tài khoản</span>
                                        </label>

                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={generalSettings.requireEmailVerification}
                                                onChange={(e) => setGeneralSettings({ ...generalSettings, requireEmailVerification: e.target.checked })}
                                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-700">Yêu cầu xác thực email</span>
                                        </label>

                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={generalSettings.moderateComments}
                                                onChange={(e) => setGeneralSettings({ ...generalSettings, moderateComments: e.target.checked })}
                                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-700">Duyệt bình luận trước khi hiển thị</span>
                                        </label>

                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={generalSettings.enableNotifications}
                                                onChange={(e) => setGeneralSettings({ ...generalSettings, enableNotifications: e.target.checked })}
                                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-700">Bật thông báo hệ thống</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "roles" && (
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Quản lý vai trò</h3>
                                    <p className="text-sm text-gray-600 mt-1">Tạo và quản lý các vai trò người dùng trong hệ thống</p>
                                </div>
                                <button
                                    onClick={() => setShowRoleModal(true)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Thêm vai trò</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {roles.map((role) => (
                                    <div key={role.id} className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getRoleColorClass(role.color)}`}>
                                                    <Crown className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{role.displayName}</h4>
                                                    <p className="text-xs text-gray-500">#{role.name}</p>
                                                </div>
                                            </div>
                                            {role.isSystem && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    <Shield className="w-3 h-3 mr-1" />
                                                    Hệ thống
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{role.description}</p>

                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <div className="flex items-center space-x-1">
                                                <Users className="w-4 h-4" />
                                                <span>{role.userCount} người dùng</span>
                                            </div>
                                            <span>Tạo: {role.createdAt}</span>
                                        </div>

                                        <div className="mb-4">
                                            <h5 className="text-xs font-medium text-gray-700 mb-2">Quyền hạn:</h5>
                                            <div className="flex flex-wrap gap-1">
                                                {role.permissions.slice(0, 3).map(permission => {
                                                    const perm = permissions.find(p => p.name === permission);
                                                    return perm ? (
                                                        <span key={permission} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white border border-gray-200">
                                                            {perm.displayName}
                                                        </span>
                                                    ) : null;
                                                })}
                                                {role.permissions.length > 3 && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-200 text-gray-600">
                                                        +{role.permissions.length - 3} khác
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedRole(role);
                                                    setShowRoleModal(true);
                                                }}
                                                className="flex-1 px-3 py-2 text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-sm font-medium"
                                            >
                                                <Edit3 className="w-4 h-4 inline mr-1" />
                                                Chỉnh sửa
                                            </button>
                                            {!role.isSystem && (
                                                <button
                                                    onClick={() => handleDeleteRole(role.id)}
                                                    className="px-3 py-2 text-red-600 bg-red-100 hover:bg-red-200 rounded-lg transition-colors text-sm"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "permissions" && (
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Quản lý quyền hạn</h3>
                                    <p className="text-sm text-gray-600 mt-1">Tạo và quản lý các quyền hạn trong hệ thống</p>
                                </div>
                                <button
                                    onClick={() => setShowPermissionModal(true)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Thêm quyền hạn</span>
                                </button>
                            </div>

                            {/* Group permissions by category */}
                            {Object.entries(
                                permissions.reduce((acc, permission) => {
                                    if (!acc[permission.category]) {
                                        acc[permission.category] = [];
                                    }
                                    acc[permission.category].push(permission);
                                    return acc;
                                }, {})
                            ).map(([category, categoryPermissions]) => (
                                <div key={category} className="mb-8">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(category)}`}>
                                            {category}
                                        </span>
                                        <span className="text-sm text-gray-500">({categoryPermissions.length} quyền)</span>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                        {categoryPermissions.map((permission) => (
                                            <div key={permission.id} className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                            <Key className="w-4 h-4 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">{permission.displayName}</h4>
                                                            <p className="text-xs text-gray-500">#{permission.name}</p>
                                                        </div>
                                                    </div>
                                                    {permission.isSystem && (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            <Lock className="w-3 h-3 mr-1" />
                                                            Hệ thống
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{permission.description}</p>

                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedPermission(permission);
                                                            setShowPermissionModal(true);
                                                        }}
                                                        className="flex-1 px-3 py-2 text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-sm font-medium"
                                                    >
                                                        <Edit3 className="w-4 h-4 inline mr-1" />
                                                        Chỉnh sửa
                                                    </button>
                                                    {!permission.isSystem && (
                                                        <button
                                                            onClick={() => handleDeletePermission(permission.id)}
                                                            className="px-3 py-2 text-red-600 bg-red-100 hover:bg-red-200 rounded-lg transition-colors text-sm"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Cài đặt bảo mật</h3>

                            <div className="space-y-6">
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                        <h4 className="font-medium text-yellow-800">Cảnh báo bảo mật</h4>
                                    </div>
                                    <p className="text-sm text-yellow-700">
                                        Các cài đặt bảo mật quan trọng. Thay đổi cẩn thận để tránh ảnh hưởng đến hoạt động của hệ thống.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h4 className="font-medium text-gray-900">Xác thực</h4>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian hết hạn session (phút)</label>
                                            <input
                                                type="number"
                                                defaultValue={120}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Số lần đăng nhập sai tối đa</label>
                                            <input
                                                type="number"
                                                defaultValue={5}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian khóa tài khoản (phút)</label>
                                            <input
                                                type="number"
                                                defaultValue={30}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-medium text-gray-900">Mật khẩu</h4>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Độ dài tối thiểu</label>
                                            <input
                                                type="number"
                                                defaultValue={8}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">Yêu cầu chữ hoa</span>
                                            </label>

                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">Yêu cầu số</span>
                                            </label>

                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">Yêu cầu ký tự đặc biệt</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Cài đặt thông báo</h3>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h4 className="font-medium text-gray-900">Thông báo email</h4>

                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">Người dùng mới đăng ký</span>
                                            </label>

                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">Bài viết mới được tạo</span>
                                            </label>

                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">Bình luận cần duyệt</span>
                                            </label>

                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">Báo cáo lỗi hệ thống</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-medium text-gray-900">Thông báo trong app</h4>

                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">Hoạt động người dùng</span>
                                            </label>

                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">Cập nhật hệ thống</span>
                                            </label>

                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">Thông báo bảo trì</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <h4 className="font-medium text-gray-900 mb-4">Cấu hình SMTP</h4>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                                            <input
                                                type="text"
                                                placeholder="smtp.gmail.com"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                                            <input
                                                type="number"
                                                placeholder="587"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                            Kiểm tra kết nối
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modals */}
                {showRoleModal && (
                    <RoleModal
                        role={selectedRole}
                        onClose={() => {
                            setShowRoleModal(false);
                            setSelectedRole(null);
                        }}
                        onSave={handleSaveRole}
                    />
                )}

                {showPermissionModal && (
                    <PermissionModal
                        permission={selectedPermission}
                        onClose={() => {
                            setShowPermissionModal(false);
                            setSelectedPermission(null);
                        }}
                        onSave={handleSavePermission}
                    />
                )}
            </div>
        </div>
    );
};

export default SystemSettings;