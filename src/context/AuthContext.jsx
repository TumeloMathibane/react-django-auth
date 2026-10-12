import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("access_token") || null
  );

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
        username,
        password
      });
      const { refresh, access } = response.data;

      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("access_token", access);

      setToken(access);
      await fetchUserData(access);
      return true;
    } catch (error) {
      console.error(
        "Login failed",
        error.response?.data?.error || error.message
      );
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/register/",
        { username, email, password }
      );
      console.log(response.data.message);
      return true;
    } catch (error) {
      console.error(
        "Registration failed",
        error.response?.data?.error || error.message
      );
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const fetchUserData = async (currentToken) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/auth/protected/",
        {
          headers: {
            Authorization: `Bearer ${currentToken}`
          }
        }
      );
      const { user: userData } = response.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error(
        "Failed to fetch user data: ",
        error.response?.data?.detail || error.message
      );
      return null;
    }
  };

  const fetchNewToken = async (refreshToken, accessToken) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/refresh/",
        { refresh: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      const { new_token } = response.data;
      setToken(new_token);
      localStorage.setItem("access_token", new_token);
      return new_token;
    } catch (error) {
      console.error(error.response?.data?.detail || error.message);
      return null;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");

    if (!storedToken) {
      return undefined;
    }

    setToken(storedToken);
    fetchUserData(storedToken);

    try {
      const { exp } = jwtDecode(storedToken);
      const tokenExpiry = new Date(exp * 1000 - 30000);
      const now = new Date();

      const timer = setTimeout(
        () => fetchNewToken(localStorage.getItem("refresh_token"), storedToken),
        Math.max(tokenExpiry.getTime() - now.getTime(), 0)
      );

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Invalid token format", error);
      return undefined;
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
