// src/context/TenantContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTenantFromSubdomain } from '../utils/tenantResolver';

const TenantContext = createContext('default');

export const TenantProvider = ({ children }) => {
  const [tenant, setTenant] = useState('default');

  useEffect(() => {
    const tenantId = getTenantFromSubdomain();
    setTenant(tenantId);
  }, []);

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);
