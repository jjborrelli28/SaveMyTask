import CreateUserForm from './components/create-user-form';
import Disclaimer from './components/disclaimer';

const SingUp = () => (
  <div className="flex w-96 flex-col gap-12 border-2 border-gray p-10 shadow-lg">
    <h2 className="text-3xl font-bold">Sign up</h2>
    <div className="flex flex-col gap-3">
      <CreateUserForm />
      <Disclaimer />
    </div>
  </div>
);

export default SingUp;
