import moment from 'moment';
import { type TaskStates } from '@/types';

const taskStates = {
  'To do': 'text-orange',
  'In progress': 'text-yellow',
  Done: 'text-green'
};

export const getStateTask = (
  state: TaskStates,
  createdAtDate: Date,
  updatedAtDate: Date
) => {
  if (state === 'To do' && createdAtDate === updatedAtDate) {
    const today = moment();
    const formattedCreatedAt = moment(createdAtDate);
    const daysDiff = today.diff(formattedCreatedAt, 'days');

    if (daysDiff > 3) {
      return 'text-red';
    }
  }

  return taskStates[state];
};

export const changeTaskState = (state: TaskStates) => {
  const stateMap: Record<TaskStates, TaskStates> = {
    'To do': 'In progress',
    'In progress': 'Done',
    Done: 'To do'
  };

  return stateMap[state];
};
