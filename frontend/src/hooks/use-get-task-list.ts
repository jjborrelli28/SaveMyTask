import { useEffect, useState } from 'react';
import { getTasks } from '../services';
import { Task } from '../types';

const useGetTaskList = () => {
  const [taskList, setTaskList] = useState<Task[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTaskList = async () => {
    setIsLoading(true);
    try {
      const tasks = (await getTasks()) || null;
      setTaskList(tasks);
    } catch (error) {
      if (import.meta.env.VITE_ENV === 'development')
        console.error('Error getting task list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return { isLoading, setIsLoading, taskList, setTaskList };
};

export default useGetTaskList;
