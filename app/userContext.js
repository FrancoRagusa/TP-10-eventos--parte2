"use client";
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const saveUserToken = (token) => {
        localStorage.setItem("user", token);
        setUser(token);
    };

    const logOut = () => {
        localStorage.removeItem("user"); 
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, saveUserToken, logOut }}>
            {children}
        </UserContext.Provider>
    );
};
