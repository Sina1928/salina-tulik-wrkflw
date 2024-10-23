import { User, BaseAuthContextType } from "./BaseAuthContext.tsx";
import React, { useState, createContext, useContext } from "react";
import axios from "axios";

interface SignupData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company_name: string;
  industry_id: number;
}

interface SignupContextType extends BaseAuthContextType {
  signup: (data: SignupData) => Promise<void>;
}

const SignupContext = createContext<SignupContextType | null>(null);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (data: SignupData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:8080/auth/login", {
        data,
      });
      const { token, user } = response.data;
      localStorage.setItem("accessToken", token);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (err: any) {
      console.error("Signup failed: ", err);
      const message = err.response?.data?.error || "Signup failed";
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
    <SignupContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
};
