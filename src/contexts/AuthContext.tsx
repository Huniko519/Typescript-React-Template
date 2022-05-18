import { createContext, useState, FC, useMemo } from 'react';
import axios from 'services/axios';

interface LoginType {
  user: string;
  pass: string;
}
interface IContext {
  isLoggedIn: boolean;
  login: (data: LoginType) => void;
  logout(): void;
}

export const AuthContext = createContext<IContext>(null!);

const AuthProvider: FC = ({ children }) => {
  const localStorageLogin = localStorage.getItem('login');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorageLogin);

  async function login(data: LoginType) {
    const res = await axios.post('public/posts/login', data);
    localStorage.setItem('login', JSON.stringify(res.data));
    setIsLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem('login');
    setIsLoggedIn(false);
  }
  const value = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
