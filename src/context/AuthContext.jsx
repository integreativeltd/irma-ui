// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

// Dummy user for development/testing
const DUMMY_USER = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'admin'
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simple validation
      if (email === 'test@example.com' && password === 'password123') {
        const token = 'dummy-jwt-token';
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(DUMMY_USER));
        setUser(DUMMY_USER);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
