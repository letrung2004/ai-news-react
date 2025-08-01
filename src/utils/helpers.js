export const buildOAuthUrl = (config) => {
    const { authUri, clientId, redirectUri } = config;
    return `${authUri}?redirect_uri=${encodeURIComponent(
        redirectUri
    )}&response_type=code&client_id=${clientId}&scope=openid%20email%20profile`;
};

export const extractAuthCode = (url) => {
    const authCodeRegex = /code=([^&]+)/;
    const match = url.match(authCodeRegex);
    return match ? match[1] : null;
};

export const handleApiError = (error) => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }
    return 'Có lỗi xảy ra, vui lòng thử lại';
};

// Hàm xử lý và làm sạch HTML content từ CKEditor
export const sanitizeHtmlContent = (htmlString) => {
    if (!htmlString) return '';

    // Loại bỏ các thẻ p trống hoặc chỉ có khoảng trắng
    let cleaned = htmlString.replace(/<p>\s*<\/p>/g, '');

    // Loại bỏ các thuộc tính style inline không cần thiết (tùy chọn)
    // cleaned = cleaned.replace(/style="[^"]*"/g, '');

    return cleaned;
};