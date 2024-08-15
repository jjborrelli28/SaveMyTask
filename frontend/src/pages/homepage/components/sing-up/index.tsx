import CreateUserForm from './components/create-user-form';

const SingUp = () => {
  return (
    <div className="flex w-96 flex-col gap-12 border-2 border-gray p-10 shadow-lg">
      <h2 className="text-3xl font-bold">Sign up</h2>
      <CreateUserForm />
    </div>
  );
};

export default SingUp;
