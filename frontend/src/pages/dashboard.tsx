import TaskCard from '../components/task-card';
import { useFetch } from '../hooks/use-fetch';
import { Task } from '../types';

const Dashboard = () => {
  const tasks = useFetch('http://localhost:4000/api/tasks') as Task[] | null;

  return (
    <div className="flex flex-col gap-16 pb-20 pt-16">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-5 border-r-2 border-gray px-5 pb-5">
          <h2 className="text-2xl font-semibold">Task list</h2>
          <ul className="flex flex-col gap-5">
            {tasks?.map((task, i) => <TaskCard key={i} data={task} />)}
          </ul>
        </div>
        <div className="flex flex-col p-5"></div>
      </div>
    </div>
  );
};

export default Dashboard;
