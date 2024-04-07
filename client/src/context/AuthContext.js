import { createContext, useContext, useState } from 'react';

const API_URL = 'http://localhost:3004/api/auth';
// const API_URL = 'https://jobx-32a058281844.herokuapp.com/api/auth';
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
      const response = await fetch(`${API_URL}/user/info`, {
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
