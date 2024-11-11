import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../types/types";

interface AuthResponse {
  jwt: string;
  roles: string;
  userEmail: string;
}

interface ProviderProps {
  userEmail: string | null;
  userRoles: Roles | null;
  login(data: Login): Promise<AuthResponse | false>;
  logout(): void;
}

enum Roles {
  USER = "USER",
  ADMIN = "ADMIN",
}

const AuthContext = createContext<ProviderProps>({
  userEmail: null,
  userRoles: null,
  login: async (loginInfo: Login) => false,
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<Roles | null>(null);
  const navigate = useNavigate();

  const isRole = (value: string): value is Roles => {
    return Object.values(Roles).includes(value as Roles);
  };

  const login = async (loginInfo: Login): Promise<AuthResponse | false> => {
    try {
      const response: Response = await fetch("/api/member/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert("Wrong password or email");
        throw new Error(`Login failed: ${errorText}`);
      }

      const data: AuthResponse = await response.json();
      sessionStorage.setItem("accessToken", data.jwt);

      setUserEmail(data.userEmail);
      if (isRole(data.roles)) {
        setUserRoles(data.roles);
      } else {
        console.error("Unknown role:", data.roles);
      }
      navigate("/");
      return data;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUserEmail(null);
    setUserRoles(null);
    sessionStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ userEmail, userRoles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
