import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

const MainLayout = ({ children }: { children: ReactNode }) => (
  <div>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);
export default MainLayout;
