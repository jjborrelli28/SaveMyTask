import { taskApi } from '@apis/index';
import getAuthenticationHeaders from '@helpers/get-authentication-headers';
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
  const headers = getAuthenticationHeaders();

  try {
    const { data }: TasksData = await taskApi.get('', {
      params: queries,
      headers
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
  const headers = getAuthenticationHeaders();

  try {
    const { data: newTask }: TaskData = await taskApi.post('', data, {
      headers
    });

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
  const headers = getAuthenticationHeaders();

  try {
    const { data: updatedTask } = await taskApi.patch(`/${id}`, data, {
      headers
    });

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
  const headers = getAuthenticationHeaders();

  try {
    const { data: deletedTask }: { data: number | undefined } =
      await taskApi.delete(`/${id}`, {
        headers
      });

    showByConsole({
      message: 'Tasks updated successfully',
      deletedTask
    });

    return id;
  } catch (error) {
    handleError(error);
  }
};
