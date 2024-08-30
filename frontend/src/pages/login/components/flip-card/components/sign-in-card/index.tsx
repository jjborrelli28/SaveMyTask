import { Dispatch, SetStateAction } from 'react';
import SignInForm from './components/sign-in-form';

const SignInCard = ({
  setIsFlipped
}: {
  setIsFlipped: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    setIsFlipped(prevState => !prevState);
  };

  return (
    <div className="flex w-96 flex-col gap-12 border-2 border-gray p-10 shadow-lg">
      <h2 className="text-left text-3xl font-bold">Sign in</h2>
      <div className="flex flex-col gap-3">
        <SignInForm />
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
  );
};

export default SignInCard;
