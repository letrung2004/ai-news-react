export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/identity/auth/token',
        ME: '/identity/users/my-info',
        OAUTH: '/identity/auth/outbound/authentication',
        REGISTER: '/identity/users/registration',
        REFRESH_TOKEN: '/identity/auth/refresh',
    },
    NEWS: {
        UPLOAD_IMAGE: '/content/image/upload',
        GET_CATEGORIES: '/content/category',
        GET_ALL_ARTICLE: '/content/articles/all',
        GET_DETAIL_ARTICLE: slug => `/content/articles/detail-by-slug/${slug}`,
        GET_ALL_CATEGORIES: '/content/category',
        CREATE_COMMENT: '/content/comments',
        GET_COMMENTS: (articleId) => `/content/comments/article/${articleId}`,
        GET_ALL_TAGS: '/content/tag',
        GET_ALL_ARTICLE_BY_CATEGORY: (categorySlug) => `/content/articles/all/${categorySlug}`,
        SEND_QUESTION: (articleId) => `/content/articles/${articleId}/ask`,
        RECOMMENDATION: 'content/articles/recommendations',
        SEARCH: '/content/articles/search',
        TRENDING_ARTICLE: '/content/articles/trending',
        BOOKMARK_ARTICLE: (articleId) => `/content/articles/${articleId}/bookmark`,
    },
    ADMIN: {
        CREATE_CATEGORY: '/content/category/create',
        DELETE_CATEGORY: categoryId => `/content/category/delete/${categoryId}`,

        CREATE_TAG: '/content/tag/create',
        DELETE_TAG: tagId => `/content/tag/delete/${tagId}`,

        CREATE_ARTICLE: '/content/articles/create',
        DELETE_ARTICLE: articleId => `/content/articles/delete/${articleId}`,
        GET_ALL_ARTICLE: '/content/articles/all-status',
        UPDATE_ARTICLE: articleId => `/content/articles/update/${articleId}`,
        UPDATE_ARTICLE_STATUS: articleId => `/content/articles/update-status/${articleId}`,
        RETRY_AI: articleId => `/content/articles/${articleId}/retry-ai`,

        APPROVE_COMMENT: commentId => `/content/comments/${commentId}/approve`,
        DELETE_COMMENT: commentId => `/content/comments/${commentId}`,
        REJECT_COMMENT: commentId => `/content/comments/${commentId}/reject`,
        GET_ALL_COMMENTS: '/content/comments',

        GET_ALL_USER: '/identity/users',
        GET_USER: userId => `/identity/users/${userId}`,
        UPDATE_USER: userId => `/identity/users/${userId}`,
        GET_TRAFFIC: '/content/articles/stats/traffic',

        CRAW_ARTICLES_BY_CATEGORY: '/content/admin/crawler/trigger',
        LIST_CATEGORY_CRAW: '/content/admin/crawler/categories',
    }
};