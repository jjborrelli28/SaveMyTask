import { Dispatch, SetStateAction } from 'react';
import Disclaimer from './components/disclaimer';
import SignUpForm from './components/sign-up-form';

const SignUpCard = ({
  setIsFlipped
}: {
  setIsFlipped: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    setIsFlipped(prevState => !prevState);
  };

  return (
    <div className="flex w-96 flex-col gap-12 border-2 border-gray p-10 shadow-lg">
      <h2 className="text-3xl font-bold text-left">Sign up</h2>
      <div className="flex flex-col gap-3">
        <SignUpForm />
        <Disclaimer />
        <p className="text-left text-sm pt-3 border-t-2 border-gray">
          Already have a{' '}
          <span className="font-semibold text-lilac">SaveMyTask</span> account?
          You can login by clicking{' '}
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

export default SignUpCard;
