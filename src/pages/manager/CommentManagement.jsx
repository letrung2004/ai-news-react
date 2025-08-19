import React, { useState } from "react";
import { MessageSquare, CheckCircle, Flag, Clock } from "lucide-react";
import StatsCard from "../../components/manager/StatsCard";
import FilterBar from "../../components/manager/FilterBar";
import ListComment from "../../components/manager/comment/ListComment";

const CommentManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedArticle, setSelectedArticle] = useState("all");

    // Mock comments
    const [comments, setComments] = useState([
        {
            id: 1,
            content: "Bài viết rất hay và bổ ích!",
            author: "Nguyễn Văn An",
            authorEmail: "nguyenvanan@gmail.com",
            articleTitle: "Microsoft quisque at ipsum vel orci eleifend ultrices",
            articleId: 1,
            status: "approved",
            createdAt: "26/07/2025 14:30",
            likes: 12,
            replies: 3,
            reported: false
        },
        {
            id: 2,
            content: "Tôi không đồng ý với quan điểm này.",
            author: "Trần Thị Bình",
            authorEmail: "tranthibinh@gmail.com",
            articleTitle: "London ipsum dolor sit amet",
            articleId: 2,
            status: "pending",
            createdAt: "25/07/2025 09:15",
            likes: 2,
            replies: 1,
            reported: true
        }
    ]);

    const statuses = [
        { value: 'approved', label: 'Đã duyệt' },
        { value: 'rejected', label: 'Từ chối' },
        { value: 'pending', label: 'Chờ duyệt' }
    ];

    const statsData = [
        {
            title: "Tổng bình luận",
            value: '2,847',
            icon: MessageSquare,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: "Chờ duyệt",
            value: '2,847',
            icon: Clock,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: "Đã duyệt",
            value: '2,847',
            icon: CheckCircle,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: "Bị báo cáo",
            value: '2,847',
            icon: Flag,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        }
    ];

    const handleApprove = (id) =>
        setComments(comments.map(c => c.id === id ? { ...c, status: "approved" } : c));

    const handleReject = (id) =>
        setComments(comments.map(c => c.id === id ? { ...c, status: "rejected" } : c));

    const handleDelete = (id) =>
        setComments(comments.filter(c => c.id !== id));

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Quản lý bình luận</h1>

                <StatsCard statsData={statsData} />


                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectOptions={statuses}
                    selectValue={selectedStatus}
                    onSelectChange={setSelectedStatus}
                />

                <ListComment
                    comments={comments}
                    searchTerm={searchTerm}
                    selectedStatus={selectedStatus}
                    selectedArticle={selectedArticle}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onDelete={handleDelete}
                />



            </div>
        </div>
    );
};

export default CommentManagement;
