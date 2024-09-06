import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react';
import type { TaskQueryParams } from '../types';

export type TaskQueryParamsContextProps = {
  queryParams: TaskQueryParams;
  setQueryParams: Dispatch<SetStateAction<TaskQueryParams>>;
};

const initialQueryParams = {
  search: '',
  page: 1,
  limit: 20
};

const TaskQueryParamsContext = createContext<TaskQueryParamsContextProps>({
  queryParams: initialQueryParams,
  setQueryParams: () => initialQueryParams
});

export const TaskQueryParamsContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [queryParams, setQueryParams] =
    useState<TaskQueryParams>(initialQueryParams);

  return (
    <TaskQueryParamsContext.Provider value={{ queryParams, setQueryParams }}>
      {children}
    </TaskQueryParamsContext.Provider>
  );
};

export const useTaskQueryParams = () => {
  const context = useContext(TaskQueryParamsContext);

  if (!context) {
    throw new Error(
      'useTaskQueries must be used within an TaskQueriesContextProvider'
    );
  }

  return context;
};
