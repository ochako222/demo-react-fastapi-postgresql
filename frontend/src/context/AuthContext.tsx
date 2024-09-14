import React, {useContext}  from 'react';


export const AuthContext = React.createContext({
    user: null,
    profile: null,
    login: () => {},
    logOut: () => {}
});


export const useAuth = () => {
    return useContext(AuthContext);
};
