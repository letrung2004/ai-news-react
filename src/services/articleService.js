import { AUTH_REQUEST, API } from '../configs/axios';
import { ENDPOINTS } from '../configs/api';

export const articleService = {

    //upload article images
    uploadImage: async (imageData) => {
        const response = await API.post(ENDPOINTS.NEWS.UPLOAD_IMAGE, imageData);
        return response.data;
    },

    //add article
    createArticle: async (articleData) => {
        const response = await AUTH_REQUEST.post(ENDPOINTS.ADMIN.CREATE_ARTICLE, articleData);
        return response.data;
    },

    //get all article status for admin
    getAllArticleForAdmin: async (page = 1) => {
        const response = await AUTH_REQUEST.get(`${ENDPOINTS.ADMIN.GET_ALL_ARTICLE}?page=${page}`);
        return response.data.result;
    },

    //update article
    updateArticle: async (articleId, articleData) => {
        const response = await AUTH_REQUEST.put(ENDPOINTS.ADMIN.UPDATE_ARTICLE(articleId), articleData);
        return response.data;
    },

    //delete article
    deleteArticle: async (articleId) => {
        const response = await AUTH_REQUEST.delete(ENDPOINTS.ADMIN.DELETE_ARTICLE(articleId));
        return response.data;
    },

    //update status
    updateStatusArticle: async (articleId, status) => {
        const response = await AUTH_REQUEST.patch(
            ENDPOINTS.ADMIN.UPDATE_ARTICLE_STATUS(articleId),
            { status }
        );
        return response.data;
    },

    //get detail article
    getDetailArticle: async (articleSlug) => {
        const response = await AUTH_REQUEST.get(ENDPOINTS.NEWS.GET_DETAIL_ARTICLE(articleSlug));
        return response.data;
    },

    //get all article
    getAllArticle: async (page = 1) => {
        const response = await API.get(`${ENDPOINTS.NEWS.GET_ALL_ARTICLE}?page=${page}`);
        return response.data.result;
    },

    //get all article by category
    getAllArticleByCategory: async (categorySlug, page = 1) => {
        const response = await API.get(`${ENDPOINTS.NEWS.GET_ALL_ARTICLE_BY_CATEGORY(categorySlug)}?page=${page}`);
        return response.data.result;
    },

    // get recommendation article for user
    getRecommendations: async (size = 6) => {
        const response = await AUTH_REQUEST.get(
            `${ENDPOINTS.NEWS.RECOMMENDATION}?size=${size}`
        );
        return response.data.result;
    },

    //search article
    searchArticles: async (keyword) => {
        const response = await API.get(
            `${ENDPOINTS.NEWS.SEARCH}?keyword=${encodeURIComponent(keyword)}`
        );
        return response.data.result; // { articles, totalElements, tookInMillis }
    },

    // 
    getAllArticleForStats: async () => {
        const response = await AUTH_REQUEST.get(
            `${ENDPOINTS.ADMIN.GET_ALL_ARTICLE}?page=1&size=9999`
        );
        return response.data.result;
    },

    // get trending article
    getTrendingArticle: async ()=>{
        const response = await API.get(
            `${ENDPOINTS.NEWS.TRENDING_ARTICLE}?page=1&size=5`
        );
        return response.data.result;
    },

    // bookmark/ un bookmark article
    bookmarkArticle : async (articleId) =>{
        const response = await AUTH_REQUEST.post(
            ENDPOINTS.NEWS.BOOKMARK_ARTICLE(articleId),
        );
        return response.data;
    },

    // check bookmark 
    getBookmarkArticle : async (articleId) =>{
        const response = await AUTH_REQUEST.get(
            ENDPOINTS.NEWS.BOOKMARK_ARTICLE(articleId),
        );
        return response.data;
    },

    getTraffic: async (days = 90) => {
        const response = await AUTH_REQUEST.get(
            `${ENDPOINTS.ADMIN.GET_TRAFFIC}?days=${days}`
        );
        return response.data;
    },


    crawArticles: async (crawRequestData) => {
    const response = await AUTH_REQUEST.post(
        ENDPOINTS.ADMIN.CRAW_ARTICLES_BY_CATEGORY,
        crawRequestData
    );

        return response.data;
    },

    listCategoryCraw: async ()=>{
        const response = await AUTH_REQUEST.get(ENDPOINTS.ADMIN.LIST_CATEGORY_CRAW);
        return response.data;
    },

};