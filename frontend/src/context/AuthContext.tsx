import React, { useContext } from 'react';

export const AuthContext = React.createContext({
    isLogged: false,
    login: () => {},
    logOut: () => {}
});

export const useAuth = () => {
    return useContext(AuthContext);
};
