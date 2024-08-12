import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);

  return (
    <div className="flex flex-col gap-8 pt-16">
      <h1 className="text-4xl font-bold">Homepage</h1>
    </div>
  );
};

export default Homepage;
