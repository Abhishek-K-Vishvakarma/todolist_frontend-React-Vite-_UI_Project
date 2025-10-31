import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    const storedName = localStorage.getItem("useName");
    const storedUser = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("setToken");
    console.log(storedUser)
    if (storedName) setUsername(JSON.parse(storedName));
    if (storedUser) setAuthUser(JSON.parse(storedUser));
    if (storedToken) setAuthToken(JSON.parse(storedToken));
  },[])
  const NameObjects = (data) => {
    setUsername(data);
    localStorage.setItem("useName", JSON.stringify(data));
  };

  const AuthUserData = (data) => {
    console.log("AuthUserData received:", data);
    if (!data) {
      console.warn("⚠️ No data passed to AuthUserData!");
      return;
    }
    setAuthUser(data);
    localStorage.setItem("userData", JSON.stringify(data));
    console.log("Saved user data:", data);
  };


  const ResetToken = (token) => {
    setAuthToken(token);
    localStorage.setItem("setToken", JSON.stringify(token));
  };
  return (
    <AuthContext.Provider value={{ NameObjects, username, AuthUserData, authUser, ResetToken, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
