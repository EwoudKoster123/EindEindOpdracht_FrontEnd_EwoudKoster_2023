import React, {createContext, useState} from 'react';
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null
    });
    const history = useHistory();

    function login() {
        toggleIsAuth({
            ...isAuth, isAuth: true
        });
        history.push("/profile");
    }

    function logout() {
        toggleIsAuth(
            {
                ...isAuth,
                isAuth: false,
                user: null,
            });
        history.push('/');
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;