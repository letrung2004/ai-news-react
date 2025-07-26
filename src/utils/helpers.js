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