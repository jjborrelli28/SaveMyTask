import { useCallback, useContext } from 'react';
import TaskContext from '../context/task';
import { getTaskList } from '../services/tasks';

const useLoadMoreTasks = () => {
  const { task, setTask } = useContext(TaskContext);

  const loadMoreTasks = useCallback(async () => {
    setTask(prevState => ({ ...prevState, isLoadingNextPage: true }));

    try {
      const { list, totalTasks, currentPage, hasNextPage } = await getTaskList({
        search: task.search,
        currentPage: task.currentPage + 1,
        tasksPerPage: task.tasksPerPage
      });

      setTask(prevState => ({
        ...prevState,
        list,
        totalTasks,
        currentPage,
        hasNextPage
      }));
    } catch (error) {
      if (import.meta.env.VITE_ENV === 'development')
        console.error('Error getting task list:', error);
    } finally {
      setTask(prevState => ({
        ...prevState,
        isLoadingNextPage: false
      }));
    }
  }, [task.currentPage, task.search, task.tasksPerPage]);

  return loadMoreTasks;
};

export default useLoadMoreTasks;
