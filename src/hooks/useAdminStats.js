import { useState, useEffect }       from "react";
import { articleService }            from "../services/articleService";
import { userService }               from "../services/userService";
import { commentService }            from "../services/commentService";
import { categoryAndTagService }     from "../services/categoryAndTagService";

export const useAdminStats = () => {
    const [stats, setStats] = useState({
        totalArticles:    0,
        totalUsers:       0,
        totalComments:    0,
        totalCategories:  0,
        articlesByStatus: { PUBLISHED: 0, PENDING: 0, DRAFT: 0 },
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const [articlesRes, usersRes, commentsRes, categoriesRes] = await Promise.allSettled([
                articleService.getAllArticleForStats(),   // ← size=9999, đếm đủ
                userService.getAllUser(),
                commentService.getComments(1),
                categoryAndTagService.getAllCategories(),
            ]);

            // Articles — có đủ data để đếm status chính xác
            let totalArticles    = 0;
            let articlesByStatus = { PUBLISHED: 0, PENDING: 0, DRAFT: 0 };
            if (articlesRes.status === "fulfilled") {
                const result = articlesRes.value;
                totalArticles = result?.totalElements ?? 0;
                (result?.data ?? []).forEach(a => {
                    if (a.status in articlesByStatus) articlesByStatus[a.status]++;
                });
            }

            // Users
            let totalUsers = 0;
            if (usersRes.status === "fulfilled") {
                const data = usersRes.value;
                if      (Array.isArray(data?.result))      totalUsers = data.result.length;
                else if (Array.isArray(data?.result?.data)) totalUsers = data.result.data.length;
                else if (Array.isArray(data))               totalUsers = data.length;
            }

            // Comments
            let totalComments = 0;
            if (commentsRes.status === "fulfilled") {
                const result = commentsRes.value;
                totalComments = result?.totalElements
                    ?? (Array.isArray(result?.data) ? result.data.length : 0);
            }

            // Categories
            let totalCategories = 0;
            if (categoriesRes.status === "fulfilled") {
                const data = categoriesRes.value;
                if      (Array.isArray(data?.result)) totalCategories = data.result.length;
                else if (Array.isArray(data))          totalCategories = data.length;
            }

            setStats({ totalArticles, totalUsers, totalComments, totalCategories, articlesByStatus });
        } catch (err) {
            console.error("useAdminStats error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchStats(); }, []);

    return { stats, loading, refresh: fetchStats };
};