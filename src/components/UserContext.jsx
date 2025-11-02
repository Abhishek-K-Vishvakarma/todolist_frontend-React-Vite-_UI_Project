import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch("https://todolist-backend-node-js-apis-project.onrender.com/api/profile", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user); 
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null); 
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);


  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch(`https://todolist-backend-node-js-apis-project.onrender.com/api/token`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.status_code === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
    };
    checkSession();
    const interval = setInterval(checkSession, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
