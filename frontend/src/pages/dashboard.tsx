import { useFetch } from "../hooks/use-fetch";
import { Task } from "../types";

const Dashboard = () => {
  const tasks = useFetch("http://localhost:4000/api/tasks") as Task[] | null;

  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <h2>Task list:</h2>
        <ol>
          {tasks?.map((task, i) => (
            <li key={i}>
              <p>{task.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default Dashboard;
