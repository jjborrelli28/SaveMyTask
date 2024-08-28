import { createContext, ReactNode, useState } from 'react';
import { NewUserCreatedContextProps } from '../types';

export const NewUserCreated = createContext<NewUserCreatedContextProps>({
  newUserCreated: false,
  setNewUserCreated: () => false
});

export const NewUserCreatedProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [newUserCreated, setNewUserCreated] = useState(false);

  return (
    <NewUserCreated.Provider value={{ newUserCreated, setNewUserCreated }}>
      {children}
    </NewUserCreated.Provider>
  );
};
