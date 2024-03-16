import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const setToken = async (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('http://localhost:3004/api/auth/user/info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        console.log("got userData", userData);
        setUserInfo(userData);
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, setToken, userInfo, fetchUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
