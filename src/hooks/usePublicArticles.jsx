import React, { useState, useEffect } from "react";
import { articleService } from "../services/articleService";

const usePublicArticles = (categorySlug) => {
    const [articles, setArticles] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [detailArticle, setDetailArticle] = useState(null);

    const loadArticles = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await articleService.getAllArticle();
            setArticles(response);

        } catch (err) {
            console.error('Error loading articles:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải bài viết');
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    const loadDetailArticles = async (slug) => {
        try {
            setLoading(true);
            setError(null);

            const response = await articleService.getDetailArticle(slug);
            setDetailArticle(response);
            loadCommentArticle(response.result.id);


        } catch (err) {
            console.error('Error loading article:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải bài viết');
            setDetailArticle(null);
        } finally {
            setLoading(false);
        }
    };

    const loadArticlesByCategory = async (categorySlug) => {
        try {
            setLoading(true);
            setError(null);
            const response = await articleService.getAllArticleByCategory(categorySlug);
            setArticles(response);

        } catch (err) {
            console.error('Error loading articles by category:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải bài viết');
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    const loadCommentArticle = async (articleId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await articleService.getAllCommentByArticle(articleId);
            setComments(response);

        } catch (err) {
            console.error('Error loading articles comments:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải bình luận bài viết');
            setComments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateComment = async (commentData) => {
        if (!commentData.content || !commentData.articleId) {
            console.error("Bình luận không hợp lệ");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await articleService.createCommentArticle(commentData);
            const response = await articleService.getAllCommentByArticle(commentData.articleId);
            setComments(response);
        } catch (err) {
            console.error('Error submitting comment:', err);
            setError(err.message || 'Có lỗi xảy ra khi gửi bình luận');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (categorySlug) {
            loadArticlesByCategory(categorySlug);
        } else {
            loadArticles();
        }
    }, [categorySlug]);


    return {
        articles, comments,
        loading,
        error,
        refetchArticles: loadArticles,
        detailArticle,
        setDetailArticle,
        loadDetailArticles,
        loadArticlesByCategory,
        loadCommentArticle,
        setComments, handleCreateComment
    };
};

export default usePublicArticles;