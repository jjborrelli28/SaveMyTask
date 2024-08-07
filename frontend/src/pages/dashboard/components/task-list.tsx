import { useCallback } from 'react';
import Spinner from '../../../components/spinner';
import useGetTaskList from '../../../hooks/use-get-task-list';
import useWebSocket from '../../../hooks/use-web-socket';
import { WebSocketMessage } from '../../../types';
import TaskCard from './task-card';

const TaskList = () => {
  const { isLoading, taskList, setTaskList } = useGetTaskList();

  const handleWebSocketMessage = useCallback(
    (message: WebSocketMessage) => {
      switch (message.type) {
        case 'TASK_LIST_UPDATE':
          setTaskList(message.taskList.reverse());
          break;
        default:
          break;
      }
    },
    [setTaskList]
  );

  useWebSocket(handleWebSocketMessage);

  return (
    <div className="lg:order-0 order-1 flex flex-col gap-5 border-b-2 border-gray pb-5 lg:border-b-0 lg:border-r-2 lg:px-10 lg:pb-10">
      <h2 className="text-2xl font-semibold underline decoration-lilac decoration-2 underline-offset-8">
        Task list
      </h2>
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      ) : taskList ? (
        <ul className="flex flex-col gap-5">
          {taskList.map((task, i) => (
            <TaskCard key={i} data={task} />
          ))}
        </ul>
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
