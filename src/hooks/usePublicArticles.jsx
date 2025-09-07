import React, { useState, useEffect } from "react";
import { articleService } from "../services/articleService";
import { commentService } from "../services/commentService";

const usePublicArticles = (categorySlug) => {
    const [articles, setArticles] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [detailArticle, setDetailArticle] = useState(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadArticles = async (page = 1, append = false) => {
        try {
            if (page === 1) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }
            setError(null);

            const response = await articleService.getAllArticle(page);

            const articlesData = response.data || response;
            const currentPageNum = response.currentPage || page;
            const totalPagesNum = response.totalPages || 1;

            if (append) {
                setArticles(prev => [...prev, ...articlesData]);
            } else {
                setArticles(articlesData);
            }

            setCurrentPage(currentPageNum);
            setTotalPages(totalPagesNum);
            setHasMore(currentPageNum < totalPagesNum);

        } catch (err) {
            console.error('Error loading articles:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải bài viết');
            if (!append) {
                setArticles([]);
            }
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const loadMoreArticles = async () => {
        if (!hasMore || loadingMore) return;

        const nextPage = currentPage + 1;
        await loadArticles(nextPage, true);
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

    const loadArticlesByCategory = async (categorySlug, page = 1, append = false) => {
        try {
            if (page === 1) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }
            setError(null);

            const response = await articleService.getAllArticleByCategory(categorySlug, page);

            const articlesData = response.data || response;
            const currentPageNum = response.currentPage || page;
            const totalPagesNum = response.totalPages || 1;

            if (append) {
                setArticles(prev => [...prev, ...articlesData]);
            } else {
                setArticles(articlesData);
            }

            setCurrentPage(currentPageNum);
            setTotalPages(totalPagesNum);
            setHasMore(currentPageNum < totalPagesNum);

        } catch (err) {
            console.error('Error loading articles by category:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải bài viết');
            if (!append) {
                setArticles([]);
            }
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const loadMoreArticlesByCategory = async (categorySlug) => {
        if (!hasMore || loadingMore) return;

        const nextPage = currentPage + 1;
        await loadArticlesByCategory(categorySlug, nextPage, true);
    };

    const loadCommentArticle = async (articleId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await commentService.getAllCommentByArticle(articleId);
            setComments(response);

        } catch (err) {
            console.error('Error loading articles comments:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải bình luận bài viết');
            setComments([]);
        } finally {
            setLoading(false);
        }
    };


    // Reset pagination when category changes
    const resetPagination = () => {
        setCurrentPage(1);
        setTotalPages(1);
        setHasMore(true);
        setArticles([]);
    };

    useEffect(() => {
        resetPagination();
        if (categorySlug) {
            loadArticlesByCategory(categorySlug, 1, false);
        } else {
            loadArticles(1, false);
        }
    }, [categorySlug]);

    return {
        articles,
        comments,
        loading,
        error,
        hasMore,
        loadingMore,
        currentPage,
        totalPages,
        refetchArticles: () => loadArticles(1, false),
        loadMoreArticles,
        loadMoreArticlesByCategory: () => loadMoreArticlesByCategory(categorySlug),
        detailArticle,
        setDetailArticle,
        loadDetailArticles,
        loadArticlesByCategory,
        loadCommentArticle,
        setComments,
    };
};

export default usePublicArticles;