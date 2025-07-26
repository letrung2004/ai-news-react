import React, { useState } from "react";

const AdminHeader = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
            {/* Tiêu đề */}
            <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">

                </h2>
            </div>

            {/* Thanh tìm kiếm và thông báo */}
            <div className="flex items-center space-x-4">
                {/* Ô tìm kiếm */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                </div>



                {/* Thông tin Admin */}
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-gray-600 text-sm"></i>
                    </div>
                    <div className="text-sm">
                        <p className="font-medium text-gray-900">Admin User</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <i className="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
