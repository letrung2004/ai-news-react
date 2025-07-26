import React, { createContext, useState, useEffect, useContext } from 'react';
import { tokenStorage } from '../utils/storage';
import { authService } from '../services/authService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData, token) => {
        tokenStorage.saveToken(token);
        setUser(userData);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const loadUser = async () => {
        try {
            const token = tokenStorage.getToken();
            if (token) {
                const response = await authService.getUserInfo();
                if (response && response.result) {
                    setUser(response.result);
                }
            }
        } catch (error) {
            console.error('Error loading user:', error);
            if (error.response?.status === 401) {
                logout();
            } else {
                console.error('Network or server error:', error);
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout, login, loadUser }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };