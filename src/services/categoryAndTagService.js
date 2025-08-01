import { AUTH_REQUEST, API } from '../configs/axios';
import { ENDPOINTS } from '../configs/api';
import { tokenStorage } from '../utils/storage';

export const categoryAndTagService = {

    //get all category
    getAllCategories: async () => {
        const response = await API.get(ENDPOINTS.NEWS.GET_ALL_CATEGORIES);
        console.log("from service:", response.data)
        return response.data;
    },

    //get detail category

    //update category

    //delete category

    //get all tag

    //get detail tag

    //update tag

    //delete tag

};