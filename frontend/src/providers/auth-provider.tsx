import axios from 'axios';
import { createContext, useContext, useState } from 'react';

type User = {
  username: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loggedIn: boolean;
};

type TokenResponse = {
  access_token: string;
  token_type: string;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {
    return Promise.reject('AuthProvider is not rendered yet');
  },
  logout: () => {},
  loggedIn: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (username: string, password: string) => {
    const params = new URLSearchParams({
      username: username,
      password: password,
    });
    try {
      const resp = await axios.post<TokenResponse>(
        'http://localhost:8000/token',
        params
      );
      setUser({
        username: username,
        token: resp.data.access_token,
      });
      setLoggedIn(true);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${resp.data.access_token}`;
      return true;
    } catch (err) {
      console.error(err);
      setLoggedIn(false);
      delete axios.defaults.headers.common['Authorization'];
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setLoggedIn(false);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  if (!AuthContext) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return useContext(AuthContext);
};
