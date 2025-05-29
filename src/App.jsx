// src/App.jsx
import React from 'react';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { TenantProvider } from './context/TenantContext';

function App() {
  return (
    <TenantProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </TenantProvider>
  );
}

export default App;
