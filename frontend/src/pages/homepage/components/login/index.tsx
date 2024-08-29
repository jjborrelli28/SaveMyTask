import LoginForm from './components/login-form';

const Login = () => (
  <div className="flex w-96 flex-col gap-12 border-2 border-gray p-10 shadow-lg">
    <h2 className="text-3xl font-bold">Sign in</h2>
    <div className="flex flex-col gap-3">
      <LoginForm />
    </div>
  </div>
);

export default Login;
