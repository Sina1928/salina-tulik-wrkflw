import { createContext, useContext, useState } from "react";
import axios from "axios";
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  companyId?: number;
}

export interface Company {
  id: number;
  name: string;
  themeColor: string;
  logoUrl: any;
  industryId: number;
  componentIds: number[];
}

export interface BaseAuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  company: Company | null;
  allCompanies: Company[];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (signupData: any) => Promise<void>;
  switchCompany: (companyId: number) => void;
  error: string | null;
  logout: () => void;
  clearError: () => void;
}
export const BaseAuthContext = createContext<BaseAuthContextType | null>(null);

export const BaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuthResponse = (data: any) => {
    const { token, user, company, companies } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("company", JSON.stringify(company));
    localStorage.setItem("companies", JSON.stringify(companies));
    setUser(user);
    setCompany(company);
    setAllCompanies(companies || []);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );
      handleAuthResponse(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (signupData: any) => {
    setLoading(true);
    try {
      // const sendData = new FormData();

      // const sendFields = {
      //   email: signupData.email,
      //   password: signupData.password,
      //   firstName: signupData.firstName,
      //   lastName: signupData.lastName,
      //   companyName: signupData.companyName,
      //   industryId: signupData.industryId,
      //   websiteUrl: signupData.websiteUrl || "",
      //   themeColor: signupData.themeColor,
      //   selectedComponents: signupData.selectedComponents,
      // };

      // Object.entries(sendFields).forEach(([key, value]) => {
      //   if (key === 'selectedComponents') {
      //     sendData.append(key, JSON.stringify(value));
      //   } else {
      //     sendData.append(key, value as string);
      //   }
      // });

      // if (signupData.logoUrl instanceof File) {
      //   sendData.append("logoUrl", signupData.logoUrl)
      // }

      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        signupData,

        // sendData,

        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      handleAuthResponse(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const switchCompany = (companyId: number) => {
    const newCompany = allCompanies.find((company) => company.id === companyId);
    if (newCompany) {
      setCompany(newCompany);
      localStorage.setItem("company", JSON.stringify(newCompany));
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("company");
    setUser(null);
    setCompany(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  const clearError = () => setError(null);

  return (
    <BaseAuthContext.Provider
      value={{
        company,
        isAuthenticated: !!user,
        user,
        loading,
        error,
        allCompanies,
        login,
        signup,
        switchCompany,
        logout,
        clearError,
      }}
    >
      {children}
    </BaseAuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(BaseAuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
