import NewUserContext from '@context/new-user';
import { useContext } from 'react';
import Confetti from 'react-confetti';
import CreateUserForm from './components/sing-up/components/create-user-form';

const Homepage = () => {
  const { newUser } = useContext(NewUserContext);

  const { formState } = newUser;

  return (
    <>
      <div className="relative flex min-h-screen-with-navbar flex-col items-center justify-center gap-8 py-8 lg:gap-16 lg:pb-20 lg:pt-16">
        <div className="flex w-96 flex-col gap-12 border-2 border-gray p-10 shadow-lg">
          <h2 className="text-3xl font-bold">Sign up</h2>
          <CreateUserForm />
        </div>
      </div>
      {formState === 'Successful' && <Confetti />}
    </>
  );
};

export default Homepage;
