import { useContext } from 'react';
import { Tasks } from '../contexts/tasks';
import Spinner from './spinner';
import TaskCard from './task-card';

const TaskList = () => {
  const { tasks, areLoadingTasks } = useContext(Tasks);

  return (
    <div className="flex flex-col gap-5 border-b-2 border-gray pb-5 lg:border-b-0 lg:border-r-2 lg:px-10 lg:pb-10">
      <h2 className="text-2xl font-semibold underline decoration-lilac decoration-2 underline-offset-8">
        Task list
      </h2>
      {areLoadingTasks ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      ) : tasks ? (
        <ul className="flex flex-col gap-5">
          {tasks.map((task, i) => (
            <TaskCard key={i} data={task} />
          ))}
        </ul>
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
