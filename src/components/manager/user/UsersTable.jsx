import React from "react";
import { Mail, Phone, Edit3, Trash2, User, Shield, Crown } from "lucide-react";

const getRoleBadge = (roles) => {
    // Lấy role đầu tiên từ mảng roles
    const primaryRole = roles && roles.length > 0 ? roles[0].name : 'USER';

    const roleConfig = {
        ADMIN: { label: "Quản trị", color: "bg-red-100 text-red-800 border-red-200", icon: Crown },
        EDITOR: { label: "Biên tập", color: "bg-blue-100 text-blue-800 border-blue-200", icon: Shield },
        USER: { label: "Người dùng", color: "bg-gray-100 text-gray-800 border-gray-200", icon: User }
    };

    return roleConfig[primaryRole] || roleConfig.USER;
};

const UsersTable = ({ users, onEdit, onDelete }) => {
    const userList = users?.result || [];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Danh sách người dùng</h3>
                        <p className="text-sm text-gray-600 mt-1">Hiển thị {userList.length} người dùng</p>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Người dùng
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Vai trò
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {userList.map((user) => {
                            const roleConfig = getRoleBadge(user.roles);
                            const RoleIcon = roleConfig.icon;
                            const displayName = user.firstName || user.username;
                            const fullName = user.firstName && user.lastName
                                ? `${user.firstName} ${user.lastName}`
                                : user.firstName || user.username;

                            return (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                                {displayName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {fullName}
                                                </div>
                                                <div className="text-xs text-gray-500 mb-1">
                                                    @{user.username}
                                                </div>
                                                {user.email && (
                                                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                                                        <Mail className="w-3 h-3" />
                                                        <span>{user.email}</span>
                                                    </div>
                                                )}
                                                {user.phone && (
                                                    <div className="text-sm text-gray-500 flex items-center space-x-1 mt-1">
                                                        <Phone className="w-3 h-3" />
                                                        <span>{user.phone}</span>
                                                    </div>
                                                )}
                                                {!user.email && !user.phone && (
                                                    <div className="text-xs text-gray-400 italic">
                                                        Chưa có thông tin liên hệ
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${roleConfig.color}`}
                                            >
                                                <RoleIcon className="w-3 h-3 mr-1" />
                                                {roleConfig.label}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => onEdit(user)}
                                                className="p-1 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(user.id)}
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
                        {userList.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                    Không có người dùng nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTable;