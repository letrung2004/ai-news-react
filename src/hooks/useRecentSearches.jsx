import { useState } from "react";

const STORAGE_KEY = "mag_recent_searches";
const MAX_RECENT = 5;

export const useRecentSearches = () => {
    const [recentSearches, setRecentSearches] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    });

    const saveRecent = (term) => {
        if (!term?.trim()) return;

        const updated = [
            term,
            ...recentSearches.filter((s) => s !== term)
        ].slice(0, MAX_RECENT);

        setRecentSearches(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const clearRecent = (term) => {
        const updated = recentSearches.filter((s) => s !== term);

        setRecentSearches(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const clearAllRecent = () => {
        setRecentSearches([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return {
        recentSearches,
        saveRecent,
        clearRecent,
        clearAllRecent
    };
};