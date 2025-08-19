import React, { useState } from "react";
import { Users, UserPlus, CheckCircle, User } from "lucide-react";
import StatsCard from "../../components/manager/StatsCard";
import FilterBar from "../../components/manager/FilterBar";
import Pagination from "../../components/Pagination";
import UsersTable from "../../components/manager/user/UsersTable";

const UserManagement = () => {
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

    const roles = [
        { value: 'admin', label: 'Quản trị' },
        { value: 'editor', label: 'Biên tập' },
        { value: 'user', label: 'Người dùng' }
    ];

    const statsData = [
        {
            title: 'Tất cả',
            value: '2,847',
            icon: Users,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Người dùng quản trị',
            value: '2,847',
            icon: User,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Biên tập viên',
            value: '2,847',
            icon: CheckCircle,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600'
        },
        {
            title: 'Người dùng',
            value: '2,847',
            icon: UserPlus,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600'
        }
    ];

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

                <StatsCard statsData={statsData} />

                {/* Filters */}
                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectOptions={roles}
                    selectValue={selectedRole}
                    onSelectChange={setSelectedRole}
                />

                {/* Users Table */}
                <UsersTable
                    users={filteredUsers}
                    onEdit={(user) => {
                        setSelectedUser(user);
                        setShowAddModal(true);
                    }}
                    onDelete={handleDeleteUser}
                />


                <Pagination
                    currentPage={1}
                    totalPages={5}
                    onPageChange={(page) => console.log("Chuyển sang trang:", page)}
                />

            </div>
        </div>
    );
};

export default UserManagement;