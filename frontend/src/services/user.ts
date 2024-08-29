import { userApi } from '@apis/index';
import { handleError } from '@helpers/handle-error';
import { showByConsole } from '@helpers/show-by-console';
import { CreateUser, LoginUser } from '../types';

export const createUser: CreateUser = async data => {
  try {
    const {
      data: { token, newUser }
    } = await userApi.post('', data);

    const response = {
      message: 'User created successfully',
      token,
      newUser
    };

    showByConsole(response);

    return response;
  } catch (error) {
    handleError(error);
  }
};

export const loginUser: LoginUser = async data => {
  try {
    const {
      data: { token, userId }
    } = await userApi.post('/login', data);

    const response = {
      message: 'Successfully logged in',
      token,
      userId
    };

    showByConsole(response);

    return response;
  } catch (error) {
    handleError(error);
  }
};
