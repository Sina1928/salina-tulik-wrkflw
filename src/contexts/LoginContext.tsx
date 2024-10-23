import { User, BaseAuthContextType } from "./BaseAuthContext.tsx";
import React, { useState, createContext, useContext } from "react";
import axios from "axios";

interface LoginContextType extends BaseAuthContextType {
  login: (email: string, password: string) => Promise<void>;
}

const LoginContext = createContext<LoginContextType | null>(null);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("accessToken", token);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (err: any) {
      console.error("Login failed: ", err);
      const message = err.response?.data?.error || "Login failed";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  const clearError = () => setError(null);

  return (
    <LoginContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
