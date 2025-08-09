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
        GET_ALL_ARTICLE: '/content/article/all',
        GET_DETAIL_ARTICLE: slug => `/content/article/detail-by-slug/${slug}`,
        GET_ALL_CATEGORIES: '/content/category',
        CREATE_COMMENT: '/comment/create',
        GET_COMMENTS: (articleId) => `/comment/article/${articleId}`,
        GET_ALL_TAGS: '/content/tag',
        GET_ALL_ARTICLE_BY_CATEGORY: (categorySlug) => `/content/article/all/${categorySlug}`,
    },
    ADMIN: {
        CREATE_CATEGORY: '/content/category/create',
        DELETE_CATEGORY: categoryId => `/content/category/delete/${categoryId}`,

        CREATE_TAG: '/content/tag/create',
        DELETE_TAG: tagId => `/content/tag/delete/${tagId}`,

        CREATE_ARTICLE: '/content/article/create',
        DELETE_ARTICLE: articleId => `/content/article/delete/${articleId}`,

    }
};