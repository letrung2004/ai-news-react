import React, { useState } from "react";
import {
    TrendingUp, Eye, MessageSquare, Users, Plus, FolderPlus,
    UserPlus, Settings, FileText, Edit3, Trash2, ArrowUpRight,
    BarChart3, Activity, Clock, Calendar, Star, Filter
} from "lucide-react";

const AdminHome = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [selectedTimeRange, setSelectedTimeRange] = useState("7days");

    const statsData = [
        {
            title: 'Tổng bài viết',
            value: '2,847',
            change: '+12%',
            changeType: 'increase',
            icon: FileText,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Lượt xem hôm nay',
            value: '45,623',
            change: '+8%',
            changeType: 'increase',
            icon: Eye,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600'
        },
        {
            title: 'Bình luận mới',
            value: '1,234',
            change: '+15%',
            changeType: 'increase',
            icon: MessageSquare,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600'
        },
        {
            title: 'Người dùng online',
            value: '892',
            change: '+5%',
            changeType: 'increase',
            icon: Users,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600'
        }
    ];

    const recentArticles = [
        {
            id: 1,
            title: 'Microsoft quisque at ipsum vel orci eleifend ultrices',
            category: 'Công nghệ',
            author: 'Nguyễn Văn A',
            date: '26/07/2025',
            status: 'published',
            views: '1,234',
            featured: true
        },
        {
            id: 2,
            title: 'London ipsum dolor sit amet, consectetur adipiscing elit',
            category: 'Văn hóa',
            author: 'Trần Thị B',
            date: '25/07/2025',
            status: 'pending',
            views: '856',
            featured: false
        },
        {
            id: 3,
            title: 'Pellentesque dui nibh, pellentesque ut dapibus ut',
            category: 'Thể thao',
            author: 'Lê Văn C',
            date: '24/07/2025',
            status: 'published',
            views: '2,341',
            featured: true
        },
        {
            id: 4,
            title: 'Motobike Vestibulum venenatis purus nec nibh volutpat',
            category: 'Thể thao',
            author: 'Phạm Thị D',
            date: '23/07/2025',
            status: 'published',
            views: '1,567',
            featured: false
        },
        {
            id: 5,
            title: 'AI và Machine Learning trong tương lai',
            category: 'Công nghệ',
            author: 'Hoàng Văn E',
            date: '22/07/2025',
            status: 'draft',
            views: '0',
            featured: false
        }
    ];

    const quickActions = [
        {
            label: 'Thêm bài viết mới',
            icon: Plus,
            color: 'from-green-500 to-green-600',
            action: () => setActiveTab('add-new'),
            description: 'Tạo nội dung mới'
        },
        {
            label: 'Thêm danh mục',
            icon: FolderPlus,
            color: 'from-blue-500 to-blue-600',
            description: 'Quản lý phân loại'
        },
        {
            label: 'Thêm người dùng',
            icon: UserPlus,
            color: 'from-purple-500 to-purple-600',
            description: 'Quản lý tài khoản'
        },
        {
            label: 'Cài đặt hệ thống',
            icon: Settings,
            color: 'from-orange-500 to-orange-600',
            description: 'Cấu hình website'
        }
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            published: {
                label: 'Đã xuất bản',
                color: 'bg-green-100 text-green-800 border-green-200'
            },
            pending: {
                label: 'Đang chờ',
                color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
            },
            draft: {
                label: 'Nháp',
                color: 'bg-gray-100 text-gray-800 border-gray-200'
            }
        };
        return statusConfig[status] || statusConfig.draft;
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Công nghệ': 'bg-blue-100 text-blue-800 border-blue-200',
            'Văn hóa': 'bg-purple-100 text-purple-800 border-purple-200',
            'Thể thao': 'bg-green-100 text-green-800 border-green-200',
            'Kinh tế': 'bg-orange-100 text-orange-800 border-orange-200',
            'Giải trí': 'bg-pink-100 text-pink-800 border-pink-200'
        };
        return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                            <p className="text-gray-600">Chào mừng trở lại! Đây là tổng quan về hoạt động của website.</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <select
                                value={selectedTimeRange}
                                onChange={(e) => setSelectedTimeRange(e.target.value)}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="7days">7 ngày qua</option>
                                <option value="30days">30 ngày qua</option>
                                <option value="90days">90 ngày qua</option>
                            </select>
                            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                <Filter className="w-4 h-4" />
                                <span>Lọc</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                                            <span className="text-sm text-gray-500">từ hôm qua</span>
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

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Chart */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Lượt truy cập 7 ngày qua</h3>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                                    Lượt xem
                                </button>
                                <button className="px-3 py-1 text-gray-600 rounded-lg text-sm hover:bg-gray-100">
                                    Người dùng
                                </button>
                            </div>
                        </div>
                        <div className="h-80 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                            <div className="text-center">
                                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 font-medium">Biểu đồ thống kê lượt truy cập</p>
                                <p className="text-sm text-gray-500 mt-1">Dữ liệu sẽ được hiển thị ở đây</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Thao tác nhanh</h3>
                        <div className="space-y-3">
                            {quickActions.map((action, index) => {
                                const IconComponent = action.icon;
                                return (
                                    <button
                                        key={index}
                                        onClick={action.action}
                                        className={`w-full bg-gradient-to-r ${action.color} text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 group text-left`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{action.label}</div>
                                                <div className="text-sm opacity-90">{action.description}</div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Activity Summary */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-3">Hoạt động gần đây</h4>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 text-sm">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-600">3 bài viết mới được xuất bản</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-gray-600">12 bình luận chờ duyệt</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <span className="text-gray-600">5 người dùng mới đăng ký</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Articles */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Bài viết gần đây</h3>
                                <p className="text-sm text-gray-600 mt-1">Quản lý và theo dõi các bài viết mới nhất</p>
                            </div>
                            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
                                Xem tất cả
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tiêu đề</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Danh mục</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tác giả</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ngày</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lượt xem</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentArticles.map((article) => {
                                    const statusConfig = getStatusBadge(article.status);
                                    const categoryColor = getCategoryColor(article.category);

                                    return (
                                        <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-start space-x-3">
                                                    {article.featured && (
                                                        <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 line-clamp-2 max-w-xs">
                                                            {article.title}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">ID: {article.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColor}`}>
                                                    {article.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                                                        {article.author.charAt(0)}
                                                    </div>
                                                    <span className="text-sm text-gray-900">{article.author}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{article.date}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                                    {statusConfig.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                                    <Eye className="w-3 h-3" />
                                                    <span className="font-medium">{article.views}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <button className="p-1 text-blue-600 hover:bg-blue-100 rounded-md transition-colors" title="Chỉnh sửa">
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1 text-green-600 hover:bg-green-100 rounded-md transition-colors" title="Xem">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1 text-red-600 hover:bg-red-100 rounded-md transition-colors" title="Xóa">
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
                                Hiển thị <span className="font-medium">1-5</span> của <span className="font-medium">234</span> bài viết
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
            </div>
        </div>
    );
};

export default AdminHome;