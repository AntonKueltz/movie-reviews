import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function getUsernameFromToken(token) {
    return token ? token.split(".")[0] : "";
}