// User
export type GetAuthenticationResponse =
  | {
      isAuthenticated: boolean;
      message: string;
    }
  | undefined;

export type GetAuthentication = () => Promise<GetAuthenticationResponse>;

export type LoginUserData = { username: string; password: string };

export type LoginUserResponse = { message: string; userId: number } | undefined;

export type LoginUser = (userData: LoginUserData) => Promise<LoginUserResponse>;

export type LogoutUser = () => Promise<{ message: string } | undefined>;

export type NewUserData = {
  username: string;
  password: string;
  email: string;
  full_name: string;
};

export type GetUserResponse =
  | { user: Omit<NewUserData, 'password'>; message: string }
  | undefined;

export type GetUser = () => Promise<GetUserResponse>;

export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  full_name: string;
  created_at: Date;
};

export type CreateUserResponse =
  | { message: string; user: Omit<User, 'password'> }
  | undefined;

export type CreateUser = (userData: NewUserData) => Promise<CreateUserResponse>;

export type UserUpdateData = {
  username?: string;
  password?: string;
  email?: string;
  full_name?: string;
  confirmationPassword: string;
};

export type UpdateUserResponse =
  | {
      user: Omit<NewUserData, 'password'>;
      message: string;
    }
  | undefined;

export type UpdateUser = (
  userData: UserUpdateData
) => Promise<UpdateUserResponse>;

export type DeleteUserResponse = { message: string } | undefined;

export type DeleteUser = (userData: {
  password: string;
}) => Promise<DeleteUserResponse>;

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

export type GetTasksResponse =
  | {
      items: Task[];
      page: number;
      limit: number;
      hasNextPage: number;
      totalItems: Task[];
      message: string;
    }
  | undefined;

export type TaskQueryParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export type GetTasks = (
  queries?: TaskQueryParams | undefined
) => Promise<GetTasksResponse>;

export type CreateTaskResponse = { newTask: Task; message: string } | undefined;

export type NewTaskData = {
  title: string;
};

export type CreateTask = (
  taskData: NewTaskData
) => Promise<CreateTaskResponse | undefined>;

export type UpdateTaskResponse =
  | {
      updatedTask: Task;
      message: string;
    }
  | undefined;

export type TaskUpdateData = {
  title?: string;
  state?: TaskStates;
};

export type UpdateTaskParams = {
  id: number;
  taskData: TaskUpdateData;
};

export type UpdateTask = (
  taskData: UpdateTaskParams
) => Promise<UpdateTaskResponse>;

export type DeleteTaskResponse =
  | { deletedTask: Task; message: string }
  | undefined;

export type DeleteTask = (id: number) => Promise<DeleteTaskResponse>;
