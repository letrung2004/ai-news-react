import { useState } from "react";
import { commentService } from "../services/commentService";

const useComment = () => {
    const [commentsArticle, setCommentsArticle] = useState([]);
    const [comments, setComments] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1, totalPages: 1, pageSize: 10, totalElements: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadCommentArticle = async (articleId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await commentService.getAllCommentByArticle(articleId);
            setCommentsArticle(response);
        } catch (err) {
            console.error("Error loading article comments:", err);
            setError(err.message || "Có lỗi xảy ra khi tải bình luận bài viết");
            setCommentsArticle([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateComment = async (commentData) => {
        if (!commentData.content || !commentData.articleId) {
            return { success: false, message: "Bình luận không hợp lệ" };
        }
        try {
            setLoading(true);
            setError(null);
            const result = await commentService.createCommentArticle(commentData);
            return { success: true, message: "Bình luận đã được gửi! Đang chờ xác nhận!", data: result.data };
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Có lỗi xảy ra";
            setError(msg);
            return { success: false, message: msg };
        } finally {
            setLoading(false);
        }
    };

    // Thêm page param + parse pagination
    const loadComments = async (page = 1) => {
        try {
            setLoading(true);
            setError(null);
            const response = await commentService.getComments(page);
            // response.data.result = { currentPage, totalPages, pageSize, totalElements, data: [...] }
            const result = response?.result ?? response;
            setComments(result.data || []);
            setPagination({
                currentPage:   result.currentPage   ?? page,
                totalPages:    result.totalPages    ?? 1,
                pageSize:      result.pageSize      ?? 10,
                totalElements: result.totalElements ?? 0,
            });
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Có lỗi xảy ra khi tải bình luận";
            setError(msg);
            setComments([]);
            return { success: false, message: msg };
        } finally {
            setLoading(false);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            setError(null);
            await commentService.deleteComment(commentId);
            setComments(prev => prev.filter(c => c.id !== commentId));
            return { success: true, message: "Đã xóa bình luận thành công!" };
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Có lỗi xảy ra khi xóa";
            setError(msg);
            return { success: false, message: msg };
        }
    };

    const approveComment = async (commentId) => {
        try {
            setError(null);
            const res = await commentService.approveComment(commentId);
            setComments(prev => prev.map(c =>
                c.id === commentId ? { ...c, status: res.result?.status ?? "APPROVED" } : c
            ));
            return { success: true, message: "Đã duyệt bình luận thành công!" };
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Có lỗi xảy ra khi duyệt";
            setError(msg);
            return { success: false, message: msg };
        }
    };

    const rejectComment = async (commentId) => {
        try {
            setError(null);
            const res = await commentService.rejectComment(commentId);
            setComments(prev => prev.map(c =>
                c.id === commentId ? { ...c, status: res.result?.status ?? "REJECTED" } : c
            ));
            return { success: true, message: "Đã từ chối bình luận thành công!" };
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Có lỗi xảy ra khi từ chối";
            setError(msg);
            return { success: false, message: msg };
        }
    };

    const clearError = () => setError(null);

    return {
        commentsArticle,
        comments,
        pagination,
        loading,
        error,
        loadCommentArticle,
        handleCreateComment,
        loadComments,
        deleteComment,
        approveComment,
        rejectComment,
        refreshComments: loadComments,
        clearError,
    };
};

export default useComment;