// import { User, Company, BaseAuthContextType } from "./BaseAuthContext.tsx";
// import React, { useState, createContext, useContext } from "react";
// import axios from "axios";

// const defaultUser: User = {
//   id: 0,
//   email: "",
//   first_name: "",
//   last_name: "",
//   company_id: 0,
// };

// const defaultCompany: Company = {
//   id: 0,
//   name: "",
//   themeColor: "",
//   logoUrl: null,
//   industryId: 0,
//   componentIds: [],
// };

// interface LoginContextType extends BaseAuthContextType {
//   login: (email: string, password: string) => Promise<void>;
//   company: Company;
//   allCompanies: Company[];
//   setCompany: (company: Company) => void;
//   switchCompany: (companyId: number) => Promise<void>;
// }

// const LoginContext = createContext<LoginContextType | null>(null);

// export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<User>(defaultUser);
//   const [company, setCompany] = useState<Company>(defaultCompany);
//   const [allCompanies, setAllCompanies] = useState<Company[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const login = async (email: string, password: string) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await axios.post(
//         "http://localhost:8080/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );
//       const { token, user, company: primaryCompany, companies } = response.data;
//       if (!token || !user) {
//         throw new Error("Invalid response from server");
//       }
//       localStorage.setItem("accessToken", token);
//       localStorage.setItem("user", user);
//       localStorage.setItem("company", primaryCompany);
//       localStorage.setItem("companies", companies);
//       setUser(user);
//       setIsAuthenticated(true);
//       setCompany(primaryCompany);
//       setAllCompanies(companies || [primaryCompany]);

//       if (primaryCompany) {
//         localStorage.setItem("selectedCompanyId", primaryCompany.id.toString());
//       }

//       // console.log(response.data);
//       // console.log(user);
//       // console.log(primaryCompany);
//       // console.log(token);
//       // console.log(companies);

//       return { user, token, primaryCompany, companies };
//     } catch (err: any) {
//       console.error("Login failed: ", err);
//       const message = err.response?.data?.error || "Login failed";
//       setError(message);
//       throw new Error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const switchCompany = async (companyId: number) => {
//     try {
//       setLoading(true);
//       const chooseCompany = allCompanies.find(
//         (company) => company.id === companyId
//       );

//       if (!chooseCompany) {
//         throw new Error("Invalid company selection");
//       }

//       const response = await axios.get(
//         `http://localhost:8080/api/companies/${companyId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );

//       const updatedCompany = response.data;
//       setCompany(updatedCompany);
//       localStorage.setItem("selectedCompanyId", companyId.toString());
//     } catch (err: any) {
//       console.error("Company switch failed: ", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("selectedCompanyId");
//     setCompany(defaultCompany);
//     setUser(defaultUser);
//     setAllCompanies([]);
//     setIsAuthenticated(false);
//   };

//   const clearError = () => setError(null);

//   const contextValue: LoginContextType = {
//     isAuthenticated,
//     user,
//     company,
//     allCompanies,
//     loading,
//     error,
//     login,
//     logout,
//     clearError,
//     setCompany,
//     switchCompany,
//   };

//   return (
//     <LoginContext.Provider value={contextValue}>
//       {children}
//     </LoginContext.Provider>
//   );
// };

// export const useLogin = () => {
//   const context = useContext(LoginContext);
//   if (!context) {
//     throw new Error("useLogin must be used within a LoginProvider");
//   }
//   return context;
// };

// export const useCompany = () => {
//   const context = useLogin();
//   const { company, allCompanies, switchCompany, setCompany } = context;

//   return {
//     company,
//     allCompanies,
//     switchCompany,
//     setCompany,
//     multipleCompanies: allCompanies.length > 1,
//   };
// };
