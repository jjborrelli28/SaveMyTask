import { userApi } from '@apis/index';
import { showByConsole } from '@helpers/show-by-console';
import { NewUser } from '@types';
import { handleError } from '@helpers/handle-error';

export const createUser = async (newUserData: NewUser) => {
  try {
    const { data: newUser } = await userApi.post('', newUserData);

    showByConsole({
      message: 'User created successfully',
      newUser
    });

    return newUser;
  } catch (error) {
    handleError(error);
  }
};
