import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { authService } from "../services/authService";
import { buildOAuthUrl, handleApiError } from "../utils/helpers";
import { oauth } from "../configs/oauth";
import { tokenStorage } from "../utils/storage";

const useLogin = () => {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const validate = (credentials) => {
        const newErrors = {};

        if (!credentials.username || credentials.username.trim() === '') {
            newErrors.username = 'Tên đăng nhập không được để trống';
        }

        if (!credentials.password || credentials.password.trim() === '') {
            newErrors.password = 'Mật khẩu không được để trống';
        }

        return newErrors;
    };


    const loginUser = async (credentials) => {
        const validationErrors = validate(credentials);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return { success: false, errors: validationErrors };
        }

        setLoading(true);
        setErrors({});

        try {
            console.log("in useLogin:", credentials.username);

            const loginResponse = await authService.login(credentials);

            const token = loginResponse.result?.token;
            if (!token) {
                throw new Error('Token không hợp lệ');
            }

            tokenStorage.saveToken(token);


            const userResponse = await authService.getUserInfo();


            login(userResponse.result, token);


            navigate("/");

            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = handleApiError(error);
            setErrors({ general: errorMessage });
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };


    const loginWithGoogle = () => {
        try {
            const targetUrl = buildOAuthUrl(oauth);
            window.location.href = targetUrl;
        } catch (error) {
            console.error('OAuth URL build error:', error);
            setErrors({ general: 'Không thể khởi tạo đăng nhập Google' });
        }
    };

    const handleUrlErrors = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');

        if (error) {
            let errorMessage = '';
            switch (error) {
                case 'oauth_failed':
                    errorMessage = 'Đăng nhập Google thất bại. Vui lòng thử lại.';
                    break;
                case 'no_code':
                    errorMessage = 'Không nhận được mã xác thực từ Google.';
                    break;
                case 'fetch_user_failed':
                    errorMessage = 'Không thể lấy thông tin người dùng.';
                    break;
                case 'token_expired':
                    errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
                    break;
                case 'unauthorized':
                    errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng.';
                    break;
                default:
                    errorMessage = 'Có lỗi xảy ra trong quá trình đăng nhập.';
            }
            setErrors({ general: errorMessage });

            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    };

    const clearError = (field) => {
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const clearAllErrors = () => {
        setErrors({});
    };

    return {
        errors,
        loading,
        loginUser,
        loginWithGoogle,
        handleUrlErrors,
        clearError,
        clearAllErrors,
        setErrors
    };
};
export default useLogin;
