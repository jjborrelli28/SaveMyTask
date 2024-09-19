import { authenticationApi } from '@apis/index';
import { handleError } from '@helpers/handle-error';
import { showByConsole } from '@helpers/show-by-console';
import { AxiosResponse } from 'axios';
import { GetAuthentication, GetAuthenticationResponse } from '../types';

const getAuthentication: GetAuthentication = async () => {
  try {
    const { data } = await authenticationApi.get<
      any,
      AxiosResponse<GetAuthenticationResponse>
    >('', {
      withCredentials: true
    });

    showByConsole(data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export default getAuthentication;
