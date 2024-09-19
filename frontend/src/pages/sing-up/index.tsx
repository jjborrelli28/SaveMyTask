import useNavigateToDashboard from '@/hooks/use-navigate-to-dashboard';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './components/sign-up-form';

const SignUp = () => {
  useNavigateToDashboard();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-9 py-20 lg:gap-y-12 lg:pb-24 lg:pt-44">
      <div className="flex w-96 flex-col gap-12 border-2 border-gray p-10 shadow-lg">
        <h2 className="text-left text-3xl font-bold">Sign up</h2>
        <div className="flex flex-col gap-3">
          <SignUpForm />
          <p className="text-xs">
            <span className="font-semibold text-lilac">SaveMyTasks</span>{' '}
            collects your username, password and name only to create your
            account and allow you to save your tasks. This data will not be used
            for any other purpose.
          </p>
          <p className="border-t-2 border-gray pt-3 text-left text-sm">
            Already have a <b>SaveMyTask</b> account?
            <br /> You can login by clicking{' '}
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

export default SignUp;
