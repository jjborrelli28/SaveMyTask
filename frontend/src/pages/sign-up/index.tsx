import { useContext } from 'react';
import Confetti from 'react-confetti';
import NewUserContext from '../../context/new-user';
import CreateUserForm from './components/create-user-form';

const SingUp = () => {
  const { newUser } = useContext(NewUserContext);

  const { formState } = newUser;

  return (
    <>
      <div className="relative flex min-h-screen-with-navbar flex-col items-center justify-center gap-8 py-8 lg:gap-16 lg:pb-20 lg:pt-16">
        <div
          id="card"
          className="flex w-96 flex-col gap-12 border-2 border-gray p-10 shadow-lg"
        >
          <h2 className="text-3xl font-bold">Sign up</h2>
          <CreateUserForm />
        </div>
      </div>
      {formState === 'Successful' && <Confetti />}
    </>
  );
};

export default SingUp;
