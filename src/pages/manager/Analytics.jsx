import React, { useState, useEffect } from 'react';
import { FileText, Users, MessageSquare, Tag, BarChart3, PieChart, Download } from 'lucide-react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart as RechartsPieChart, Cell, AreaChart, Area, Pie
} from 'recharts';
import StatsCard from '../../components/manager/StatsCard';
import TopArticleTable from '../../components/manager/TopArticleTable';
import { useAdminStats } from '../../hooks/useAdminStats';
import { articleService } from '../../services/articleService';


const Analytics = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('90days');
    const { stats, loading, refresh } = useAdminStats();

    useEffect(() => {
        const days = selectedPeriod === '7days' ? 7 : selectedPeriod === '30days' ? 30 : 90;
        refresh(days);
    }, [selectedPeriod]);

    const overviewStats = [
        {
            title: 'Tổng bài viết',
            value: loading ? '—' : stats.totalArticles.toLocaleString('vi-VN'),
            icon: FileText,
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Người dùng',
            value: loading ? '—' : stats.totalUsers.toLocaleString('vi-VN'),
            icon: Users,
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600'
        },
        {
            title: 'Bình luận',
            value: loading ? '—' : stats.totalComments.toLocaleString('vi-VN'),
            icon: MessageSquare,
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600'
        },
        {
            title: 'Danh mục',
            value: loading ? '—' : stats.totalCategories.toLocaleString('vi-VN'),
            icon: Tag,
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600'
        },
    ];

    const [topArticles, setTopArticles] = useState([]);

    // Tính categoryData từ articlesByStatus
    const categoryData = Object.entries(stats.articlesByStatus).map(([status, count], i) => ({
        name: status === 'PUBLISHED' ? 'Xuất bản' : status === 'PENDING' ? 'Chờ duyệt' : 'Nháp',
        value: count,
        color: ['#10B981', '#F59E0B', '#6B7280'][i]
    })).filter(d => d.value > 0);

    useEffect(() => {
        articleService.getTrendingArticle().then(res => {
            const mapped = (res?.data ?? []).map(a => ({
                id: a.id,
                title: a.title,
                category: a.category?.name ?? '—',
                author: a.authors?.[0] ?? '—',
                date: a.created ?? '—',
                views: a.viewCount?.toLocaleString('vi-VN') ?? '0',
                featured: false,
            }));
            setTopArticles(mapped);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Báo cáo thống kê</h1>
                        <p className="text-sm text-gray-400 mt-0.5">Tổng quan về hoạt động hệ thống báo điện tử</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        >
                            <option value="7days">7 ngày qua</option>
                            <option value="30days">30 ngày qua</option>
                            <option value="90days">90 ngày qua</option>
                        </select>
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-colors">
                            <Download className="w-4 h-4" />
                            Xuất báo cáo
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <StatsCard statsData={overviewStats} />

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Area chart */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-semibold text-gray-800">Bài viết đăng theo ngày</h3>
                            <BarChart3 className="w-4 h-4 text-gray-400" />
                        </div>
                        {loading ? (
                            <div className="h-64 flex items-center justify-center text-gray-400 text-sm">Đang tải...</div>
                        ) : stats.trafficData.length === 0 ? (
                            <div className="h-64 flex items-center justify-center text-gray-400 text-sm">Không có dữ liệu</div>
                        ) : (
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.trafficData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                                        <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                                fontSize: '12px'
                                            }}
                                            formatter={(value) => [`${value} bài`, 'Số bài đăng']}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="articles"
                                            stroke="#10B981"
                                            fill="#10B981"
                                            fillOpacity={0.1}
                                            strokeWidth={2}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>

                    {/* Pie chart */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-semibold text-gray-800">Phân bổ trạng thái bài viết</h3>
                            <PieChart className="w-4 h-4 text-gray-400" />
                        </div>
                        {loading ? (
                            <div className="h-64 flex items-center justify-center text-gray-400 text-sm">Đang tải...</div>
                        ) : (
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsPieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="45%"
                                            outerRadius={70}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            labelLine={true}
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value} bài`, '']} />
                                    </RechartsPieChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </div>

                {/* Top articles */}
                <TopArticleTable articles={topArticles} />
            </div>
        </div>
    );
};

export default Analytics;