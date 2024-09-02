import Spinner from '@components/spinner';
import getFilteredTasks from '@helpers/get-filtered-tasks';
import { getTasks } from '@services/task';
import { getUser } from '@services/user';
import { useQuery } from '@tanstack/react-query';
import { MdCircle } from 'react-icons/md';

const TaskSumary = () => {
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: 10
  });
  const { data: tasksData } = useQuery({
    queryKey: ['task'],
    queryFn: () => getTasks()
  });

  const userName = userData?.user.full_name;
  const allTasks = tasksData?.tasks;

  if (!userName || !allTasks) return <Spinner />;

  const todoTasks = getFilteredTasks(allTasks, 'To do');
  const inProgressTasks = getFilteredTasks(allTasks, 'In progress');
  const doneTasks = getFilteredTasks(allTasks, 'Done');

  return (
    <div className="lg:order-0 order-1 flex flex-1 flex-col gap-10 pb-5 lg:border-r-2 lg:border-gray lg:px-10 lg:pb-10">
      <h2 className="text-2xl font-semibold">
        {`Welcome ${userName},`}
        <br />
        this is your current task status:
      </h2>
      <div className="flex flex-col gap-y-5 text-xl">
        <div className="flex items-center gap-3 bg-gray p-3 shadow-md lg:w-fit">
          <MdCircle
            size={20}
            className="rounded-full border-2 text-orange shadow-md"
          />
          <p className="font-semibold text-orange">
            Pending tasks: {todoTasks?.length}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-gray p-3 shadow-md lg:w-fit">
          <MdCircle
            size={20}
            className="rounded-full border-2 text-yellow shadow-md"
          />
          <p className="font-semibold text-yellow">
            Tasks in process: {inProgressTasks?.length}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-gray p-3 shadow-md lg:w-fit">
          <MdCircle
            size={20}
            className="rounded-full border-2 text-green shadow-md"
          />
          <p className="font-semibold text-green">
            Completed tasks: {doneTasks?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskSumary;
