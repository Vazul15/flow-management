import React, { createContext, useState, useContext, useEffect } from "react";
import { Login } from "../types/types";
import { useNavigate } from "react-router-dom";

interface AuthResponse {
  jwt: string;
  roles: string[];
  userPublicId: string;
}

interface ProviderProps {
  isLoggedIn: boolean;
  userPublicId: string | null;
  userRoles: string[];
  token: string | null;
  login(data: Login): Promise<AuthResponse | false>;
  logout(): void;
}

const AuthContext = createContext<ProviderProps>({
  isLoggedIn: false,
  userPublicId: null,
  userRoles: [],
  token: null,
  login: async () => false,
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPublicId, setUserPublicId] = useState<string | null>(null)
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedRoles = localStorage.getItem("userRoles");
    const storedUserPublicId = localStorage.getItem("userPublicId");
    
    if (storedToken && storedRoles && storedUserPublicId) {
      setToken(storedToken);
      setUserRoles(JSON.parse(storedRoles));
      setUserPublicId(storedUserPublicId);
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (loginInfo: Login): Promise<AuthResponse | false> => {
    try {
      const response = await fetch("/api/teacher/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      if (!response.ok) {
        alert("Wrong password or email");
        return false;
      }

      const data: AuthResponse = await response.json();
      localStorage.setItem("accessToken", data.jwt);
      localStorage.setItem("userRoles", JSON.stringify(data.roles));
      localStorage.setItem("userPublicId", data.userPublicId);

      setToken(data.jwt)
      setUserPublicId(data.userPublicId)
      setUserRoles(data.roles);
      setIsLoggedIn(true);

      return data;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUserRoles([]);
    setIsLoggedIn(false);
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userPublicId, userRoles, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
