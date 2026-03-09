import { useEffect, useState } from "react";
import { articleService } from "../services/articleService";

export const useArticleSearch = (query) => {
    const [results, setResults] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query?.trim()) {
            setResults([]);
            setTotalElements(0);
            return;
        }

        let cancelled = false;

        const search = async () => {
            setLoading(true);
            try {
                const data = await articleService.searchArticles(query.trim());

                if (!cancelled) {
                    setResults(data.articles || []);
                    setTotalElements(data.totalElements || 0);
                }
            } catch {
                if (!cancelled) {
                    setResults([]);
                    setTotalElements(0);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        search();

        return () => {
            cancelled = true;
        };
    }, [query]);

    return { results, totalElements, loading };
};