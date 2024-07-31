import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/main-layout';
import { TaskListContext } from '../contexts/tasks';
import Dashboard from '../pages/dashboard';
import Homepage from '../pages/homepage';

const Router = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default Router;
