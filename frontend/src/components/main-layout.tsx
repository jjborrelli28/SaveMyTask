import { useAuthentication } from '@context/authentication';
import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

const MainLayout = () => {
  const { isAuthenticated } = useAuthentication();

  return (
    <div className="flex min-h-screen flex-col justify-between">
      {isAuthenticated && <Header />}
      <main className="container flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
