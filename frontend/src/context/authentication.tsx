import getAuthenticationToken from '@helpers/get-authentication-token';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { createContext, ReactNode, useContext, useState } from 'react';

type AuthenticationContextProps =
  | {
      isAuthenticated: boolean;
      token: string | undefined;
      login: (token: string) => void;
      logout: () => void;
    }
  | undefined;

export const authenticationCookieName = 'savemytask-authentication-token';

const AuthenticationContext =
  createContext<AuthenticationContextProps>(undefined);

export const AuthenticationContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [token, setToken] = useState<string | undefined>(
    getAuthenticationToken()
  );
  const queryClient = useQueryClient();

  const login = (newToken: string) => {
    Cookies.set(authenticationCookieName, newToken, { expires: 7 });
    setToken(newToken);
  };

  const logout = () => {
    queryClient.cancelQueries({ queryKey: ['task'] });
    queryClient.removeQueries({ queryKey: ['task'], type: 'active' });
    Cookies.remove(authenticationCookieName);
    setToken(undefined);
  };

  const isAuthenticated = !!token;

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, token, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      'useAuthentication must be used within an AuthenticationContextProvider'
    );
  }

  return context;
};
