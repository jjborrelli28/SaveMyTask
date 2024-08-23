import { createContext, ReactNode, useState } from 'react';
import { TaskQueries, TaskQueriesContextProps } from '@types';

const initialTaskQueriesState = {
  search: '',
  page: 1
};

export const TaskQueriesContext = createContext<TaskQueriesContextProps>({
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
