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
import FilterBar from "../../components/manager/FilterBar";
import Pagination from "../../components/Pagination";
import ArticlesList from "../../components/manager/article/ArticlesList";

const AllArticles = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

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

    const categories = [
        { value: 'tech', label: 'Công nghệ' },
        { value: 'news', label: 'Tin tức' },
        { value: 'sport', label: 'Thể thaoo' }
    ];

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
            setArticles(prev => prev.filter(article => article.id !== id));
        }
    };

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">

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

                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectOptions={categories}
                    selectValue={categoryFilter}
                    onSelectChange={setCategoryFilter}
                />
                <ArticlesList articles={filteredArticles} onDelete={handleDelete} />

                <Pagination
                    currentPage={1}
                    totalPages={5}
                    onPageChange={(page) => console.log("Chuyển sang trang:", page)}
                />

            </div>
        </div>
    );
};

export default AllArticles;