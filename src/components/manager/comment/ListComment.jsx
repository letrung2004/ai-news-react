import React from "react";
import { CheckCircle, X, Trash2 } from "lucide-react";

const statusConfig = {
    approved: { label: "Đã duyệt", color: "bg-green-100 text-green-800 border-green-200" },
    pending: { label: "Chờ duyệt", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    rejected: { label: "Đã từ chối", color: "bg-red-100 text-red-800 border-red-200" }
};

export default function ListComment({ comments, searchTerm, selectedStatus, selectedArticle, onApprove, onReject, onDelete }) {

    const getStatusBadge = (status) => statusConfig[status] || statusConfig.pending;

    const filteredComments = comments.filter(c => {
        const matchesSearch =
            c.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.articleTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === "all" || c.status === selectedStatus;
        const matchesArticle = selectedArticle === "all" || c.articleId.toString() === selectedArticle;
        return matchesSearch && matchesStatus && matchesArticle;
    });

    return (
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
                                        <button onClick={() => onApprove(c.id)} className="text-green-600">
                                            <CheckCircle />
                                        </button>
                                        <button onClick={() => onReject(c.id)} className="text-red-600">
                                            <X />
                                        </button>
                                    </>
                                )}
                                <button onClick={() => onDelete(c.id)} className="text-red-600">
                                    <Trash2 />
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
