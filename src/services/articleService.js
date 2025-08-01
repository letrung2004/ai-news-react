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

};