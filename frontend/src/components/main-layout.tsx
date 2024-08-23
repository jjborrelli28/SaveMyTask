import { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';
import { NewUserContextProvider } from '@context/new-user';

const MainLayout = ({ children }: { children: ReactNode }) => (
  <NewUserContextProvider>
    <div className="flex min-h-screen flex-col justify-between">
      <Header />
      <main className="container flex-1">{children}</main>
      <Footer />
    </div>
  </NewUserContextProvider>
);
export default MainLayout;
