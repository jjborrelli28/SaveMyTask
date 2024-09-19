import { handleError } from '@helpers/handle-error';
import getAuthentication from '@services/authentication';
import { logoutUser } from '@services/user';
import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';

type AuthenticationContextProps =
  | {
      isAuthenticated: boolean;
      setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
      logout: () => Promise<void>;
    }
  | undefined;

const AuthenticationContext =
  createContext<AuthenticationContextProps>(undefined);

export const AuthenticationContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await getAuthentication();

        if (res?.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        handleError(error);
      }
    };

    checkAuthentication();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();

      queryClient.cancelQueries({ queryKey: ['task'] });
      queryClient.removeQueries({ queryKey: ['task'], type: 'active' });

      setIsAuthenticated(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
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
