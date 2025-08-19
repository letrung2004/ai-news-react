import React from "react";
import { Mail, Phone, Edit3, Trash2, User, Shield, Crown } from "lucide-react";

const getRoleBadge = (role) => {
    const roleConfig = {
        admin: { label: "Quản trị", color: "bg-red-100 text-red-800 border-red-200", icon: Crown },
        editor: { label: "Biên tập", color: "bg-blue-100 text-blue-800 border-blue-200", icon: Shield },
        user: { label: "Người dùng", color: "bg-gray-100 text-gray-800 border-gray-200", icon: User }
    };
    return roleConfig[role] || roleConfig.user;
};

const UsersTable = ({ users, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Danh sách người dùng</h3>
                        <p className="text-sm text-gray-600 mt-1">Hiển thị {users.length} người dùng</p>
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
                        {users.map((user) => {
                            const roleConfig = getRoleBadge(user.role);
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
                                        <span
                                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${roleConfig.color}`}
                                        >
                                            <RoleIcon className="w-3 h-3 mr-1" />
                                            {roleConfig.label}
                                        </span>
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
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTable;
