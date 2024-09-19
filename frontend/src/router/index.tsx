import MainLayout from '@/components/main-layout';
import PrivateRoutes from '@/components/private-routes';
import NotFoundPage from '@/pages/404-page';
import Dashboard from '@/pages/dashboard';
import Homepage from '@/pages/homepage';
import MyAccount from '@/pages/my-account';
import SignIn from '@/pages/sing-in';
import SignUp from '@/pages/sing-up';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        { path: '/', element: <Homepage /> },
        { path: '/sign-in', element: <SignIn /> },
        { path: '/sign-up', element: <SignUp /> },
        {
          element: <PrivateRoutes />,
          children: [
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/my-account', element: <MyAccount /> }
          ]
        },
        { path: '*', element: <NotFoundPage /> }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
