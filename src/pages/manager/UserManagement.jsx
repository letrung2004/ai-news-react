import React, { useState } from "react";
import { Users, UserPlus, CheckCircle, User } from "lucide-react";
import StatsCard from "../../components/manager/StatsCard";
import FilterBar from "../../components/manager/FilterBar";
import Pagination from "../../components/Pagination";
import UsersTable from "../../components/manager/user/UsersTable";
import { useUser } from "../../hooks/useUser";

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { users, loadUsers } = useUser();


    const roles = [
        { value: 'ADMIN', label: 'Quản trị' },
        { value: 'EDITOR', label: 'Biên tập' },
        { value: 'USER', label: 'Người dùng' }
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


    const handleDeleteUser = (userId) => {
        // xu ly xoa
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

                {/* <StatsCard statsData={statsData} /> */}

                {/* Filters */}
                <FilterBar
                    searchTerm={searchTerm}
                // onSearchChange={setSearchTerm}
                // selectOptions={roles}
                // selectValue={selectedRole}
                // onSelectChange={setSelectedRole}
                />

                {/* Users Table */}
                <UsersTable
                    users={users}
                    // onEdit={(user) => {
                    //     setSelectedUser(user);
                    //     setShowAddModal(true);
                    // }}
                    onDelete={handleDeleteUser}
                />


                {/* <Pagination
                    currentPage={1}
                    totalPages={5}
                    onPageChange={(page) => console.log("Chuyển sang trang:", page)}
                /> */}

            </div>
        </div>
    );
};

export default UserManagement;