// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import { authApi } from '../features/auth/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    try {
      const userData = await authApi.login(email, password);
      
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        roles: userData.roles || [],
        isActive: userData.isActive || true
      }));
      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const register = async (email, password, name, roles = ['TAX_OFFICER']) => {
    try {
      const userData = await authApi.register({ email, password, name, roles });
      
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        roles: userData.roles || [],
        isActive: userData.isActive || true
      }));
      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const hasRole = (role) => {
    return user?.roles?.includes(role) || false;
  };

  const hasAnyRole = (roles) => {
    return user?.roles?.some(role => roles.includes(role)) || false;
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated,
      hasRole,
      hasAnyRole 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
