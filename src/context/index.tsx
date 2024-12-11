import { createContext, useContext, useState, useEffect } from "react";
import { set } from "react-hook-form";

interface AuthContextType {
  userId: string | null;
  token: string | null;
  roleId: string | null;
  isAuthenticated: boolean;
  authenticateUser: (userId: string, token: string, roleId:string, hasProfile:boolean) => void;
  logoutUser: () => void;
  hasProfile: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");
    const savedRoleId = localStorage.getItem("roleId");

    if (savedToken && savedUserId && savedRoleId && hasProfile) {
      setToken(savedToken);
      setUserId(savedUserId);
      setRoleId(savedRoleId);
      setIsAuthenticated(true);
      setHasProfile(hasProfile);
    }
  }, []);

  const authenticateUser = (userId: string, token: string, roleId: string) => {
    setUserId(userId);
    setToken(token);
    setRoleId(roleId);
    setIsAuthenticated(true);
    setHasProfile(hasProfile);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("roleId", roleId);
  };

  const logoutUser = () => {
    setUserId(null);
    setToken(null);
    setRoleId(null);
    setIsAuthenticated(false);
    setHasProfile(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("roleId");
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        token,
        roleId,
        isAuthenticated,
        authenticateUser,
        logoutUser,
        hasProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
