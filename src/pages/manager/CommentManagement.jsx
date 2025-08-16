import React, { useState } from "react";
import {
    MessageSquare, Search, CheckCircle,
    X, Trash2, Calendar, FileText, Flag, Reply,
    Clock, ArrowUpRight
} from "lucide-react";

const CommentManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedArticle, setSelectedArticle] = useState("all");
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

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

    const statsData = [
        {
            title: "Tổng bình luận",
            value: comments.length.toString(),
            change: "+15%",
            icon: MessageSquare
        },
        {
            title: "Chờ duyệt",
            value: comments.filter(c => c.status === "pending").length.toString(),
            change: "+23%",
            icon: Clock
        },
        {
            title: "Đã duyệt",
            value: comments.filter(c => c.status === "approved").length.toString(),
            change: "+8%",
            icon: CheckCircle
        },
        {
            title: "Bị báo cáo",
            value: comments.filter(c => c.reported).length.toString(),
            change: "-12%",
            icon: Flag
        }
    ];

    const getStatusBadge = (status) => {
        const config = {
            approved: { label: "Đã duyệt", color: "bg-green-100 text-green-800 border-green-200" },
            pending: { label: "Chờ duyệt", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
            rejected: { label: "Đã từ chối", color: "bg-red-100 text-red-800 border-red-200" }
        };
        return config[status] || config.pending;
    };

    const filteredComments = comments.filter(c => {
        const matchesSearch = c.content.toLowerCase().includes(searchTerm.toLowerCase())
            || c.author.toLowerCase().includes(searchTerm.toLowerCase())
            || c.articleTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === "all" || c.status === selectedStatus;
        const matchesArticle = selectedArticle === "all" || c.articleId.toString() === selectedArticle;
        return matchesSearch && matchesStatus && matchesArticle;
    });

    const handleApprove = (id) =>
        setComments(comments.map(c => c.id === id ? { ...c, status: "approved" } : c));

    const handleReject = (id) =>
        setComments(comments.map(c => c.id === id ? { ...c, status: "rejected" } : c));

    const handleDelete = (id) =>
        setComments(comments.filter(c => c.id !== id));

    const ReplyModal = ({ comment, onClose, onSend }) => {
        const [reply, setReply] = useState("");
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl m-4">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold">Trả lời bình luận</h3>
                        <p className="text-sm text-gray-600">Trả lời cho {comment.author}</p>
                    </div>
                    <div className="p-6">
                        <p className="mb-3 text-gray-700">{comment.content}</p>
                        <textarea
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            className="w-full border p-2 rounded"
                            rows={4}
                            placeholder="Nhập nội dung trả lời..."
                        />
                        <div className="flex justify-end space-x-2 mt-4">
                            <button onClick={onClose} className="px-4 py-2 border rounded">Hủy</button>
                            <button
                                disabled={!reply.trim()}
                                onClick={() => { onSend(comment.id, reply); onClose(); }}
                                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const handleSendReply = (id, content) => {
        console.log("Reply to", id, ":", content);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Quản lý bình luận</h1>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {statsData.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={i} className="bg-white rounded-xl p-6 shadow">
                                <p className="text-sm text-gray-600">{s.title}</p>
                                <p className="text-2xl font-bold">{s.value}</p>
                                <div className="flex items-center text-green-600">
                                    <ArrowUpRight className="w-4 h-4" />
                                    <span className="ml-1">{s.change}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Filters */}
                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo tên hoặc email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                            <select
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="all">Tất cả vai trò</option>
                                <option value="admin">Quản trị</option>
                                <option value="editor">Biên tập</option>
                                <option value="user">Người dùng</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {filteredComments.map(c => {
                        const badge = getStatusBadge(c.status);
                        return (
                            <div key={c.id} className="bg-white p-6 rounded-xl shadow">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="font-medium">{c.author} ({c.authorEmail})</p>
                                        <p className="text-sm text-gray-500">{c.articleTitle}</p>
                                        <p className="mt-2">{c.content}</p>
                                        <span className={`inline-block px-2 py-1 mt-2 text-xs rounded ${badge.color}`}>
                                            {badge.label}
                                        </span>
                                    </div>
                                    <div className="space-x-2">
                                        {c.status === "pending" && (
                                            <>
                                                <button onClick={() => handleApprove(c.id)} className="text-green-600">
                                                    <CheckCircle />
                                                </button>
                                                <button onClick={() => handleReject(c.id)} className="text-red-600">
                                                    <X />
                                                </button>
                                            </>
                                        )}

                                        <button onClick={() => handleDelete(c.id)} className="text-red-600">
                                            <Trash2 />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Modal */}
                {showReplyModal && selectedComment && (
                    <ReplyModal
                        comment={selectedComment}
                        onClose={() => setShowReplyModal(false)}
                        onSend={handleSendReply}
                    />
                )}
            </div>
        </div>
    );
};

export default CommentManagement;
