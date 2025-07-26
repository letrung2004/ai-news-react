import React, { useState } from "react";

const AdminHome = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const statsData = [
        { title: 'Tổng bài viết', value: '2,847', change: '+12%', icon: 'fas fa-newspaper', color: 'bg-blue-500' },
        { title: 'Lượt xem hôm nay', value: '45,623', change: '+8%', icon: 'fas fa-eye', color: 'bg-green-500' },
        { title: 'Bình luận mới', value: '1,234', change: '+15%', icon: 'fas fa-comments', color: 'bg-purple-500' },
        { title: 'Người dùng online', value: '892', change: '+5%', icon: 'fas fa-users', color: 'bg-orange-500' }
    ];

    const recentArticles = [
        {
            id: 1,
            title: 'Microsoft quisque at ipsum vel orci eleifend ultrices',
            category: 'Công nghệ',
            author: 'Nguyễn Văn A',
            date: '26/07/2025',
            status: 'Đã xuất bản',
            views: '1,234'
        },
        {
            id: 2,
            title: 'London ipsum dolor sit amet, consectetur adipiscing elit',
            category: 'Văn hóa',
            author: 'Trần Thị B',
            date: '25/07/2025',
            status: 'Đang chờ',
            views: '856'
        },
        {
            id: 3,
            title: 'Pellentesque dui nibh, pellentesque ut dapibus ut',
            category: 'Thể thao',
            author: 'Lê Văn C',
            date: '24/07/2025',
            status: 'Đã xuất bản',
            views: '2,341'
        },
        {
            id: 4,
            title: 'Motobike Vestibulum venenatis purus nec nibh volutpat',
            category: 'Thể thao',
            author: 'Phạm Thị D',
            date: '23/07/2025',
            status: 'Đã xuất bản',
            views: '1,567'
        }
    ];
    return (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsData.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                <p className="text-sm text-green-600 mt-1">{stat.change} từ hôm qua</p>
                            </div>
                            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                <i className={`${stat.icon} text-white text-lg`}></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts and Recent Articles */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Lượt truy cập 7 ngày qua</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <i className="fas fa-chart-area text-4xl text-gray-400 mb-2"></i>
                            <p className="text-gray-500">Biểu đồ thống kê lượt truy cập</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
                    <div className="space-y-3">
                        <button
                            onClick={() => setActiveTab('add-new')}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Thêm bài viết mới
                        </button>
                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                            <i className="fas fa-folder-plus mr-2"></i>
                            Thêm danh mục
                        </button>
                        <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
                            <i className="fas fa-user-plus mr-2"></i>
                            Thêm người dùng
                        </button>
                        <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer whitespace-nowrap">
                            <i className="fas fa-cog mr-2"></i>
                            Cài đặt hệ thống
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Articles */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Bài viết gần đây</h3>
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium cursor-pointer">
                            Xem tất cả
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tác giả</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt xem</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentArticles.map((article) => (
                                <tr key={article.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900 line-clamp-2">{article.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {article.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{article.author}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{article.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${article.status === 'Đã xuất bản'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {article.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{article.views}</td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button className="text-blue-600 hover:text-blue-900 cursor-pointer">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="text-green-600 hover:text-green-900 cursor-pointer">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button className="text-red-600 hover:text-red-900 cursor-pointer">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

};

export default AdminHome;