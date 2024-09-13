import Spinner from '@components/spinner';
import SubmitMessage from '@components/submit-message';
import { initialQueryParams } from '@context/task-query-params';
import getFilteredTasks from '@helpers/get-filtered-tasks';
import { getTasks } from '@services/task';
import { getUser } from '@services/user';
import { useQuery } from '@tanstack/react-query';
import { MdCircle } from 'react-icons/md';

const TaskSumary = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['task'],
    queryFn: () => getTasks(initialQueryParams)
  });

  const {
    isLoading: userDataIsLoading,
    data: userData,
    isError: userDataIsError,
    error: userDataError
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  if (isLoading || userDataIsLoading) return <Spinner />;
  if (isError || userDataIsError)
    return (
      <SubmitMessage type="Error">
        {error?.message || userDataError?.message}
      </SubmitMessage>
    );

  const { totalItems } = data!;
  const { full_name } = userData?.user!;

  const todoTasks = getFilteredTasks(totalItems, 'To do');
  const inProgressTasks = getFilteredTasks(totalItems, 'In progress');
  const doneTasks = getFilteredTasks(totalItems, 'Done');

  return (
    <div className="flex flex-1 flex-col gap-10 pb-5 lg:border-r-2 lg:border-gray lg:px-10 lg:pb-10">
      <h2 className="text-2xl font-semibold">
        {`Welcome ${full_name},`}
        <br />
        this is your current task status:
      </h2>
      <div className="flex flex-col gap-y-5 text-xl">
        <div className="flex items-center gap-3 bg-gray p-3 shadow-md lg:justify-center">
          <MdCircle
            size={20}
            className="rounded-full border-2 text-orange shadow-md"
          />
          <p className="font-semibold text-orange">
            Pending tasks: {todoTasks?.length}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-gray p-3 shadow-md lg:justify-center">
          <MdCircle
            size={20}
            className="rounded-full border-2 text-yellow shadow-md"
          />
          <p className="font-semibold text-yellow">
            Tasks in process: {inProgressTasks?.length}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-gray p-3 shadow-md lg:justify-center">
          <MdCircle
            size={20}
            className="rounded-full border-2 text-green shadow-md"
          />
          <p className="font-semibold text-green">
            Completed tasks: {doneTasks?.length}
          </p>
        </div>
      </div>
      <p className="text-xl font-semibold">Total tasks: {totalItems.length}</p>
    </div>
  );
};

export default TaskSumary;
