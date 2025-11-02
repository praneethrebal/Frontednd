import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true); // <-- new loading state

  // Load saved auth from localStorage on app mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const savedUsername = localStorage.getItem("username");

    if (savedToken && savedRole && savedUsername) {
      setToken(savedToken);
      setRole(savedRole);
      setUsername(savedUsername);
    }
    setLoading(false); // done loading
  }, []);

  const saveAuth = (newToken, newRole, newUsername) => {
    setToken(newToken);
    setRole(newRole);
    setUsername(newUsername);

    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    localStorage.setItem("username", newUsername);
  };

  const logOut = () => {
    setToken(null);
    setRole(null);
    setUsername(null);

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{ token, role, username, saveAuth, logOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
