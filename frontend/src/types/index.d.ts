import { MutationFunction } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

// User

export type NewUserStateContext = {
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  fullName: string | undefined;
  formState: 'Idle' | 'IsSending' | 'Successful' | 'Error';
  messageToShow: string | undefined;
};

export type NewUserContextProps = {
  newUser: NewUserStateContext;
  setNewUser: Dispatch<SetStateAction<NewUserStateContext>>;
};

export type NewUserField = {
  label: string;
  id: 'username' | 'password' | 'email' | 'fullName';
  type: string;
  validate: (value: string) => boolean;
  validationRequirements: string[];
};

export type NewUser = {
  username: string;
  password: string;
  email: string;
  full_name: string;
};

// Task
export type TaskStates = 'To do' | 'In progress' | 'Done';

export type Task = {
  id: number;
  title: string;
  state: TaskStates;
  user_id: number;
  created_at: Date;
  updated_at: Date;
};

export type TaskData = { data: Task | undefined };

export type Tasks = {
  currentPage: number;
  hasNextPage: boolean;
  tasks: Task[];
  tasksPerPage: number;
  totalPages: number;
  totalTasks: number;
};

export type TasksData = { data: Tasks | undefined };

export type TaskQueries = {
  search?: string;
  page?: number;
  limit?: number;
};

export type NewTaskData = {
  title: string;
  user_id: number;
};

export type GetTasks = (queries?: TaskQueries) => Promise<Tasks | undefined>;

export type CreateTask = (data: NewTaskData) => Promise<Task | undefined>;

export type TaskUpdateData = {
  title?: string;
  state?: TaskStates;
};

export type UpdateTaskParams = {
  id: number;
  data: TaskUpdateData;
};

export type UpdateTask = ({
  id,
  data
}: UpdateTaskParams) => Promise<Task | undefined>;

export type DeleteTask = (id: number) => Promise<number | undefined>;

export type UseTaskMutation =
  | MutationFunction<Task | undefined, { newTaskData: NewTaskData }>
  | undefined;

export type TaskCardInputStates = {
  value: string;
  isEditing: boolean;
};

export type TaskCardAccordionStates = 'Opened' | 'Closed';

export type TaskCardAccordion = { data: Task; state: TaskCardAccordionStates };

export type TaskQueriesContextProps = {
  taskQueries: TaskQueries;
  setTaskQueries: Dispatch<SetStateAction<TaskQueries>>;
};
