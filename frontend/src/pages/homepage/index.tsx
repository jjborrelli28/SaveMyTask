import Button from '@/components/button';
import useNavigateToDashboard from '@/hooks/use-navigate-to-dashboard';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  useNavigateToDashboard();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/sign-in');
  };

  return (
    <div className="flex h-screen-with-navbar flex-col items-center justify-center gap-y-12">
      <div className="flex flex-col items-center justify-center gap-y-6 text-center xl:gap-y-0">
        <h1 className="bg-gradient-to-r from-blue-400 via-purple-500 to-violet-600 bg-clip-text text-6xl font-bold text-transparent lg:text-7xl">
          Welcome to SaveMyTask
        </h1>
        <p className="w-4/5 tracking-wide md:w-3/5 lg:text-xl xl:w-full">
          The ultimate tool to manage your tasks and boost your productivity.
          Start organizing your life today.
        </p>
      </div>
      <Button onClick={handleClick}>Get Started</Button>
    </div>
  );
};

export default Homepage;
