import Spinner from '@components/spinner';
import { getUser } from '@services/user';
import { useQuery } from '@tanstack/react-query';

export const UserData = () => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: 10
  });

  if (!data?.user) return <Spinner />;

  const { username, password, email, full_name } = data.user;

  return (
    <div className="order-0 relative flex flex-col gap-10 pb-10 lg:order-1 lg:px-10">
      <h2 className="text-2xl font-semibold">My information</h2>
      <div>Building...</div>
    </div>
  );
};

export default UserData;
