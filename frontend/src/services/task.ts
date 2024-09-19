import { taskApi } from '@apis/index';
import { handleError } from '@helpers/handle-error';
import { showByConsole } from '@helpers/show-by-console';
import { type AxiosResponse } from 'axios';
import {
  type CreateTask,
  type CreateTaskResponse,
  type DeleteTask,
  type DeleteTaskResponse,
  type GetTasks,
  type GetTasksResponse,
  type UpdateTask,
  type UpdateTaskResponse
} from '../types';

export const getTasks: GetTasks = async queries => {
  try {
    const { data } = await taskApi.get<any, AxiosResponse<GetTasksResponse>>(
      '',
      { params: queries, withCredentials: true }
    );

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createTask: CreateTask = async taskData => {
  try {
    const { data } = await taskApi.post<any, AxiosResponse<CreateTaskResponse>>(
      '',
      taskData,
      { withCredentials: true }
    );

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateTask: UpdateTask = async ({ id, taskData }) => {
  try {
    const { data } = await taskApi.patch<
      any,
      AxiosResponse<UpdateTaskResponse>
    >(`/${id}`, taskData, { withCredentials: true });

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteTask: DeleteTask = async id => {
  try {
    const { data } = await taskApi.delete<
      any,
      AxiosResponse<DeleteTaskResponse>
    >(`/${id}`, { withCredentials: true });

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};
