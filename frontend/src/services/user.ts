import { userApi } from '@apis/index';
import { handleError } from '@helpers/handle-error';
import { showByConsole } from '@helpers/show-by-console';
import { CreateUser } from '../types';

export const createUser: CreateUser = async data => {
  try {
    const { data: newUser } = await userApi.post('', data);

    showByConsole({
      message: 'User created successfully',
      newUser
    });

    return newUser;
  } catch (error) {
    handleError(error);
  }
};
