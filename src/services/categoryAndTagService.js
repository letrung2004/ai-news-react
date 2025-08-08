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

    //create category
    createCategory: async (categoryData) => {
        const response = await AUTH_REQUEST.post(ENDPOINTS.ADMIN.CREATE_CATEGORY, categoryData);
        return response.data;
    },

    //get detail category

    //update category

    //delete category
    deleteCategory: async (categoryId) => {
        const response = await AUTH_REQUEST.delete(ENDPOINTS.ADMIN.DELETE_CATEGORY(categoryId));
        return response.data;
    },

    //get all tag
    getAllTags: async () => {
        const response = await API.get(ENDPOINTS.NEWS.GET_ALL_TAGS);
        return response.data;
    },

    //create tag
    createTag: async (tagData) => {
        const response = await AUTH_REQUEST.post(ENDPOINTS.ADMIN.CREATE_TAG, tagData);
        return response.data;
    },
    //get detail tag

    //update tag

    //delete tag
    deleteTag: async (tagId) => {
        const response = await AUTH_REQUEST.delete(ENDPOINTS.ADMIN.DELETE_TAG(tagId));
        return response.data;
    }

};