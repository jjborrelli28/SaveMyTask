import { type Task, type TaskStates } from '@/types';

const getFilteredTasks = (tasks: Task[], state: TaskStates) => {
  return tasks.filter(task => task.state === state);
};

export default getFilteredTasks;
