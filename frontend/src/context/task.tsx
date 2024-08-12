import { createContext, ReactNode, useEffect, useState } from 'react';
import { getTaskList as getTaskListService } from '../services';
import { Task, TaskContextProps } from '../types';

export const initialTaskState = {
  isLoading: false,
  search: '',
  list: [] as Task[],
  totalTasks: 0,
  currentPage: 1,
  tasksPerPage: 20,
  hasNextPage: false,
  isLoadingNextPage: false
};

const TaskContext = createContext<TaskContextProps>({
  task: initialTaskState,
  setTask: () => initialTaskState
});

export const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [task, setTask] = useState(initialTaskState);

  const getTaskList = async () => {
    const { search, currentPage, tasksPerPage } = task;

    setTask(prevState => ({ ...prevState, isLoading: true }));

    try {
      const { list, totalTasks, hasNextPage } = await getTaskListService({
        search,
        currentPage,
        tasksPerPage
      });
      setTask(prevState => ({ ...prevState, list, totalTasks, hasNextPage }));
    } catch (error) {
      if (import.meta.env.VITE_ENV === 'development')
        console.error('Error getting task list:', error);
    } finally {
      setTask(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <TaskContext.Provider value={{ task, setTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
