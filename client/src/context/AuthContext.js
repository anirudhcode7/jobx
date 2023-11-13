import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const setToken = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  return (
    <AuthContext.Provider value={{ authToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
