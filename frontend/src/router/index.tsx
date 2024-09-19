import MainLayout from '@/components/main-layout';
import PrivateRoutes from '@/components/private-routes';
import Dashboard from '@/pages/dashboard';
import Homepage from '@/pages/homepage';
import Login from '@/pages/login';
import MyAccount from '@/pages/my-account';
import SignUp from '@/pages/sing-up';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        { path: '/', element: <Homepage /> },
        { path: '/login', element: <Login /> },
        { path: '/sign-up', element: <SignUp /> },
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
