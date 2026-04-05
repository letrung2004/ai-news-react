import { useState, useEffect } from "react";
import { articleService } from "../services/articleService";
import { userService } from "../services/userService";
import { commentService } from "../services/commentService";
import { categoryAndTagService } from "../services/categoryAndTagService";

export const useAdminStats = () => {
    const [stats, setStats] = useState({
        totalArticles:    0,
        totalUsers:       0,
        totalComments:    0,
        totalCategories:  0,
        articlesByStatus: { PUBLISHED: 0, PENDING: 0, DRAFT: 0 },
        trafficData:      [],
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = async (days = 90) => {
        setLoading(true);
        try {
            // ✅ destructure đủ 5 biến
            const [articlesRes, usersRes, commentsRes, categoriesRes, trafficRes] = await Promise.allSettled([
                articleService.getAllArticleForStats(),
                userService.getAllUser(),
                commentService.getComments(1),
                categoryAndTagService.getAllCategories(),
                articleService.getTraffic(days),
            ]);

            let totalArticles = 0;
            let articlesByStatus = { PUBLISHED: 0, PENDING: 0, DRAFT: 0 };
            if (articlesRes.status === "fulfilled") {
                const result = articlesRes.value;
                totalArticles = result?.totalElements ?? 0;
                (result?.data ?? []).forEach(a => {
                    if (a.status in articlesByStatus) articlesByStatus[a.status]++;
                });
            }

            let totalUsers = 0;
            if (usersRes.status === "fulfilled") {
                const data = usersRes.value;
                totalUsers = data?.totalElements ?? data?.data?.length ?? 0;
            }

            let totalComments = 0;
            if (commentsRes.status === "fulfilled") {
                const result = commentsRes.value;
                totalComments = result?.totalElements
                    ?? (Array.isArray(result?.data) ? result.data.length : 0);
            }

            let totalCategories = 0;
            if (categoriesRes.status === "fulfilled") {
                const data = categoriesRes.value;
                if      (Array.isArray(data?.result)) totalCategories = data.result.length;
                else if (Array.isArray(data))          totalCategories = data.length;
            }

            let trafficData = [];
            if (trafficRes.status === "fulfilled") {
                trafficData = (trafficRes.value?.result ?? []).map(item => ({
                    name: new Date(item.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
                    articles: item.articles,
                }));
            }

            setStats({ totalArticles, totalUsers, totalComments, totalCategories, articlesByStatus, trafficData });
        } catch (err) {
            console.error("useAdminStats error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchStats(); }, []);

    return { stats, loading, refresh: fetchStats };
};