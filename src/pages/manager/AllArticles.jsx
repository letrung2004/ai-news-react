import React, { useState } from "react";
import {
    Search,
    Eye,
    Edit,
    Trash2,
    Filter,
    Calendar,
    User,
    FileText,
    MoreVertical,
    CheckCircle,
    XCircle,
    Clock,
    TrendingUp
} from "lucide-react";

const AllArticles = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    // Mock data cho bài viết
    const [articles, setArticles] = useState([
        {
            id: 1,
            title: "Hướng dẫn React Hook useEffect cho người mới bắt đầu",
            excerpt: "Tìm hiểu cách sử dụng useEffect để quản lý side effects trong React components...",
            author: "Nguyễn Văn A",
            category: "Công nghệ",
            status: "published",
            publishDate: "2024-08-05",
            views: 1250,
            comments: 23,
            featured: true,
            image: "https://via.placeholder.com/150x100"
        },
        {
            id: 2,
            title: "Top 10 framework JavaScript phổ biến năm 2024",
            excerpt: "Khám phá những framework JavaScript được yêu thích nhất trong cộng đồng developer...",
            author: "Trần Thị B",
            category: "Công nghệ",
            status: "draft",
            publishDate: "2024-08-04",
            views: 856,
            comments: 12,
            featured: false,
            image: "https://via.placeholder.com/150x100"
        },
        {
            id: 3,
            title: "Cách tối ưu hóa SEO cho website của bạn",
            excerpt: "Những kỹ thuật SEO hiệu quả giúp website tăng traffic từ công cụ tìm kiếm...",
            author: "Lê Văn C",
            category: "Marketing",
            status: "published",
            publishDate: "2024-08-03",
            views: 2341,
            comments: 45,
            featured: true,
            image: "https://via.placeholder.com/150x100"
        },
        {
            id: 4,
            title: "Node.js vs Python: So sánh chi tiết",
            excerpt: "Phân tích ưu nhược điểm của Node.js và Python trong phát triển backend...",
            author: "Phạm Thị D",
            category: "Công nghệ",
            status: "review",
            publishDate: "2024-08-02",
            views: 634,
            comments: 8,
            featured: false,
            image: "https://via.placeholder.com/150x100"
        },
        {
            id: 5,
            title: "Thiết kế UI/UX hiện đại với Figma",
            excerpt: "Hướng dẫn sử dụng Figma để tạo ra những giao diện đẹp mắt và thân thiện...",
            author: "Hoàng Văn E",
            category: "Thiết kế",
            status: "published",
            publishDate: "2024-08-01",
            views: 1876,
            comments: 34,
            featured: false,
            image: "https://via.placeholder.com/150x100"
        }
    ]);

    const categories = ['Tất cả', 'Công nghệ', 'Marketing', 'Thiết kế', 'Kinh doanh'];
    const statuses = [
        { value: 'all', label: 'Tất cả', count: articles.length },
        { value: 'published', label: 'Đã xuất bản', count: articles.filter(a => a.status === 'published').length },
        { value: 'draft', label: 'Nháp', count: articles.filter(a => a.status === 'draft').length },
        { value: 'review', label: 'Chờ duyệt', count: articles.filter(a => a.status === 'review').length }
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            published: { icon: CheckCircle, class: 'bg-green-100 text-green-800', label: 'Đã xuất bản' },
            draft: { icon: Clock, class: 'bg-yellow-100 text-yellow-800', label: 'Nháp' },
            review: { icon: XCircle, class: 'bg-orange-100 text-orange-800', label: 'Chờ duyệt' }
        };
        const config = statusConfig[status];
        const Icon = config.icon;
        return (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
                <Icon className="w-3 h-3 mr-1" />
                {config.label}
            </span>
        );
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
            setArticles(prev => prev.filter(article => article.id !== id));
        }
    };

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tất cả bài viết</h1>
                            <p className="text-gray-600">Quản lý và theo dõi tất cả nội dung</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                <Filter className="w-4 h-4" />
                                <span>Bộ lọc</span>
                            </button>
                            <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center space-x-2">
                                <FileText className="w-4 h-4" />
                                <span>Thêm bài viết</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {statuses.map((status, index) => (
                        <div key={status.value} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{status.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{status.count}</p>
                                </div>
                                <div className={`p-3 rounded-full ${index === 0 ? 'bg-blue-100' :
                                        index === 1 ? 'bg-green-100' :
                                            index === 2 ? 'bg-yellow-100' : 'bg-orange-100'
                                    }`}>
                                    <FileText className={`w-6 h-6 ${index === 0 ? 'text-blue-600' :
                                            index === 1 ? 'text-green-600' :
                                                index === 2 ? 'text-yellow-600' : 'text-orange-600'
                                        }`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm bài viết..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                            {statuses.map(status => (
                                <option key={status.value} value={status.value}>{status.label}</option>
                            ))}
                        </select>

                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                            {categories.map(category => (
                                <option key={category} value={category === 'Tất cả' ? 'all' : category}>{category}</option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                            <option value="newest">Mới nhất</option>
                            <option value="oldest">Cũ nhất</option>
                            <option value="views">Lượt xem</option>
                            <option value="comments">Bình luận</option>
                        </select>
                    </div>
                </div>

                {/* Articles List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="divide-y divide-gray-200">
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article) => (
                                <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start space-x-4">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                                        />

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 cursor-pointer">
                                                            {article.title}
                                                        </h3>
                                                        {article.featured && (
                                                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                                                                Nổi bật
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                        {article.excerpt}
                                                    </p>

                                                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                        <div className="flex items-center space-x-1">
                                                            <User className="w-4 h-4" />
                                                            <span>{article.author}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{article.publishDate}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Eye className="w-4 h-4" />
                                                            <span>{article.views.toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <span>{article.comments} bình luận</span>
                                                        </div>
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                                                            {article.category}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2 ml-4">
                                                    {getStatusBadge(article.status)}
                                                    <div className="flex items-center space-x-1">
                                                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(article.id)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">Không tìm thấy bài viết nào</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Hiển thị {filteredArticles.length} trên tổng số {articles.length} bài viết
                    </p>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-2 border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors">
                            Trước
                        </button>
                        <button className="px-3 py-2 bg-green-500 text-white rounded-lg">1</button>
                        <button className="px-3 py-2 border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors">
                            2
                        </button>
                        <button className="px-3 py-2 border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors">
                            Sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllArticles;