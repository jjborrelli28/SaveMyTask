import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { getAllTasks } from '../services';
import { Task } from '../types';

export const TaskList = createContext<{
  tasks?: Task[] | undefined;
  setTasks?: Dispatch<SetStateAction<Task[] | undefined>>;
  removeTask?: (id: number) => Promise<void>;
}>({});

export const TaskListContext = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

  useEffect(() => {
    const getTaskList = async () => {
      const taskList = await getAllTasks();
      setTasks(taskList);
    };

    getTaskList();
  }, []);

  return (
    <TaskList.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskList.Provider>
  );
};
