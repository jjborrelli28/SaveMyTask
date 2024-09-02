import { useAuthentication } from '@context/authentication';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuthentication();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
