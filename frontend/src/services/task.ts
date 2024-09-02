import { taskApi } from '@apis/index';
import getAuthenticationHeaders from '@helpers/get-authentication-headers';
import { handleError } from '@helpers/handle-error';
import { showByConsole } from '@helpers/show-by-console';
import { AxiosResponse } from 'axios';
import {
  CreateTask,
  CreateTaskResponse,
  DeleteTask,
  DeleteTaskResponse,
  GetTasks,
  GetTasksResponse,
  UpdateTask,
  UpdateTaskResponse
} from '../types';

export const getTasks: GetTasks = async queries => {
  const headers = getAuthenticationHeaders();

  try {
    const { data } = await taskApi.get<any, AxiosResponse<GetTasksResponse>>(
      '',
      {
        params: queries,
        headers
      }
    );

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createTask: CreateTask = async taskData => {
  const headers = getAuthenticationHeaders();

  try {
    const { data } = await taskApi.post<any, AxiosResponse<CreateTaskResponse>>(
      '',
      taskData,
      {
        headers
      }
    );

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateTask: UpdateTask = async ({ id, taskData }) => {
  const headers = getAuthenticationHeaders();

  try {
    const { data } = await taskApi.patch<
      any,
      AxiosResponse<UpdateTaskResponse>
    >(`/${id}`, taskData, {
      headers
    });

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteTask: DeleteTask = async id => {
  const headers = getAuthenticationHeaders();

  try {
    const { data } = await taskApi.delete<
      any,
      AxiosResponse<DeleteTaskResponse>
    >(`/${id}`, {
      headers
    });

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};
