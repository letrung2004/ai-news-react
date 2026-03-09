// pages/admin/AdminHome.jsx
import { useEffect } from "react";
import { RefreshCw, FileText, Users, MessageSquare, Tag } from "lucide-react";

import { useArticle }     from "../../hooks/useArticle";
import { useAdminStats }  from "../../hooks/useAdminStats";

import StatsCard    from "../../components/manager/StatsCard";
import StatusChart  from "../../components/manager/home/StatusChart";
import QuickActions from "../../components/manager/home/QuickActions";
import ArticleTable from "../../components/manager/home/ArticleTable";

// ── Stat card config ───────────────────────────────────────────────────────
const buildStatCards = (stats, loading) => [
    { title: "Tổng bài viết", value: loading ? "—" : stats.totalArticles.toLocaleString("vi-VN"),   icon: FileText,      bgColor: "bg-green-50",  iconColor: "text-green-600"  },
    { title: "Người dùng",    value: loading ? "—" : stats.totalUsers.toLocaleString("vi-VN"),       icon: Users,         bgColor: "bg-blue-50",   iconColor: "text-blue-600"   },
    { title: "Bình luận",     value: loading ? "—" : stats.totalComments.toLocaleString("vi-VN"),    icon: MessageSquare, bgColor: "bg-violet-50", iconColor: "text-violet-600" },
    { title: "Danh mục",      value: loading ? "—" : stats.totalCategories.toLocaleString("vi-VN"),  icon: Tag,           bgColor: "bg-orange-50", iconColor: "text-orange-600" },
];

// ── Page ───────────────────────────────────────────────────────────────────
const AdminHome = () => {
    const { stats, loading: statsLoading }                              = useAdminStats();
    const { articles, pagination, loading: articlesLoading, loadArticles } = useArticle();

    useEffect(() => { loadArticles(1); }, []);

    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.totalPages) return;
        loadArticles(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>
                        <p className="text-sm text-gray-400 mt-0.5">
                            {new Date().toLocaleDateString("vi-VN", {
                                weekday: "long", year: "numeric", month: "long", day: "numeric",
                            })}
                        </p>
                    </div>
                    <button
                        onClick={() => loadArticles(pagination.currentPage ?? 1)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Làm mới
                    </button>
                </div>

                {/* Stats */}
                <StatsCard statsData={buildStatCards(stats, statsLoading)} />

                {/* Middle row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-sm font-semibold text-gray-800">Phân bổ bài viết</h3>
                            {!statsLoading && (
                                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                                    {stats.totalArticles} tổng
                                </span>
                            )}
                        </div>
                        <StatusChart
                            articlesByStatus={stats.articlesByStatus}
                            total={stats.totalArticles}
                            loading={statsLoading}
                        />
                    </div>

                    <QuickActions />
                </div>

                {/* Articles table */}
                <ArticleTable
                    articles={articles}
                    pagination={pagination}
                    loading={articlesLoading}
                    onPageChange={handlePageChange}
                />

            </div>
        </div>
    );
};

export default AdminHome;