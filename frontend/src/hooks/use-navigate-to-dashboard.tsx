import { useAuthentication } from '@/context/authentication';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useNavigateToDashboard = () => {
  const { isAuthenticated } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
};

export default useNavigateToDashboard;
