import React, { useEffect, useMemo, useState } from "react";
import { Users, UserPlus, Crown, Shield, User } from "lucide-react";
import StatsCard from "../../components/manager/StatsCard";
import FilterBar from "../../components/manager/FilterBar";
import Pagination from "../../components/Pagination";
import UsersTable from "../../components/manager/user/UsersTable";
import { useUser } from "../../hooks/useUser";
import UserModal from "../../components/manager/user/UserModal";
import SimpleLoading from "../../components/SimpleLoading";

const roles = [
    { value: "ADMIN",  label: "Quản trị" },
    { value: "EDITOR", label: "Biên tập" },
    { value: "USER",   label: "Người dùng" },
];

const UserManagement = () => {
    const [searchTerm, setSearchTerm]   = useState("");
    const [selectedRole, setSelectedRole] = useState("all");
    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [modalMode, setModalMode] = useState("add");

    const { users, pagination, isLoading, loadUsers } = useUser();

    // Stats đếm từ data trang hiện tại (ước lượng)
    const totalAdmin  = users.filter(u => u.roles?.some(r => r.name === "ADMIN")).length;
    const totalEditor = users.filter(u => u.roles?.some(r => r.name === "EDITOR")).length;
    const totalUser   = users.filter(u => !u.roles?.some(r => r.name === "ADMIN" || r.name === "EDITOR")).length;

    const statsData = [
        { title: "Tất cả",     value: pagination.totalElements, icon: Users,  bgColor: "bg-blue-50",   iconColor: "text-blue-600" },
        { title: "Quản trị",   value: totalAdmin,               icon: Crown,  bgColor: "bg-red-50",    iconColor: "text-red-500" },
        { title: "Biên tập",   value: totalEditor,              icon: Shield, bgColor: "bg-green-50",  iconColor: "text-green-600" },
        { title: "Người dùng", value: totalUser,                icon: User,   bgColor: "bg-purple-50", iconColor: "text-purple-600" },
    ];

    // Filter client-side trên trang hiện tại
    const filtered = useMemo(() => users.filter(u => {
        const matchSearch = !searchTerm.trim() ||
            u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.lastName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchRole = selectedRole === "all" || u.roles?.some(r => r.name === selectedRole);
        return matchSearch && matchRole;
    }), [users, searchTerm, selectedRole]);

    const handleCloseModal = () => { setShowUserModal(false); setSelectedUserId(null); setModalMode("add"); };
    const handleEditUser   = (id) => { setSelectedUserId(id); setModalMode("edit"); setShowUserModal(true); };
    const handleAddUser    = () => { setSelectedUserId(null); setModalMode("add"); setShowUserModal(true); };
    const handleSuccess    = () => { loadUsers(pagination.currentPage); handleCloseModal(); };
    const handlePageChange = (page) => { setSearchTerm(""); setSelectedRole("all"); loadUsers(page); };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-5">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
                        <p className="text-sm text-gray-400 mt-0.5">Quản lý tài khoản và phân quyền hệ thống</p>
                    </div>
                    <button
                        onClick={handleAddUser}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
                    >
                        <UserPlus className="w-4 h-4" />
                        Thêm người dùng
                    </button>
                </div>

                <StatsCard statsData={statsData} />

                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Tìm theo tên, email, username..."
                    selectOptions={roles}
                    selectValue={selectedRole}
                    onSelectChange={setSelectedRole}
                    total={filtered.length}
                    label="người dùng"
                />

                {isLoading ? (
                    <SimpleLoading />
                ) : (
                    <>
                        <UsersTable users={filtered} onEdit={handleEditUser} />

                        {/* Pagination — ẩn khi đang filter */}
                        {!searchTerm && selectedRole === "all" && pagination.totalPages > 1 && (
                            <Pagination
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}

                <UserModal
                    isOpen={showUserModal}
                    onClose={handleCloseModal}
                    userId={selectedUserId}
                    mode={modalMode}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
};

export default UserManagement;