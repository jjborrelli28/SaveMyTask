import { useAuthentication } from '@context/authentication';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuthentication();

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
