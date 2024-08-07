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

export type AccordionStates = 'Opened' | 'Closed';

export type WebSocketMessage = {
  type: 'TASK_LIST_UPDATE';
  taskList: Task[];
};
