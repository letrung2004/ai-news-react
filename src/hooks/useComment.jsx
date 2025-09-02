import { useState } from "react";
import { commentService } from "../services/commentService";

const useComment = () => {
    const [commentsArticle, setCommentsArticle] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);

    const loadCommentArticle = async (articleId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await commentService.getAllCommentByArticle(articleId);
            setCommentsArticle(response);

        } catch (err) {
            console.error('Error loading articles commentsArticle:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải bình luận bài viết');
            setCommentsArticle([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateComment = async (commentData) => {
        if (!commentData.content || !commentData.articleId) {
            console.error("Bình luận không hợp lệ");
            return { success: false, message: "Bình luận không hợp lệ" };
        }

        try {
            setLoading(true);
            setError(null);
            const result = await commentService.createCommentArticle(commentData);

            return {
                success: true,
                message: "Bình luận đã được gửi thành công!",
                data: result.data
            };
        } catch (err) {
            console.error('Error submitting comment:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Có lỗi xảy ra khi gửi bình luận';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const loadComments = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await commentService.getComments();
            setComments(response.data);

            return { success: true, data: response };
        } catch (err) {
            console.error('Lỗi load comments:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Có lỗi xảy ra khi tải bình luận bài viết';
            setError(errorMessage);
            setComments([]);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            setError(null);

            await commentService.deleteComment(commentId);
            setComments(prev => prev.filter(c => c.id !== commentId));

            return {
                success: true,
                message: "Bình luận đã được xóa thành công!"
            };
        } catch (err) {
            console.error('Lỗi xóa comment:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Có lỗi xảy ra khi xóa bình luận';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    };

    const approveComment = async (commentId) => {
        try {
            setError(null);

            const res = await commentService.approveComment(commentId);
            setComments(prev =>
                prev.map(comment =>
                    comment.id === commentId
                        ? { ...comment, status: res.result.status }
                        : comment
                )
            );

            return {
                success: true,
                message: "Bình luận đã được phê duyệt thành công!",
            };
        } catch (err) {
            console.error('Lỗi approve comment:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Có lỗi xảy ra khi phê duyệt bình luận';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    };

    const rejectComment = async (commentId) => {
        try {
            setError(null);

            const res = await commentService.rejectComment(commentId);

            setComments(prev =>
                prev.map(comment =>
                    comment.id === commentId
                        ? { ...comment, status: res.result.status }
                        : comment
                )
            );

            return {
                success: true,
                message: "Bình luận đã bị từ chối thành công!",
            };
        } catch (err) {
            console.error('Lỗi reject comment:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Có lỗi xảy ra khi từ chối bình luận';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    };

    const refreshComments = async () => {
        return await loadComments();
    };

    const clearError = () => {
        setError(null);
    };

    return {
        commentsArticle,
        comments,
        loading,
        error,

        loadCommentArticle,
        handleCreateComment,
        loadComments,
        deleteComment,
        approveComment,
        rejectComment,
        refreshComments,
        clearError
    };
};

export default useComment;