import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, currentUser } from '../data/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('betpro_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (email === 'demo@betplatform.com' || email) {
      setUser(currentUser);
      localStorage.setItem('betpro_user', JSON.stringify(currentUser));
      return true;
    }
    return false;
  };

  const register = async (_email: string, username: string, _password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser: User = {
      ...currentUser,
      id: Date.now().toString(),
      username,
      email: _email,
      balance: 1000,
      kycStatus: 'pending',
    };
    setUser(newUser);
    localStorage.setItem('betpro_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('betpro_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('betpro_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
