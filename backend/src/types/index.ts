import {
  type ColumnType,
  type Generated,
  type Insertable,
  type Selectable,
  type Updateable,
} from "kysely";

export interface UserTable {
  id: Generated<number>;
  username: string;
  password: string;
  email: string;
  full_name: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface TaskTable {
  id: Generated<number>;
  title: string;
  state: "To do" | "In progress" | "Done";
  user_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, Date | undefined, Date>;
}

export type Task = Selectable<TaskTable>;
export type NewTask = Insertable<TaskTable>;
export type TaskUpdate = Updateable<TaskTable>;

export interface SaveMyTaskDatabase {
  user: UserTable;
  task: TaskTable;
}

export type QueryParams = {
  search?: string;
  page?: string;
  limit?: string;
};

export type TableNames = "user" | "task";

export type UserKeys = keyof User;

export type TaskKeys = keyof Task;

export type CreateUserData = {
  username: string;
  password: string;
  email: string;
  full_name: string;
};

export type UpdateUserData = {
  username?: string;
  password?: string;
  email?: string;
  full_name?: string;
};

export type CreateTaskData = {
  title: string;
  state: "To do";
  user_id: number;
};

export type TaskStates = Task["state"];
