import React from "react";
import { Mail, Edit3, User, Shield, Crown } from "lucide-react";

const ROLE_CONFIG = {
    ADMIN:  { label: "Quản trị",   cls: "bg-red-50 text-red-600 border-red-200",    icon: Crown },
    EDITOR: { label: "Biên tập",   cls: "bg-blue-50 text-blue-600 border-blue-200", icon: Shield },
    USER:   { label: "Người dùng", cls: "bg-gray-50 text-gray-600 border-gray-200", icon: User },
};

const getRoleConfig = (roles) => {
    const name = roles?.[0]?.name || "USER";
    return ROLE_CONFIG[name] || ROLE_CONFIG.USER;
};

const Avatar = ({ name }) => (
    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
        {(name || "?").charAt(0).toUpperCase()}
    </div>
);

// users giờ là array thẳng
const UsersTable = ({ users = [], onEdit }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">Danh sách người dùng</h3>
            <span className="text-xs text-gray-400">{users.length} người dùng</span>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-50 bg-gray-50/50">
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Người dùng</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide hidden md:table-cell">Email</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Vai trò</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {users.map((user) => {
                        const role = getRoleConfig(user.roles);
                        const RoleIcon = role.icon;
                        const displayName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username;

                        return (
                            <tr key={user.id} className="hover:bg-gray-50/80 transition-colors group">
                                <td className="px-6 py-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar name={user.firstName || user.username} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{displayName}</p>
                                            <p className="text-xs text-gray-400">@{user.username}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 hidden md:table-cell">
                                    {user.email
                                        ? <div className="flex items-center gap-1.5 text-xs text-gray-500"><Mail className="w-3 h-3 flex-shrink-0" /><span className="truncate max-w-xs">{user.email}</span></div>
                                        : <span className="text-xs text-gray-300 italic">Chưa có</span>
                                    }
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium border ${role.cls}`}>
                                        <RoleIcon className="w-3 h-3" />
                                        {role.label}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => onEdit(user.id)}
                                        className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-16 text-center">
                                <User className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                                <p className="text-sm text-gray-400">Không có người dùng nào</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export default UsersTable;