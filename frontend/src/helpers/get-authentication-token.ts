import { authenticationCookieName } from '@context/authentication';
import Cookies from 'js-cookie';

const getAuthenticationToken = () => {
  const token = Cookies.get(authenticationCookieName);

  return token;
};

export default getAuthenticationToken;
