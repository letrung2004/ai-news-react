import { AUTH_REQUEST, API } from '../configs/axios';
import { ENDPOINTS } from '../configs/api';

export const userService = {
    //get all user
    getAllUser: async () => {
        const response = await AUTH_REQUEST.get(ENDPOINTS.ADMIN.GET_ALL_USER);
        return response.data;
    },



};