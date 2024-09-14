import { useGoogleLogin, googleLogout, TokenResponse } from '@react-oauth/google';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { AuthContext } from './AuthContext';

import { ReactNode } from 'react';

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Main authentication logic, based on library @react-oauth/google
 * We use user entity to retrieve user profile with axios request
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<TokenResponse | null>(null); // Changed to TokenResponse | null
    const [isLogged, setIsLogged] = useState<boolean>(false); // Changed to null

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const logOut = () => {
        googleLogout();
        setUser(null); // Clear user on logout
        setIsLogged(false); // Clear profile on logout
    };

    useEffect(() => {
        if (user) {
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    }
                )
                .then((res) => {
                    // Inside the res, we can find the user profile
                    // Use res.data in case to retrieve some user details
                    if (res.data) {
                        setIsLogged(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const contextValue = useMemo(
        () => ({
            isLogged,
            login,
            logOut
        }),
        [isLogged]
    );

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
