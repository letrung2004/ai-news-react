import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { handleApiError } from '../utils/helpers';

const useRegister = () => {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validate = (user) => {
        const newErrors = {};
        if (!user.lastName) {
            newErrors.lastName = 'Họ là bắt buộc';
        } else if (user.lastName.length < 2) {
            newErrors.lastName = 'Họ tên phải có ít nhất 2 ký tự';
        }

        if (!user.firstName) {
            newErrors.firstName = 'Tên là bắt buộc';
        } else if (user.firstName.length < 2) {
            newErrors.firstName = 'Họ tên phải có ít nhất 2 ký tự';
        }
        if (!user.email) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!user.username) {
            newErrors.username = 'Tên đăng nhập là bắt buộc';
        }

        if (!user.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (user.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(user.password)) {
            newErrors.password = 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số';
        }

        if (!user.confirm) {
            newErrors.confirm = 'Xác nhận mật khẩu là bắt buộc';
        } else if (user.password !== user.confirm) {
            newErrors.confirm = 'Mật khẩu xác nhận không khớp';
        }

        return newErrors;
    };

    const register = async (user) => {
        const validationErrors = validate(user);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return { success: false, errors: validationErrors };
        }

        setLoading(true);
        setErrors({});
        try {
            console.log("Sending:", user);

            const { confirm, ...registerData } = user;// xoa confirm ra

            const response = await authService.register(registerData);

            console.log("Đăng ký thành công!", response);
            navigate("/login");
            return { success: true };
        } catch (error) {
            console.error("Đăng ký thất bại:", error);
            const errorMessage = handleApiError(error);
            setErrors({ general: errorMessage });
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return { register, errors, loading, setErrors };
};

export default useRegister;
