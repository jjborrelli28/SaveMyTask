import useNavigateToDashboard from '@hooks/use-navigate-to-dashboard';
import FlipCard from './components/flip-card';

const Login = () => {
  useNavigateToDashboard();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-y-9 py-20 lg:gap-y-12 lg:pb-24 lg:pt-44">
      <a href="/" aria-label="homepage" className="absolute left-0 top-5">
        <div className="flex items-center gap-2">
          <img src="src/assets/logo.png" className="h-8" />
          <span className="text-text text-lg font-bold">SaveMyTask</span>
        </div>
      </a>
      <div className="flex flex-col items-center justify-center gap-y-6 text-center xl:gap-y-0">
        <FlipCard />
      </div>
    </div>
  );
};

export default Login;
