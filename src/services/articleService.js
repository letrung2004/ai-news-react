import { AUTH_REQUEST, API } from '../configs/axios';
import { ENDPOINTS } from '../configs/api';
import { tokenStorage } from '../utils/storage';

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

    //update article

    //delete article

    //get detail article
    getDetailArticle: async (articleSlug) => {
        const response = await API.get(ENDPOINTS.NEWS.GET_DETAIL_ARTICLE(articleSlug));
        return response.data;
    },

    //get all article
    getAllArticle: async () => {
        const response = await API.get(ENDPOINTS.NEWS.GET_ALL_ARTICLE);
        return response.data.result.data;
    },

    //get all article by category
    getAllArticleByCategory: async (categorySlug) => {
        const response = await API.get(ENDPOINTS.NEWS.GET_ALL_ARTICLE_BY_CATEGORY(categorySlug));
        return response.data.result.data;
    },

    // get all article comment
    getAllCommentByArticle: async (articleId) => {
        const response = await API.get(ENDPOINTS.NEWS.GET_COMMENTS(articleId));
        return response.data;
    },

    //create comment
    createCommentArticle: async (commentData) => {
        const response = await AUTH_REQUEST.post(ENDPOINTS.NEWS.CREATE_COMMENT, commentData);
        return response.data;
    }


};