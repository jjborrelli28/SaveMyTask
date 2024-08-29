import { createContext, ReactNode, useContext, useState } from 'react';
import { TaskQueries, TaskQueriesContextProps } from '../types';

const initialTaskQueriesState = {
  search: '',
  page: 1
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
