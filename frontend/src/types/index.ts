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

export type CreateUserResponse =
  | { message: string; token: string; newUser: User }
  | undefined;

export type CreateUser = (data: NewUserData) => Promise<CreateUserResponse>;

export type LoginUserData = { username: string; password: string };

export type LoginUserResponse =
  | { message: string; userId: number; token: string }
  | undefined;

export type LoginUser = (data: LoginUserData) => Promise<LoginUserResponse>;

export type GetUserResponse = { user: User; message: string } | undefined;

export type GetUser = () => Promise<GetUserResponse>;

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

export type Tasks = {
  currentPage: number;
  hasNextPage: boolean;
  tasks: Task[];
  tasksPerPage: number;
  totalPages: number;
  totalTasks: number;
};

export type GetTasksResponse =
  | (Tasks & {
      message: string;
    })
  | undefined;

export type TaskQueries = {
  search?: string;
  page?: number;
  limit?: number;
};

export type GetTasks = (
  queries?: TaskQueries | undefined
) => Promise<GetTasksResponse>;

export type CreateTaskResponse = { newTask: Task; message: string };

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
