import React, { useState, useEffect } from "react";
import { articleService } from "../services/articleService";
import { categoryAndTagService } from "../services/categoryAndTagService";

const usePublicArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [detailArticle, setDetailArticle] = useState(null);
    const [categories, setCategories] = useState([]);

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


        } catch (err) {
            console.error('Error loading article:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải bài viết');
            setDetailArticle(null);
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await categoryAndTagService.getAllCategories();
            setCategories(response);


        } catch (err) {
            console.error('Error loading categories:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải bài viết');
            setCategories(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadArticles();
        loadCategories();
    }, []);

    return {
        articles, categories,
        loading,
        error,
        refetchArticles: loadArticles,
        refetchCategories: loadCategories,
        detailArticle,
        setDetailArticle,
        loadDetailArticles,

    };
};

export default usePublicArticles;