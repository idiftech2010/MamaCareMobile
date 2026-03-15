import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: (email: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (email === 'admin@mamacare.app' && password === 'admin123') {
      setUser({ id: '1', email, name: 'Admin User', role: 'admin' });
      return true;
    }
    if (email === 'superadmin@mamacare.app' && password === 'superadmin123') {
      setUser({ id: '2', email, name: 'Super Admin', role: 'admin' });
      return true;
    }
    if (email && password) {
      setUser({ id: '3', email, name: 'User', role: 'user' });
      return true;
    }
    return false;
  }, []);

  const loginWithGoogle = useCallback(async (email: string, name: string): Promise<boolean> => {
    setUser({ id: '3', email, name, role: 'user' });
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      loginWithGoogle,
      logout,
    }}>
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