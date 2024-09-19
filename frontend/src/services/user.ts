import { userApi } from '@apis/index';
import { handleError } from '@helpers/handle-error';
import { showByConsole } from '@helpers/show-by-console';
import { type AxiosResponse } from 'axios';
import {
  type LogoutUser,
  type CreateUser,
  type CreateUserResponse,
  type DeleteUser,
  type DeleteUserResponse,
  type GetUser,
  type GetUserResponse,
  type LoginUser,
  type LoginUserResponse,
  type UpdateUser,
  type UpdateUserResponse
} from '../types';

export const loginUser: LoginUser = async userData => {
  try {
    const { data } = await userApi.post<any, AxiosResponse<LoginUserResponse>>(
      '/login',
      userData,
      {
        withCredentials: true
      }
    );

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const logoutUser: LogoutUser = async () => {
  try {
    const { data } = await userApi.get<any, AxiosResponse<{ message: string }>>(
      '/logout',
      {
        withCredentials: true
      }
    );

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createUser: CreateUser = async userData => {
  try {
    const { data } = await userApi.post<any, AxiosResponse<CreateUserResponse>>(
      '',
      userData,
      {
        withCredentials: true
      }
    );

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getUser: GetUser = async () => {
  try {
    const { data } = await userApi.get<any, AxiosResponse<GetUserResponse>>(
      `/me`,
      {
        withCredentials: true
      }
    );

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUser: UpdateUser = async userData => {
  try {
    const { data } = await userApi.patch<
      any,
      AxiosResponse<UpdateUserResponse>
    >(`/me`, userData, {
      withCredentials: true
    });

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser: DeleteUser = async userData => {
  try {
    const { data } = await userApi.delete<
      any,
      AxiosResponse<DeleteUserResponse>
    >(`/me`, {
      data: userData,
      withCredentials: true
    });

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};
