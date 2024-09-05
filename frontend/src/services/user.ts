import { userApi } from '@apis/index';
import getAuthenticationToken from '@helpers/get-authentication-token';
import { handleError } from '@helpers/handle-error';
import { showByConsole } from '@helpers/show-by-console';
import { AxiosResponse } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import {
  CreateUser,
  CreateUserResponse,
  DeleteUser,
  DeleteUserResponse,
  GetUser,
  GetUserResponse,
  LoginUser,
  LoginUserResponse,
  UpdateUser,
  UpdateUserResponse
} from '../types';

export const createUser: CreateUser = async userData => {
  try {
    const { data } = await userApi.post<any, AxiosResponse<CreateUserResponse>>(
      '',
      userData
    );

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const loginUser: LoginUser = async loginData => {
  try {
    const { data } = await userApi.post<any, AxiosResponse<LoginUserResponse>>(
      '/login',
      loginData
    );

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getUser: GetUser = async () => {
  const token = getAuthenticationToken() || '';
  const { id } = jwtDecode<JwtPayload & { id: string }>(token);

  try {
    const { data } = await userApi.get<any, AxiosResponse<GetUserResponse>>(
      `/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUser: UpdateUser = async userData => {
  const token = getAuthenticationToken() || '';
  const { id } = jwtDecode<JwtPayload & { id: string }>(token);

  try {
    const { data } = await userApi.patch<
      any,
      AxiosResponse<UpdateUserResponse>
    >(`/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser: DeleteUser = async userData => {
  const token = getAuthenticationToken() || '';
  const { id } = jwtDecode<JwtPayload & { id: string }>(token);

  try {
    const { data } = await userApi.delete<
      any,
      AxiosResponse<DeleteUserResponse>
    >(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: userData
    });

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};
