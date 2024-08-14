import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/main-layout';
import Dashboard from '../pages/dashboard';
import Homepage from '../pages/homepage';
import SingUp from '../pages/sign-up';

const Router = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sing-up" element={<SingUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default Router;
