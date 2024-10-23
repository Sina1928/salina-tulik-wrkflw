import { createContext } from "react";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role?: string;
  company_id?: number;
}

export interface BaseAuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  logout: () => void;
  clearError: () => void;
}
export const BaseAuthContext = createContext<BaseAuthContextType | null>(null);
