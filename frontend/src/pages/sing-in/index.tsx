import useNavigateToDashboard from '@/hooks/use-navigate-to-dashboard';
import { useNavigate } from 'react-router-dom';
import SignInForm from './components/sign-in-form';

const SignIn = () => {
  useNavigateToDashboard();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/sign-up');
  };

  return (
    <div className="flex min-h-screen-with-navbar flex-col items-center justify-center py-[64px]">
      <div className="border-gray-200 flex w-96 flex-col gap-y-12 border-2 p-10 shadow-lg">
        <h2 className="bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-left text-3xl font-bold text-transparent">
          Sign in
        </h2>
        <div className="flex flex-col gap-3">
          <SignInForm />
          <p className="text-left text-xs">
            Is this your first time at{' '}
            <span className="bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text font-semibold text-transparent">
              SaveMyTask
            </span>
            ? Create an account by clicking{' '}
            <button
              onClick={handleClick}
              className="font-semibold text-blue-500 underline"
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

export default SignIn;
