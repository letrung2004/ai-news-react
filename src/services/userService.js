import { AUTH_REQUEST, API } from '../configs/axios';
import { ENDPOINTS } from '../configs/api';

export const userService = {
    //get all user
    getAllUser: async () => {
        const response = await AUTH_REQUEST.get(ENDPOINTS.ADMIN.GET_ALL_USER);
        return response.data;
    },

    // get detail user
    getUser: async (userId) => {
        const response = await AUTH_REQUEST.get(ENDPOINTS.ADMIN.GET_USER(userId));
        return response.data;
    },

    // update user
    updateUser: async (userId, userUpdateData) => {
        const response = await AUTH_REQUEST.put(ENDPOINTS.ADMIN.UPDATE_USER(userId), userUpdateData);
        return response.data;
    },



};