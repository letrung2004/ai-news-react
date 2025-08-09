import { useState } from 'react';

const useAlert = () => {
    const [alert, setAlert] = useState({
        isVisible: false,
        type: 'success',
        title: '',
        message: ''
    });

    const showAlert = (type, title, message) => {
        setAlert({
            isVisible: true,
            type,
            title,
            message
        });
    };

    const hideAlert = () => {
        setAlert(prev => ({ ...prev, isVisible: false }));
    };

    const showSuccess = (title, message) => {
        showAlert('success', title, message);
    };

    const showError = (title, message) => {
        showAlert('error', title, message);
    };

    const showWarning = (title, message) => {
        showAlert('warning', title, message);
    };

    const showInfo = (title, message) => {
        showAlert('info', title, message);
    };

    return {
        alert,
        showAlert,
        hideAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo
    };
};

export default useAlert;