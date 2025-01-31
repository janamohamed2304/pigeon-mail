import { createContext, useState, useContext, useEffect } from 'react';
import authService from './authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in on initial load
        const initAuth = () => {
            const user = authService.getCurrentUser();
            if (user) {
                setUser(user);
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            const data = await authService.login(email, password);
            setUser(data.user);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during login');
            throw err;
        }
    };

    const signup = async (name, email, password) => {
        try {
            setError(null);
            const data = await authService.signup(name, email, password);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during signup');
            throw err;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            login,
            signup,
            logout,
            isAuthenticated: authService.isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};