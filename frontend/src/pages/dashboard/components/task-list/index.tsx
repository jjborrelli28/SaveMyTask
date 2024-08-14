import { useCallback, useContext, useEffect, useState } from 'react';
import { FaListUl } from 'react-icons/fa';
import Spinner from '../../../../components/spinner';
import TaskContext from '../../../../context/task';
import useIntersectionObserver from '../../../../hooks/use-intersection-obeserver';
import useLoadMoreTasks from '../../../../hooks/use-load-more-tasks';
import useWebSocket from '../../../../hooks/use-web-socket';
import { WebSocketMessage } from '../../../../types';
import TaskCard from '../task-card';
import Search from './components/search';
import Skeleton from './components/skeleton';

const TaskList = () => {
  const { task, setTask } = useContext(TaskContext);
  const [taskListIsLoaded, setTaskListIsLoaded] = useState(false);
  const { ref: lastTaskRef, isVisible: lastTaskIsVisible } =
    useIntersectionObserver({
      rootMargin: '198px',
      threshold: 0.1
    });

  const handleWebSocketMessage = useCallback((message: WebSocketMessage) => {
    switch (message.type) {
      case 'UPDATE_TASK_LIST':
        setTask(prevState => ({ ...prevState, list: message.list }));
        break;
      default:
        break;
    }
  }, []);

  useWebSocket(handleWebSocketMessage);

  const loadMoreTasks = useLoadMoreTasks();

  useEffect(() => {
    setTaskListIsLoaded(true);
  }, [task.list]);

  useEffect(() => {
    if (lastTaskIsVisible && task.hasNextPage) {
      loadMoreTasks();
    }
  }, [taskListIsLoaded, lastTaskIsVisible]);

  return (
    <div className="lg:order-0 order-1 flex flex-1 flex-col gap-5 pb-5 lg:border-r-2 lg:border-gray lg:px-10 lg:pb-10">
      <div className="mb-2.5 flex items-center justify-between gap-5 lg:mb-5">
        <h2 className="flex items-center gap-2 text-nowrap text-2xl font-semibold">
          <FaListUl />
          Task list
        </h2>
        {task.totalTasks > 1 && <Search />}
      </div>
      {task.isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner />
        </div>
      ) : task.list ? (
        <>
          <ul className="flex flex-col gap-5">
            {task.list.map((t, i) => (
              <TaskCard
                key={i}
                data={t}
                ref={i === task.list.length - 1 ? lastTaskRef : undefined}
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
