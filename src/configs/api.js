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
    },
    ADMIN: {
        // endpoints cho admin
    }
};