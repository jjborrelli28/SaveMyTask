import getAuthenticationToken from './get-authentication-token';

const getAuthenticationHeaders = () => {
  const token = getAuthenticationToken();

  const headers = {
    Authorization: `Bearer ${token}`
  };

  return headers;
};

export default getAuthenticationHeaders;
