export type Task = {
  id: number;
  created_at: Date;
  description: string;
  state: "To do" | "In process" | "Done";
  user_id: number;
  updated_at: Date;
};
