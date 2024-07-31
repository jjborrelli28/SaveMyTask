import { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col justify-between">
    <Header />
    <main className="container flex-1">{children}</main>
    <Footer />
  </div>
);
export default MainLayout;
