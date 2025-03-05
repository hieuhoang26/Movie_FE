import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { clearLS, getAccessTokenFromLS } from "../utils/storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(getAccessTokenFromLS())
  );
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();

  const login = (accessToken) => {
    const { id, userName, email, roleName } = jwtDecode(accessToken);
    setUserId(id);
    setRole(roleName);
    setUserName(userName);
    setEmail(email);
  };

  const logout = () => {
    setUserId(null);
    setRole(null);
    setUserName(null);
    setEmail(null);
    setIsAuthenticated(false);
    clearLS();
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userId,
        login,
        logout,
        role,
        userName,
        setUserName,
        // authAxios,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
