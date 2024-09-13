import useNavigateToDashboard from '@hooks/use-navigate-to-dashboard';
import { useNavigate } from 'react-router-dom';
import LogInForm from './components/login-form';

const Login = () => {
  useNavigateToDashboard();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/sign-up');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-9 py-20 lg:gap-y-12 lg:pb-24 lg:pt-44">
      <div className="flex w-96 flex-col gap-12 border-2 border-gray p-10 shadow-lg">
        <h2 className="text-left text-3xl font-bold">Sign in</h2>
        <div className="flex flex-col gap-3">
          <LogInForm />
          <p className="text-left text-sm">
            Is this your first time at <b>SaveMyTask</b>? Create an account by
            clicking{' '}
            <button
              onClick={handleClick}
              className="font-semibold text-lilac underline"
            >
              here
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
