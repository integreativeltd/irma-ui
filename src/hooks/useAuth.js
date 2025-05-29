// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // must match the export above

export function useAuth() {
  return useContext(AuthContext);
}
