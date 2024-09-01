import { AuthenticationContextProvider } from '@context/authentication';
import Router from '@router/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const SaveMyTask = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationContextProvider>
        <Router />
      </AuthenticationContextProvider>
    </QueryClientProvider>
  );
};

export default SaveMyTask;
