import { AUTH_REQUEST, API } from '../configs/axios';
import { ENDPOINTS } from '../configs/api';
import { tokenStorage } from '../utils/storage';

export const articleService = {

    //upload article images
    uploadImage: async (imageData) => {
        const response = await AUTH_REQUEST.post(ENDPOINTS.NEWS.UPLOAD_IMAGE, imageData);
        return response.data;
    },
};