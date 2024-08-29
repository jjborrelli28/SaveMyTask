import Login from './components/login';
import SingUp from './components/sing-up';

const Homepage = () => {
  return (
    <div className="flex min-h-screen-with-navbar flex-col items-center justify-center gap-8 py-8 lg:gap-16 lg:pb-20 lg:pt-16">
      <SingUp />
      <Login />
    </div>
  );
};

export default Homepage;
