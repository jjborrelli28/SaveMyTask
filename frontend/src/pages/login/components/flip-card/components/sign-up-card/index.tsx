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
      <h2 className="text-left text-3xl font-bold">Sign up</h2>
      <div className="flex flex-col gap-3">
        <SignUpForm />
        <Disclaimer />
        <p className="border-t-2 border-gray pt-3 text-left text-sm">
          Already have a <b>SaveMyTask</b> account? You can login by clicking{' '}
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
