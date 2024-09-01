import MainLayout from '@components/main-layout';
import { default as PrivateRoutes } from '@components/private-route';
import Dashboard from '@pages/dashboard';
import Homepage from '@pages/homepage';
import Login from '@pages/login';
import MyAccount from '@pages/my-account';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        { path: '/', element: <Homepage /> },
        { path: '/login', element: <Login /> },
        {
          element: <PrivateRoutes />,
          children: [
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/my-account', element: <MyAccount /> }
          ]
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
