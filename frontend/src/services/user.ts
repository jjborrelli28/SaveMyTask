import { userApi } from '@apis/index';
import getAuthenticationToken from '@helpers/get-authentication-token';
import { handleError } from '@helpers/handle-error';
import { showByConsole } from '@helpers/show-by-console';
import { AxiosResponse } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import {
  CreateUser,
  CreateUserResponse,
  GetUser,
  GetUserResponse,
  LoginUser,
  LoginUserResponse
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
  const { id: userId } = jwtDecode<JwtPayload & { id: string }>(token);

  try {
    const { data } = await userApi.get<any, AxiosResponse<GetUserResponse>>(
      `/${userId}`,
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
