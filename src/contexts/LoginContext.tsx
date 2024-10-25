import { User, BaseAuthContextType } from "./BaseAuthContext.tsx";
import React, { useState, createContext, useContext } from "react";
import axios from "axios";

interface Company {
  id: string;
  name: string;
  themeColor: string;
  logoUrl: any;
  industryId: number;
  componentIds: number[];
}
interface LoginContextType extends BaseAuthContextType {
  login: (email: string, password: string) => Promise<void>;
  company: Company | null;
  allCompanies: Company[];
  setCompany: (company: Company) => void;
  switchCompany: (companyId: string) => Promise<void>;
}

const LoginContext = createContext<LoginContextType | null>(null);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token, user, company: primaryCompany, companies } = response.data;
      if (!token || !user) {
        throw new Error("Invalid response from server");
      }
      localStorage.setItem("accessToken", token);
      setUser(user);
      setIsAuthenticated(true);
      setCompany(primaryCompany);
      setAllCompanies(companies || [primaryCompany]);

      if (primaryCompany) {
        localStorage.setItem("selectedCompanyId", primaryCompany.id);
      }

      console.log(response.data);

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

  const switchCompany = async (companyId: string) => {
    try {
      setLoading(true);
      const chooseCompany = allCompanies.find(
        (company) => company.id === companyId
      );

      if (!chooseCompany) {
        throw new Error("Invalid company selection");
      }

      const response = await axios.get(
        `http://localhost:8080/api/companies/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const updatedCompany = response.data;
      setCompany(updatedCompany);
      localStorage.setItem("selectedCompanyId", companyId);
    } catch (err: any) {
      console.error("Company switch failed: ", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("selectedCompanyId");
    setCompany(null);
    setUser(null);
    setAllCompanies([]);
    setIsAuthenticated(false);
  };

  const clearError = () => setError(null);

  return (
    <LoginContext.Provider
      value={{
        isAuthenticated,
        user,
        company,
        allCompanies,
        loading,
        error,
        login,
        logout,
        clearError,
        setCompany,
        switchCompany,
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

export const useCompany = () => {
  const context = useLogin();
  const { company, allCompanies, switchCompany, setCompany } = context;

  return {
    company,
    allCompanies,
    switchCompany,
    setCompany,
    multipleCompanies: allCompanies.length > 1,
  };
};
