import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { TaskQueries } from '../types';

export type TaskQueriesContextProps = {
  taskQueries: TaskQueries;
  setTaskQueries: Dispatch<SetStateAction<TaskQueries>>;
};

const initialTaskQueriesState = {
  search: '',
  page: 1,
  limit: 20
};

const TaskQueriesContext = createContext<TaskQueriesContextProps>({
  taskQueries: initialTaskQueriesState,
  setTaskQueries: () => initialTaskQueriesState
});

export const TaskQueriesContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [taskQueries, setTaskQueries] = useState<TaskQueries>(
    initialTaskQueriesState
  );

  return (
    <TaskQueriesContext.Provider value={{ taskQueries, setTaskQueries }}>
      {children}
    </TaskQueriesContext.Provider>
  );
};

export const useTaskQueries = () => {
  const context = useContext(TaskQueriesContext);

  if (!context) {
    throw new Error(
      'useTaskQueries must be used within an TaskQueriesContextProvider'
    );
  }

  return context;
};
