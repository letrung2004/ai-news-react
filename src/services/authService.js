import { AUTH_REQUEST, API } from '../configs/axios';
import { ENDPOINTS } from '../configs/api';
import { tokenStorage } from '../utils/storage';

export const authService = {

    //dang nhap
    login: async (credentials) => {
        const response = await API.post(ENDPOINTS.AUTH.LOGIN, credentials);
        return response.data;
    },

    // dang nhap OAuth voi google
    loginWithOAuth: async (authCode) => {
        const response = await API.post(
            `${ENDPOINTS.AUTH.OAUTH}?code=${authCode}`
        );
        return response.data;
    },

    //lay thong tin my-info
    getUserInfo: async () => {
        const response = await AUTH_REQUEST.get(ENDPOINTS.AUTH.ME);
        return response.data;
    },

    //dang xuat
    logout: () => {
        tokenStorage.removeToken();
    },

    //dang ky
    register: async (userRegisterData) => {
        const res = await API.post(ENDPOINTS.AUTH.REGISTER, userRegisterData);
        if (res.status !== 200 && res.status !== 201) {
            throw new Error(res.data.message);
        }
    },

    //refresh token
    refreshToken: async (token) => {
        const response = await API.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {
            token: token
        });
        return response.data;
    }

    //add user in admin
};