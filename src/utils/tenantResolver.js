// src/utils/tenantResolver.js
export function getTenantFromSubdomain() {
    const host = window.location.hostname;
    const parts = host.split('.');
  
    if (parts.length >= 3) {
      return parts[0]; // e.g., 'firs' from 'firs.irma.gov.ng'
    }
  
    return 'default';
  }
  