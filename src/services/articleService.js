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
        const response = await API.get(ENDPOINTS.NEWS.GET_DETAIL_ARTICLE(articleSlug));
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

};