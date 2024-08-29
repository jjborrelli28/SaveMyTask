import MainLayout from '@components/main-layout';
import PrivateRoute from '@components/private-route';
import { AuthenticationContextProvider } from '@context/authentication';
import Dashboard from '@pages/dashboard';
import Homepage from '@pages/homepage';
import Login from '@pages/login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const SaveMyTask = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationContextProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </AuthenticationContextProvider>
    </QueryClientProvider>
  );
};

export default SaveMyTask;
