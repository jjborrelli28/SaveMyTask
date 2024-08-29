import Spinner from '@components/spinner';
import { useTaskQueries } from '@context/task-queries';
import { getTasks } from '@services/task';
import { useQuery } from '@tanstack/react-query';
import { FaListUl } from 'react-icons/fa';
import TaskCard from '../task-card';
import Search from './components/search';
import { useAuthentication } from '@context/authentication';

const TaskList = () => {
  const { isAuthenticated } = useAuthentication();
  const { taskQueries } = useTaskQueries();
  const { data, isLoading } = useQuery({
    queryKey: ['task', taskQueries],
    queryFn: () => getTasks(taskQueries),
    retry: 10,
    enabled: isAuthenticated
  });

  return (
    <div className="lg:order-0 order-1 flex flex-1 flex-col gap-5 pb-5 lg:border-r-2 lg:border-gray lg:px-10 lg:pb-10">
      <div className="mb-2.5 flex items-center justify-between gap-5 lg:mb-5">
        <h2 className="flex items-center gap-2 text-nowrap text-2xl font-semibold">
          <FaListUl className="hidden sm:block" />
          Task list
        </h2>
        <Search />
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner />
        </div>
      ) : data?.tasks ? (
        <>
          <ul className="flex flex-col gap-5">
            {data.tasks.map(task => (
              <TaskCard key={task.id} data={task} />
            ))}
          </ul>
        </>
      ) : (
        <div className="flex flex-1 items-center py-10">
          <p className="text-xl font-semibold">
            You have no tasks on your list
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
