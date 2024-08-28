import { taskApi } from '@apis/index';
import { handleError } from '@helpers/handle-error';
import { showByConsole } from '@helpers/show-by-console';
import {
  CreateTask,
  DeleteTask,
  GetTasks,
  TaskData,
  TasksData,
  UpdateTask
} from '../types';

export const getTasks: GetTasks = async queries => {
  try {
    const { data }: TasksData = await taskApi.get('', {
      params: queries
    });

    showByConsole({
      message: 'Tasks obtained successfully',
      data
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createTask: CreateTask = async data => {
  try {
    const { data: newTask }: TaskData = await taskApi.post('', data);
    showByConsole({
      message: 'Task created successfully!',
      newTask
    });

    return newTask;
  } catch (error) {
    handleError(error);
  }
};

export const updateTask: UpdateTask = async ({ id, data }) => {
  try {
    const { data: updatedTask } = await taskApi.patch(`/${id}`, data);

    showByConsole({
      message: 'Tasks updated successfully',
      updatedTask
    });

    return updatedTask;
  } catch (error) {
    handleError(error);
  }
};

export const deleteTask: DeleteTask = async id => {
  try {
    const { data: deletedTask }: { data: number | undefined } =
      await taskApi.delete(`/${id}`);

    showByConsole({
      message: 'Tasks updated successfully',
      deletedTask
    });

    return id;
  } catch (error) {
    handleError(error);
  }
};
