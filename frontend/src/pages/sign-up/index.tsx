import { FaUserPlus } from 'react-icons/fa';
import { NewUserContextProvider } from '../../context/new-user';
import CreateUserForm from './components./create-user-form';

const SingUp = () => {
  return (
    <NewUserContextProvider>
      <div className="min-h-screen-with-navbar relative flex flex-col items-center justify-center gap-8 py-8 lg:gap-16 lg:pb-20 lg:pt-16">
        <h1 className="absolute left-0 top-16 flex items-center gap-2 text-4xl font-bold">
          <FaUserPlus /> Sign up
        </h1>
        <div
          id="card"
          className="flex w-96 flex-col gap-12 border-2 border-gray p-10 shadow-lg"
        >
          <h2 className="text-3xl font-bold">Create your account</h2>
          <CreateUserForm />
        </div>
      </div>
    </NewUserContextProvider>
  );
};

export default SingUp;
