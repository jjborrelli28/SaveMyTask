import { Dispatch, RefObject, SetStateAction } from 'react';

export type Task = {
  id: number;
  description: string;
  state: TaskStates;
  user_id: number;
  created_at: Date;
  updated_at: Date;
};

export type TaskStates = 'To do' | 'In progress' | 'Done';

type TaskContext = {
  isLoading: boolean;
  search: string;
  list: Task[];
  totalTasks: number;
  currentPage: number;
  tasksPerPage: number;
  hasNextPage: boolean;
  isLoadingNextPage: boolean;
};

export type TaskContextProps = {
  task: TaskContext;
  setTask: Dispatch<SetStateAction<TaskContext>>;
};

export type WebSocketMessage = {
  type: 'UPDATE_TASK_LIST';
  list: Task[];
};

export type Queries = {
  search?: string;
  currentPage?: number;
  tasksPerPage?: number;
};

export type TaskListData = {
  list: Task[];
  totalTasks: number;
  currentPage: number;
  tasksPerPage: number;
  hasNextPage: boolean;
};

export type TaskCreationBody = {
  description: string;
  user_id: number;
};

export type TaskUpdatingBody = {
  id: number;
  description?: string;
  state?: TaskStates;
};

export type TaskCardAccordionStates = 'Opened' | 'Closed';

export type TaskCardAccordion = { data: Task; state: TaskCardAccordionStates };

export type UseIntersectionObserver = (options?: IntersectionObserverInit) => {
  ref: RefObject<HTMLLIElement>;
  isVisible: boolean;
};
