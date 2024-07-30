import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../components/main-layout";
import Homepage from "../pages/homepage";
import Dashboard from "../pages/dashboard";

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
