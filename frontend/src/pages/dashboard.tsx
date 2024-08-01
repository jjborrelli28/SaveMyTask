import TaskCreatorForm from '../components/task-creator-form';
import TaskList from '../components/task-list';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 py-8 lg:gap-16 lg:pb-20 lg:pt-16">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 grid-rows-[auto,_1fr] gap-8 lg:grid-cols-2 lg:grid-rows-1 lg:gap-0">
        <TaskList />
        <TaskCreatorForm />
      </div>
    </div>
  );
};

export default Dashboard;
