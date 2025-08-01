import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { tokenStorage } from '../utils/storage';
import { authService } from '../services/authService';

// API các request cần authentication
export const API = axios.create({
    baseURL: BASE_URL,
});

// API auth requests
export const AUTH_REQUEST = axios.create({
    baseURL: BASE_URL,
});

// interceptor tự động thêm token
AUTH_REQUEST.interceptors.request.use((config) => {
    const token = tokenStorage.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// kiem tra token khong hop le refresh lai token moi
AUTH_REQUEST.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const currentToken = tokenStorage.getToken();
                const res = await authService.refreshToken(currentToken);

                if (res.code === 1000) {
                    const newToken = res.result.token;
                    tokenStorage.saveToken(newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return API(originalRequest);
                } else {
                    throw new Error('Refresh token failed');
                }

            } catch (refreshError) {
                tokenStorage.removeToken();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);