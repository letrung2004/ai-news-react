import cookie from 'react-cookies';

export const tokenStorage = {
    saveToken: (token) => {
        cookie.save('jwtToken', token, { path: '/' });
    },

    getToken: () => {
        return cookie.load('jwtToken');
    },

    removeToken: () => {
        cookie.remove('jwtToken', { path: '/' });
    }
};