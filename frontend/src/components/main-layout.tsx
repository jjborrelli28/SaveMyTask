import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

const MainLayout = () => {
  return (
    <div className="flex flex-col justify-between">
      <Header />
      <main className="container flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
