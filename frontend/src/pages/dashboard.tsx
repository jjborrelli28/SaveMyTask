import { useContext } from 'react';
import TaskCard from '../components/task-card';
import TaskCreatorForm from '../components/task-creator-form';
import { Tasks } from '../contexts/tasks';

const Dashboard = () => {
  const { tasks } = useContext(Tasks);

  return (
    <div className="flex flex-col gap-8 py-8 lg:gap-16 lg:pb-20 lg:pt-16">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 grid-rows-[auto,_1fr] gap-8 lg:grid-cols-2 lg:grid-rows-1 lg:gap-0">
        <div className="flex flex-col gap-5 border-b-2 border-gray pb-5 lg:border-b-0 lg:border-r-2 lg:px-10 lg:pb-10">
          <h2 className="text-2xl font-semibold underline decoration-lilac decoration-2 underline-offset-8">
            Task list
          </h2>
          {tasks ? (
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
        <div className="flex flex-col py-10 lg:px-10">
          <TaskCreatorForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
