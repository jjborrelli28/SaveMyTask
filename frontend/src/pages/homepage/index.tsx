import Button from '@components/button';
import useNavigateToDashboard from '@hooks/use-navigate-to-dashboard';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  useNavigateToDashboard();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-9 lg:gap-y-12">
      <div className="flex flex-col items-center justify-center gap-y-6 text-center xl:gap-y-0">
        <h1 className="text-6xl font-bold lg:text-7xl">
          Welcome to <span className="text-lilac">SaveMyTask</span>
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
