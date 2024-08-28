import { NewUserCreated } from '@context/new-user-created';
import { useContext } from 'react';
import Confetti from 'react-confetti';
import SingUp from './components/sing-up';

const Homepage = () => {
  const { newUserCreated } = useContext(NewUserCreated);

  return (
    <>
      <div className="relative flex min-h-screen-with-navbar flex-col items-center justify-center gap-8 py-8 lg:gap-16 lg:pb-20 lg:pt-16">
        <SingUp />
      </div>
      {newUserCreated && <Confetti />}
    </>
  );
};

export default Homepage;
