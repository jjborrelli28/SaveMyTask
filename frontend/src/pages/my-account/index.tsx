import { TaskQueriesContextProvider } from '@context/task-queries';
import { MdDashboard, MdPerson } from 'react-icons/md';

const MyAccount = () => {
  return (
    <TaskQueriesContextProvider>
      <div className="flex min-h-screen-with-navbar flex-col gap-8 py-8 lg:gap-16 lg:pb-20 lg:pt-16">
        <h1 className="flex items-center gap-2 text-4xl font-bold">
          <MdPerson />
          My Account
        </h1>
        <div className="grid h-full grid-cols-1 grid-rows-[auto,_1fr] gap-8 pt-5 lg:grid-cols-2 lg:grid-rows-1 lg:gap-0 lg:pt-0"></div>
      </div>
    </TaskQueriesContextProvider>
  );
};

export default MyAccount;
