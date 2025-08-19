import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const CommentSection = ({ articleId, comments, onSubmitComment }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [commentContent, setCommentContent] = useState("");

    const handleLoginRedirect = () => {
        navigate("/login", {
            state: { from: location.pathname }
        });
    };

    const handleSubmitComment = () => {
        if (!user) {
            handleLoginRedirect();
            return;
        }

        const commentData = {
            articleId: articleId,
            content: commentContent,
        };

        console.log("Bình luận: ", commentData);
        onSubmitComment(commentData);
        setCommentContent("");
    };

    return (
        <section className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bình luận</h3>

            {/* thông báo cho user chưa đăng nhập */}
            {!user && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-800">
                        <button
                            onClick={handleLoginRedirect}
                            className="text-blue-600 underline hover:text-blue-800"
                        >
                            Đăng nhập
                        </button> để có thể bình luận và tương tác với bài viết.
                    </p>
                </div>
            )}

            {/* Comment Form */}
            {/* Comment Form - chỉ hiện khi đã đăng nhập */}
            {user && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Để lại bình luận</h4>
                    <div className="space-y-4">
                        <textarea
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            rows={4}
                            placeholder="Nội dung bình luận"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        />
                        <button
                            onClick={handleSubmitComment}
                            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                            Gửi bình luận
                        </button>
                    </div>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
                {comments?.result?.data?.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">
                                    {(comment.userName || 'U').charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <h5 className="font-semibold text-gray-900">{comment.userName}</h5>
                                    <span className="text-sm text-gray-500">{comment.created}</span>
                                </div>
                                <p className="text-gray-800 mb-2">{comment.content}</p>
                                <button className="text-sm text-green-600 hover:text-green-700 cursor-pointer">
                                    Trả lời
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CommentSection;