import { useContext } from 'react';
import TaskCard from '../components/task-card';
import TaskCreatorForm from '../components/task-creator-form';
import { Tasks } from '../contexts/tasks';

const Dashboard = () => {
  const { tasks } = useContext(Tasks);

  return (
    <div className="flex flex-col gap-16 pb-20 pt-16">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-5 border-r-2 border-gray px-5 pb-5">
          <h2 className="text-2xl font-semibold underline decoration-lilac decoration-2 underline-offset-8">
            Task list
          </h2>
          <ul className="flex flex-col gap-5 p-5">
            {tasks && tasks?.map((task, i) => <TaskCard key={i} data={task} />)}
          </ul>
        </div>
        <div className="flex flex-col p-5">
          <TaskCreatorForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
