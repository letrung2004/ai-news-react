import React, { useState } from 'react';
import {
    Users,
    FileText,
    Eye,
    MessageSquare,
    TrendingUp,
    TrendingDown,
    Calendar,
    Clock,
    Activity,
    Globe,
    Target,
    Award,
    BarChart3,
    PieChart,
    Filter,
    Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, AreaChart, Area, Pie } from 'recharts';
import StatsCard from '../../components/manager/StatsCard';

const Analytics = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('7days');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Mock data
    const overviewStats = [
        {
            title: 'Tổng bài viết',
            value: '2,847',
            change: '+12.5%',
            changeType: 'increase',
            icon: FileText,
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Lượt xem tháng này',
            value: '1.2M',
            change: '+8.2%',
            changeType: 'increase',
            icon: Eye,
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600'
        },
        {
            title: 'Người dùng hoạt động',
            value: '45,210',
            change: '+3.1%',
            changeType: 'increase',
            icon: Users,
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600'
        },
        {
            title: 'Bình luận',
            value: '8,942',
            change: '-2.3%',
            changeType: 'decrease',
            icon: MessageSquare,
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600'
        }
    ];

    const trafficData = [
        { name: 'T2', views: 4000, users: 2400, articles: 240 },
        { name: 'T3', views: 3000, users: 1398, articles: 221 },
        { name: 'T4', views: 2000, users: 9800, articles: 229 },
        { name: 'T5', views: 2780, users: 3908, articles: 200 },
        { name: 'T6', views: 1890, users: 4800, articles: 218 },
        { name: 'T7', views: 2390, users: 3800, articles: 250 },
        { name: 'CN', views: 3490, users: 4300, articles: 210 }
    ];

    const categoryData = [
        { name: 'Thời sự', value: 35, color: '#3B82F6' },
        { name: 'Kinh tế', value: 25, color: '#10B981' },
        { name: 'Thể thao', value: 20, color: '#F59E0B' },
        { name: 'Giải trí', value: 15, color: '#EF4444' },
        { name: 'Công nghệ', value: 5, color: '#8B5CF6' }
    ];

    const realtimeData = [
        { time: '09:00', visitors: 120 },
        { time: '10:00', visitors: 180 },
        { time: '11:00', visitors: 250 },
        { time: '12:00', visitors: 320 },
        { time: '13:00', visitors: 280 },
        { time: '14:00', visitors: 380 },
        { time: '15:00', visitors: 450 }
    ];

    const topArticles = [
        { title: 'Tin nóng: Biến động kinh tế trong tuần qua', views: 25420, comments: 189 },
        { title: 'Công nghệ AI đang thay đổi thế giới như thế nào?', views: 19840, comments: 156 },
        { title: 'Kết quả bóng đá Việt Nam vs Malaysia', views: 18750, comments: 342 },
        { title: 'Phân tích thị trường chứng khoán tháng 12', views: 16890, comments: 98 },
        { title: 'Review smartphone flagship mới nhất 2024', views: 15420, comments: 203 }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Báo cáo thống kê</h1>
                            <p className="text-gray-600">Tổng quan về hoạt động hệ thống báo điện tử</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="7days">7 ngày qua</option>
                                <option value="30days">30 ngày qua</option>
                                <option value="90days">90 ngày qua</option>
                            </select>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Download className="w-4 h-4" />
                                <span>Xuất báo cáo</span>
                            </button>
                        </div>
                    </div>
                </div>

                <StatsCard statsData={overviewStats} />

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Traffic Overview */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Lưu lượng truy cập</h3>
                            <div className="flex items-center space-x-2">
                                <BarChart3 className="w-5 h-5 text-gray-500" />
                            </div>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trafficData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Area type="monotone" dataKey="views" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                                    <Area type="monotone" dataKey="users" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Category Distribution */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Phân bố theo danh mục</h3>
                            <PieChart className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Real-time & Top Articles */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Real-time Visitors */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Truy cập thời gian thực</h3>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-500">Live</span>
                            </div>
                        </div>
                        <div className="h-60">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={realtimeData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="time" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="visitors"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Articles */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Bài viết được đọc nhiều nhất</h3>
                            <Award className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="space-y-4">
                            {topArticles.map((article, index) => (
                                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-800' :
                                            index === 1 ? 'bg-gray-100 text-gray-600' :
                                                index === 2 ? 'bg-orange-100 text-orange-600' :
                                                    'bg-blue-50 text-blue-600'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm leading-tight">{article.title}</p>
                                            <div className="flex items-center space-x-4 mt-1">
                                                <span className="text-xs text-gray-500 flex items-center">
                                                    <Eye className="w-3 h-3 mr-1" />
                                                    {article.views.toLocaleString()}
                                                </span>
                                                <span className="text-xs text-gray-500 flex items-center">
                                                    <MessageSquare className="w-3 h-3 mr-1" />
                                                    {article.comments}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                            <FileText className="w-5 h-5 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Tạo báo cáo mới</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all">
                            <Activity className="w-5 h-5 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Phân tích chi tiết</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all">
                            <Target className="w-5 h-5 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Thiết lập mục tiêu</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all">
                            <Globe className="w-5 h-5 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Báo cáo SEO</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;