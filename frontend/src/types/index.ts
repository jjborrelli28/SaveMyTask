export type Task = {
  id: number;
  created_at: Date;
  description: string;
  state: TaskStates;
  user_id: number;
  updated_at: Date;
};

export type TaskStates = 'To do' | 'In progress' | 'Done';
