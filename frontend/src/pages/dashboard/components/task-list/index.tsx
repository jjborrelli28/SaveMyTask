import { useCallback, useContext, useEffect } from 'react';
import { FaListUl } from 'react-icons/fa';
import Spinner from '../../../../components/spinner';
import TaskContext from '../../../../context/task';
import useIntersectionObserver from '../../../../hooks/use-intersection-obeserver';
import useWebSocket from '../../../../hooks/use-web-socket';
import { getTaskList } from '../../../../services';
import { WebSocketMessage } from '../../../../types';
import TaskCard from '../task-card';
import Search from './components/search';
import Skeleton from './components/skeleton';

const TaskList = () => {
  const { task, setTask } = useContext(TaskContext);
  const { ref, isVisible } = useIntersectionObserver({
    rootMargin: '198px',
    threshold: 0.1
  });

  const handleWebSocketMessage = useCallback((message: WebSocketMessage) => {
    switch (message.type) {
      case 'UPDATE_TASK_LIST':
        console.log(message.list);
        setTask(prevState => ({ ...prevState, list: message.list }));
        break;
      default:
        break;
    }
  }, []);

  useWebSocket(handleWebSocketMessage);

  const loadMoreTasks = useCallback(async () => {
    setTask(prevState => ({ ...prevState, isLoadingNextPage: true }));

    try {
      const { list, currentPage, hasNextPage } = await getTaskList({
        search: task.search,
        currentPage: task.currentPage + 1,
        tasksPerPage: task.tasksPerPage
      });

      setTask(prevState => ({
        ...prevState,
        list,
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
  }, [task.currentPage]);

  useEffect(() => {
    if (isVisible && task.hasNextPage) {
      loadMoreTasks();
    }
  }, [isVisible]);

  return (
    <div className="lg:order-0 order-1 flex flex-col gap-5 border-b-2 border-gray pb-5 lg:border-b-0 lg:border-r-2 lg:px-10 lg:pb-10">
      <div className="flex items-center justify-between gap-5">
        <h2 className="flex items-center gap-2 text-nowrap text-2xl font-semibold">
          <FaListUl />
          Task list
        </h2>
        {task.list && <Search />}
      </div>
      {task.isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      ) : task.list ? (
        <>
          <ul className="flex flex-col gap-5">
            {task.list.map((t, i) => (
              <TaskCard
                key={i}
                data={t}
                ref={i === task.list.length - 1 ? ref : undefined}
              />
            ))}
            {task.isLoadingNextPage && <Skeleton />}
          </ul>
        </>
      ) : (
        <div className="flex flex-1 items-center py-10">
          <p className="text-xl font-semibold">
            You have no tasks on your list
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
