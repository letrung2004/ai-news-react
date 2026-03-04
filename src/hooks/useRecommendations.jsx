import { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';
import { useAuth } from './useAuth';

const useRecommendations = (size = 6) => {
    const { user, loading: authLoading } = useAuth();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Chờ AuthContext load xong mới check
        if (authLoading) return;

        // Chưa login → không gọi API
        if (!user) {
            setRecommendations([]);
            return;
        }

        const fetchRecommendations = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await articleService.getRecommendations(size);
                // result = { data: [...], currentPage, totalPages, ... }
                setRecommendations(result?.data || []);
            } catch (err) {
                console.error('Error loading recommendations:', err);
                setError(err.message);
                setRecommendations([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [user, authLoading, size]);

    return {
        recommendations,
        loading,
        error,
        isLoggedIn: !!user,
    };
};

export default useRecommendations;