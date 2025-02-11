import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("access_token") || null);

    const login = async (username, password) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/login/", { username, password });
            const { refresh, access } = response.data;
            // console.log(`refresh: ${refresh}\naccess: ${access}`);
            localStorage.setItem("refresh_token", refresh);
            localStorage.setItem("access_token", access);
            // console.log(`Access: ${access}`);

            setToken(access);
            fetchUserData(access);
        }
        catch (error) {
            console.log("Login failed", error.response.data.error);
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/register/", { username, email, password });
            const { message } = response.data;
            console.log(message);
        } catch (error) {
            console.log('Registration failed', error.response.data.error);
        }
    };

    const logout = () => {
        setToken("");
        setUser("");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    };

    //* helper function
    const fetchUserData = async (token) => {
        try {
            const response = await axios.get("http://localhost:8000/auth/protected/", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const { user } = response.data;
            setUser(user);
        } catch (error) {
            console.error("Failed to fetch user data: ", error.response?.data.detail);
        }
    };

    //* helper function (fetch new token)
    const fetchNewToken = async (refreshToken, accessToken) => {
        try {
            const response = await axios.post("http://localhost:8000/auth/refresh/", { refresh: refreshToken },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );

            const { new_token } = response.data;
            // console.log(`New token: ${new_token}`);
            setToken(new_token);
            localStorage.setItem("access_token", new_token);
            return new_token;
        } catch (error) {
            console.error(error.response?.data.detail);
        }
    }

    //* helper function (check if token expired)

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            const storedToken = localStorage.getItem("access_token");
            setToken(storedToken);
            fetchUserData(storedToken);

            const { exp } = jwtDecode(storedToken);
            const tokenExpiry = new Date(exp * 1000 - 30000); // tokenExpiry time; t minus 30 seconds
            const _t = new Date();
            // console.log(tokenExpiry);
            // console.log(tokenExpiry - _t);

            const timer = setTimeout(() => fetchNewToken(localStorage.getItem("refresh_token"), storedToken), tokenExpiry - _t);

            return () => clearTimeout(timer);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

