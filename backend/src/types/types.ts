import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

// UserTable Types
export interface UserTable {
  id: Generated<number>;
  username: string;
  password: string;
  name: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

// TaskTable Types
export interface TaskTable {
  id: Generated<number>;
  description: string;
  state: "Pending" | "In process" | "Done";
  user_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, Date | undefined, Date>;
}

export type Task = Selectable<TaskTable>;
export type NewTask = Insertable<TaskTable>;
export type TaskUpdate = Updateable<TaskTable>;

// DB Types
export interface TodoAppDB {
  user: UserTable;
  task: TaskTable;
}
