import { NewUserCreatedProvider } from '@context/new-user-created';
import { Fragment, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  const MainLayoutWrapper =
    pathname === '/' ? NewUserCreatedProvider : Fragment;

  return (
    <MainLayoutWrapper>
      <div className="flex min-h-screen flex-col justify-between">
        <Header />
        <main className="container flex-1">{children}</main>
        <Footer />
      </div>
    </MainLayoutWrapper>
  );
};
export default MainLayout;
