import React, { useState } from "react";
import {
    Users, UserPlus, Search, Filter, MoreVertical, Edit3,
    Trash2, Ban, CheckCircle, Calendar, Mail, Phone,
    Shield, User, Crown, AlertCircle, ArrowUpRight
} from "lucide-react";

const UserManagement = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState("7days");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Mock data for users
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Nguyễn Văn An",
            email: "nguyenvanan@gmail.com",
            phone: "0123456789",
            role: "admin",
            status: "active",
            joinDate: "15/01/2024",
            lastActive: "Hôm nay",
            articlesCount: 45,
            commentsCount: 128,
            avatar: null
        },
        {
            id: 2,
            name: "Trần Thị Bình",
            email: "tranthibinh@gmail.com",
            phone: "0987654321",
            role: "editor",
            status: "active",
            joinDate: "22/02/2024",
            lastActive: "2 giờ trước",
            articlesCount: 23,
            commentsCount: 67,
            avatar: null
        },
        {
            id: 3,
            name: "Lê Hoàng Cường",
            email: "lehoangcuong@gmail.com",
            phone: "0456789123",
            role: "user",
            status: "inactive",
            joinDate: "10/03/2024",
            lastActive: "3 ngày trước",
            articlesCount: 0,
            commentsCount: 15,
            avatar: null
        },
        {
            id: 4,
            name: "Phạm Thị Dung",
            email: "phamthidung@gmail.com",
            phone: "0789123456",
            role: "user",
            status: "banned",
            joinDate: "05/04/2024",
            lastActive: "1 tuần trước",
            articlesCount: 2,
            commentsCount: 8,
            avatar: null
        },
        {
            id: 5,
            name: "Hoàng Văn Em",
            email: "hoangvanem@gmail.com",
            phone: "0321654987",
            role: "editor",
            status: "active",
            joinDate: "18/05/2024",
            lastActive: "30 phút trước",
            articlesCount: 12,
            commentsCount: 34,
            avatar: null
        }
    ]);

    const statsData = [
        {
            title: 'Người dùng quản trị',
            value: users.length.toString(),
            change: '+12%',
            icon: Users,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Biên tập viên',
            value: users.filter(u => u.lastActive.includes('giờ') || u.lastActive === 'Hôm nay').length.toString(),
            change: '+8%',
            icon: CheckCircle,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600'
        },
        {
            title: 'Người dùng',
            value: '15',
            change: '+23%',
            icon: UserPlus,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600'
        }
    ];

    const getRoleBadge = (role) => {
        const roleConfig = {
            admin: {
                label: 'Quản trị',
                color: 'bg-red-100 text-red-800 border-red-200',
                icon: Crown
            },
            editor: {
                label: 'Biên tập',
                color: 'bg-blue-100 text-blue-800 border-blue-200',
                icon: Shield
            },
            user: {
                label: 'Người dùng',
                color: 'bg-gray-100 text-gray-800 border-gray-200',
                icon: User
            }
        };
        return roleConfig[role] || roleConfig.user;
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: {
                label: 'Hoạt động',
                color: 'bg-green-100 text-green-800 border-green-200'
            },
            inactive: {
                label: 'Không hoạt động',
                color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
            },
            banned: {
                label: 'Bị khóa',
                color: 'bg-red-100 text-red-800 border-red-200'
            }
        };
        return statusConfig[status] || statusConfig.active;
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const handleDeleteUser = (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const handleToggleStatus = (userId) => {
        setUsers(users.map(user => {
            if (user.id === userId) {
                return {
                    ...user,
                    status: user.status === 'active' ? 'banned' : 'active'
                };
            }
            return user;
        }));
    };

    const UserModal = ({ user, onClose, onSave }) => {
        const [formData, setFormData] = useState(user || {
            name: '',
            email: '',
            phone: '',
            role: 'user',
            status: 'active'
        });

        const handleSubmit = () => {
            onSave(formData);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-md m-4">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {user ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
                        </h3>
                    </div>

                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="active">Hoạt động</option>
                        <option value="inactive">Không hoạt động</option>
                        <option value="banned">Bị khóa</option>
                    </select>
                </div>


                <div className="flex items-center justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        {user ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </div>

            </div >
        );
    };

    const handleSaveUser = (userData) => {
        if (selectedUser) {
            // Update existing user
            setUsers(users.map(user =>
                user.id === selectedUser.id
                    ? { ...user, ...userData }
                    : user
            ));
        } else {
            // Add new user
            const newUser = {
                ...userData,
                id: Math.max(...users.map(u => u.id)) + 1,
                joinDate: new Date().toLocaleDateString('vi-VN'),
                lastActive: 'Vừa tạo',
                articlesCount: 0,
                commentsCount: 0
            };
            setUsers([...users, newUser]);
        }
        setShowAddModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý người dùng</h1>
                            <p className="text-gray-600">Quản lý tài khoản và phân quyền người dùng hệ thống.</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                            >
                                <UserPlus className="w-4 h-4" />
                                <span>Thêm người dùng</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {statsData.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                                        <div className="flex items-center space-x-1">
                                            <ArrowUpRight className="w-4 h-4 text-green-600" />
                                            <span className="text-sm font-medium text-green-600">{stat.change}</span>
                                            <span className="text-sm text-gray-500">từ tháng trước</span>
                                        </div>
                                    </div>
                                    <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className={`w-7 h-7 ${stat.iconColor}`} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo tên hoặc email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="all">Tất cả vai trò</option>
                                <option value="admin">Quản trị</option>
                                <option value="editor">Biên tập</option>
                                <option value="user">Người dùng</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Danh sách người dùng</h3>
                                <p className="text-sm text-gray-600 mt-1">Hiển thị {filteredUsers.length} người dùng</p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Người dùng</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vai trò</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => {
                                    const roleConfig = getRoleBadge(user.role);
                                    const statusConfig = getStatusBadge(user.status);
                                    const RoleIcon = roleConfig.icon;

                                    return (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                                                            <Mail className="w-3 h-3" />
                                                            <span>{user.email}</span>
                                                        </div>
                                                        {user.phone && (
                                                            <div className="text-sm text-gray-500 flex items-center space-x-1">
                                                                <Phone className="w-3 h-3" />
                                                                <span>{user.phone}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${roleConfig.color}`}>
                                                    <RoleIcon className="w-3 h-3 mr-1" />
                                                    {roleConfig.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setShowAddModal(true);
                                                        }}
                                                        className="p-1 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleStatus(user.id)}
                                                        className={`p-1 rounded-md transition-colors ${user.status === 'banned'
                                                            ? 'text-green-600 hover:bg-green-100'
                                                            : 'text-orange-600 hover:bg-orange-100'
                                                            }`}
                                                        title={user.status === 'banned' ? 'Mở khóa' : 'Khóa tài khoản'}
                                                    >
                                                        {user.status === 'banned' ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="p-1 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                                                        title="Xóa"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Hiển thị <span className="font-medium">1-{filteredUsers.length}</span> của <span className="font-medium">{users.length}</span> người dùng
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1 bg-white border border-gray-200 rounded-md text-sm hover:bg-gray-50 transition-colors">
                                    Trước
                                </button>
                                <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors">
                                    1
                                </button>
                                <button className="px-3 py-1 bg-white border border-gray-200 rounded-md text-sm hover:bg-gray-50 transition-colors">
                                    2
                                </button>
                                <button className="px-3 py-1 bg-white border border-gray-200 rounded-md text-sm hover:bg-gray-50 transition-colors">
                                    Sau
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add/Edit User Modal */}
                {showAddModal && (
                    <UserModal
                        user={selectedUser}
                        onClose={() => {
                            setShowAddModal(false);
                            setSelectedUser(null);
                        }}
                        onSave={handleSaveUser}
                    />
                )}
            </div>
        </div>
    );
};

export default UserManagement;