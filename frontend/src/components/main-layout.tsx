import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

const MainLayout = ({ children }: { children: ReactNode }) => (
  <main>
    <Header />
    {children}
    <Footer />
  </main>
);

export default MainLayout;
