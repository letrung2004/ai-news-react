import React, { useState } from 'react';
import { Users, FileText, Eye, MessageSquare, Award, BarChart3, PieChart, Download } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, AreaChart, Area, Pie } from 'recharts';
import StatsCard from '../../components/manager/StatsCard';
import TopArticleTable from '../../components/manager/TopArticleTable';

const Analytics = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('7days');
    const [selectedCategory, setSelectedCategory] = useState('all');

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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

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
                <TopArticleTable
                    articles={recentArticles}
                />

            </div>
        </div>
    );
};

export default Analytics;