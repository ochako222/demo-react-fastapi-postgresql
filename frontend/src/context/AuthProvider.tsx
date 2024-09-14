import { useGoogleLogin, googleLogout, TokenResponse } from "@react-oauth/google";
import axios from "axios";
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

import { ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<TokenResponse | null>(null); // Changed to TokenResponse | null
    const [profile, setProfile] = useState(null); // Changed to null

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const logOut = () => {
        googleLogout();
        setUser(null); // Clear user on logout
        setProfile(null); // Clear profile on logout
    };

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ login, logOut, user, profile }}>
            {children}
        </AuthContext.Provider>
    );
};