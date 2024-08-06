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

export type TaskCreationBody = {
  description: string;
  user_id: number;
};

export type TaskUpdateBody = {
  description?: string;
  state?: TaskStates;
};

export type TasksProps = { isLoading?: boolean; list?: Task[] };

export type TasksContextProps = {
  tasks?: TasksProps;
  setTasks?: Dispatch<SetStateAction<TasksProps>>;
  createTask?: (taskBody: TaskCreationBody) => Promise<void>;
  updateTask?: (id: number, body: TaskUpdateBody) => Promise<void>;
  deleteTask?: (id: number) => Promise<void>;
};

export type AccordionStates = 'Opened' | 'Closed';
