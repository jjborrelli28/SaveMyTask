import useNavigateToDashboard from '@/hooks/use-navigate-to-dashboard';
import SignUpForm from './components/sign-up-form';

const SignUp = () => {
  useNavigateToDashboard();

  return (
    <div className="flex min-h-screen-with-navbar flex-col items-center justify-center pb-[128px] pt-[64px]">
      <div className="border-gray-200 flex w-96 flex-col gap-y-12 border-2 p-10 shadow-lg">
        <h2 className="bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-left text-3xl font-bold text-transparent">
          Sign up
        </h2>
        <div className="flex flex-col gap-3">
          <SignUpForm />
          <p className="text-xs">
            <span className="bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text font-semibold text-transparent">
              SaveMyTasks
            </span>{' '}
            collects your username, password and name only to create your
            account and allow you to save your tasks. This data will not be used
            for any other purpose.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
