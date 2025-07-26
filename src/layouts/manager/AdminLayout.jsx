import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar ";
import AdminHeader from "./AdminHeader";
const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="ml-64">
                {/* Header */}
                <AdminHeader />

                {/* Main Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>

    );

};

export default AdminLayout;