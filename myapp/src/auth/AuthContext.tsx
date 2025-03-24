import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    const res = await axios.post('http://localhost:3000/login', { username, password });
    setAccessToken(res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken); // if not using cookies
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    await axios.delete('http://localhost:3000/logout', {
      data: { token: refreshToken },
    });
    setAccessToken(null);
    localStorage.removeItem('refreshToken');
  };

  const refreshToken = async () => {
    const res = await axios.post('http://localhost:3000/token', {
      token: localStorage.getItem('refreshToken'),
    });
    setAccessToken(res.data.accessToken);
    return res.data.accessToken;
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
