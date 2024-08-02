import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import {
  createTask as createTaskService,
  getAllTasks,
  removeTask as removeTaskService,
  updateTask as updateTaskService
} from '../services';
import { Task, TaskCreationBody, TaskUpdateBody } from '../types';

export const Tasks = createContext<{
  tasks?: Task[] | undefined;
  setTasks?: Dispatch<SetStateAction<Task[] | undefined>>;
  areLoadingTasks?: boolean;
  createTask?: (taskBody: TaskCreationBody) => Promise<void>;
  updateTask?: (id: number, body: TaskUpdateBody) => Promise<void>;
  removeTask?: (id: number) => Promise<void>;
}>({});

const TasksContext = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);
  const [areLoadingTasks, setAreLoadingTasks] = useState<boolean>(false);

  useEffect(() => {
    const getTaskList = async () => {
      setAreLoadingTasks(true);

      try {
        const taskList = await getAllTasks();
        setTasks(taskList);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setAreLoadingTasks(false);
      }
    };

    getTaskList();
  }, []);

  const createTask = async (taskBody: TaskCreationBody) => {
    await createTaskService(taskBody);
    const taskListUpdated = await getAllTasks();
    setTasks(taskListUpdated);
  };

  const updateTask = async (id: number, body: TaskUpdateBody) => {
    await updateTaskService(id, body);
    const taskListUpdated = await getAllTasks();
    setTasks(taskListUpdated);
  };

  const removeTask = async (taskId: number) => {
    await removeTaskService(taskId);
    const taskListUpdated = await getAllTasks();
    setTasks(taskListUpdated);
  };

  return (
    <Tasks.Provider
      value={{
        tasks,
        setTasks,
        areLoadingTasks,
        createTask,
        updateTask,
        removeTask
      }}
    >
      {children}
    </Tasks.Provider>
  );
};

export default TasksContext;
