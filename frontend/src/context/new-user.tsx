import { createContext, ReactNode, useState } from 'react';
import { NewUserContextProps, NewUserStateContext } from '../types/index';

export const initialNewUserState = {
  username: undefined,
  password: undefined,
  name: undefined
} as NewUserStateContext;

const NewUserContext = createContext<NewUserContextProps>({
  newUser: initialNewUserState,
  setNewUser: () => initialNewUserState
});

export const NewUserContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [newUser, setNewUser] = useState(initialNewUserState);

  return (
    <NewUserContext.Provider value={{ newUser, setNewUser }}>
      {children}
    </NewUserContext.Provider>
  );
};

export default NewUserContext;
