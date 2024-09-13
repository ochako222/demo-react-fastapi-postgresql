/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useCallback, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const AuthContext = React.createContext({
    isLoggedIn: false,
    login: (token: string, timestamp: string) => {},
    logout: () => {}
});

enum StorageItems {
    TOKEN = 'token',
    TIMESTAMP = 'timeStamp'
}

export const useAuth = () => {
    const [userId, setUserId] = useState('');

    const login = useCallback((token: string, timestamp: string) => {
        const userInfoFromToken = jwt_decode(token) as { user_id: string };

        setUserId(userInfoFromToken.user_id);

        localStorage.setItem(StorageItems.TIMESTAMP, timestamp);

        localStorage.setItem(StorageItems.TOKEN, token);
    }, []);

    const logout = useCallback(() => {
        setUserId('');

        localStorage.removeItem(StorageItems.TOKEN);
        localStorage.removeItem(StorageItems.TIMESTAMP);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem(StorageItems.TOKEN);
        const timestamp = localStorage.getItem(StorageItems.TIMESTAMP);

        if (token && timestamp && process.env.REACT_APP_EXPIRY_PERIOD) {
            const expiry =
                new Date(parseInt(timestamp)).getTime() +
                parseInt(process.env.REACT_APP_EXPIRY_PERIOD);

            const currentDate = new Date().valueOf();

            if (expiry < currentDate) {
                logout();
            } else {
                login(token, timestamp);
            }
        }
    }, [login]);

    return {
        login,
        logout,
        userId
    };
};
