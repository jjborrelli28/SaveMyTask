import { FieldApi, ValidationError, Validator } from '@tanstack/react-form';
import { MutationFunction } from '@tanstack/react-query';
import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react';
import { ZodType, ZodTypeDef } from 'zod';

// User

export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  full_name: string;
  created_at: Date;
};

export type NewUserData = {
  username: string;
  password: string;
  email: string;
  full_name: string;
};

export type CreateUser = (
  data: NewUserData
) => Promise<{ message: string; token: string; newUser: User } | undefined>;

export type NewUserField = {
  label: string;
  id: 'username' | 'password' | 'email' | 'fullName';
  type: string;
  validate: (value: string) => boolean;
  validationRequirements: string[];
};

export type LoginUserData = { username: string; password: string };

export type LoginUser = (
  data: LoginUserData
) => Promise<{ message: string; userId: number; token: string } | undefined>;

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

// Components

export type InputStates =
  | 'initialState'
  | 'isHighlighted'
  | 'notValid'
  | 'isValid';

export type FieldLabel = {
  children: string;
  onFocus: boolean;
  value: string;
  inputState: InputStates;
};

export type FieldEyeButton = {
  inputState: InputStates;
  passwordIsVisible: boolean;
  setPasswordIsVisible: Dispatch<SetStateAction<boolean>>;
};

export type FieldErrorMessage = {
  name: string;
  errors: ValidationError[];
};

export type Fields<T extends string> = {
  name: T;
  type?: HTMLInputTypeAttribute;
}[];

export type CreateUserFieldNames =
  | 'username'
  | 'password'
  | 'email'
  | 'full_name';

type CreateUserFields = {
  username: string;
  password: string;
  email: string;
  full_name: string;
};

export type LoginFieldNames = 'username' | 'password';

type LoginFields = {
  username: string;
  password: string;
};

export type Field = {
  type?: HTMLInputTypeAttribute;
  data:
    | FieldApi<
        CreateUserFields,
        CreateUserFieldNames,
        Validator<unknown, ZodType<any, ZodTypeDef, any>>,
        Validator<CreateUserFields>,
        string
      >
    | FieldApi<
        LoginFields,
        LoginFieldNames,
        Validator<unknown, ZodType<any, ZodTypeDef, any>>,
        Validator<LoginFields>,
        string
      >;
};

export type SubmitButton = { isSendeable: boolean; isSubmitting: boolean };

export type NewUserCreatedContextProps = {
  newUserCreated: boolean;
  setNewUserCreated: Dispatch<SetStateAction<boolean>>;
};

export type AuthenticationContextProps =
  | {
      isAuthenticated: boolean;
      token: string | undefined;
      login: (token: string) => void;
      logout: () => void;
    }
  | undefined;
