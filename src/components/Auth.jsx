import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [signup, setSignUp] = useState(null);
  useEffect(() => {
    const storedName = localStorage.getItem("useName");
    const storedUser = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("setToken");
    const signUpUser = localStorage.getItem("signUp");
    if (storedName) setUsername(JSON.parse(storedName));
    if (storedUser) setAuthUser(JSON.parse(storedUser));
    if (storedToken) setAuthToken(JSON.parse(storedToken));
    if (storedToken) setSignUp(JSON.parse(signUpUser));
  },[])
  const NameObjects = (data) => {
    setUsername(data);
    localStorage.setItem("useName", JSON.stringify(data));
  };

  const AuthUserData = (data) => {
    console.log("AuthUserData received:", data);
    if (!data) {
        return;
    }
    setAuthUser(data);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  const ResetToken = (token) => {
    setAuthToken(token);
    localStorage.setItem("setToken", JSON.stringify(token));
  };

  const SignupUserData = (signupData) => {
    setAuthToken(signupData);
    localStorage.setItem("signUp", JSON.stringify(signupData));
  };
  return (
    <AuthContext.Provider value={{ NameObjects, username, AuthUserData, authUser, ResetToken, authToken, SignupUserData, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
