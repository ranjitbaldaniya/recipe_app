import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: any; // Replace with your user type
  token: string | null;
  userId: string | null;
  login: (user: any, token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Replace with your user type
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken && storedUser && storedUserId) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setUserId(storedUserId);
    }
  }, []);

  const login = (user: any, token: string, userId: string) => {
    setUser(user);
    setToken(token);
    setUserId(userId);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', userId);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setUserId(null);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ user, token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
