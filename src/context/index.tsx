import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  userId: string | null;
  token: string | null;
  roleId: string | null;
  isAuthenticated: boolean;
  authenticateUser: (userId: string, token: string, roleId:string) => void;
  logoutUser: () => void;
  hasProfile: boolean;
  setUserProfile: (hasProfile: boolean) => void;
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
    const savedHasProfile = localStorage.getItem("hasProfile");

    if (savedToken && savedUserId && savedRoleId && savedHasProfile) {
      setToken(savedToken);
      setUserId(savedUserId);
      setRoleId(savedRoleId);
      setIsAuthenticated(true);
      setHasProfile(savedHasProfile === "true");
    }
  }, []);

  const authenticateUser = (userId: string, token: string, roleId: string) => {
    setUserId(userId);
    setToken(token);
    setRoleId(roleId);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("roleId", roleId);
  };

  const setUserProfile = (hasProfile: boolean) => {
    setHasProfile(hasProfile);
    localStorage.setItem("hasProfile", hasProfile.toString());
  }

  const logoutUser = () => {
    setUserId(null);
    setToken(null);
    setRoleId(null);
    setIsAuthenticated(false);
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
        setUserProfile,
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
