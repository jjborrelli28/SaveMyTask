import { useCallback, useContext } from 'react';
import { FaListUl } from 'react-icons/fa';
import Spinner from '../../../../components/spinner';
import TaskContext from '../../../../context/task';
import useWebSocket from '../../../../hooks/use-web-socket';
import { WebSocketMessage } from '../../../../types';
import TaskCard from '../task-card';
import Search from './components/search';

const TaskList = () => {
  const { task, setTask } = useContext(TaskContext);

  const handleWebSocketMessage = useCallback(
    (message: WebSocketMessage) => {
      switch (message.type) {
        case 'UPDATE_TASK_LIST':
          console.log(message.list);
          setTask(prevState => ({ ...prevState, list: message.list }));
          break;
        default:
          break;
      }
    },
    [setTask]
  );

  useWebSocket(handleWebSocketMessage);

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
        <ul className="flex flex-col gap-5">
          {task.list.map((task, i) => (
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
