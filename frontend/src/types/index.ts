import { Dispatch, SetStateAction } from 'react';

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
  page: number;
  limit: number;
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
  page?: number;
  limit?: number;
};

export type TaskListData = { list: Task[]; page?: number; limit?: number };

export type TaskCreationBody = {
  description: string;
  user_id: number;
};

export type TaskUpdatingBody = {
  id: number;
  description?: string;
  state?: TaskStates;
};

export type AccordionStates = 'Opened' | 'Closed';
