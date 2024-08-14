import { FormEvent, useCallback, useContext } from 'react';
import NewUserContext, { initialNewUserState } from '../../../context/new-user';
import { fields } from './constants';
import Field from './field';
import { createUser } from '../../../services/users';
import { NewUser } from '../../../types';

const CreateUserForm = () => {
  const { newUser, setNewUser } = useContext(NewUserContext);

  const handleCreateUser = useCallback(
    (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const { username, password, name } = newUser;

      if (username && password && name) {
        const body = { username, password, name } as NewUser;

        createUser(body);
        setNewUser(initialNewUserState);
      }
    },

    [newUser]
  );

  return (
    <form onSubmit={handleCreateUser} className="flex flex-col gap-6">
      {fields.map((field, i) => (
        <Field key={i} content={field} />
      ))}
      <button
        type="submit"
        onSubmit={handleCreateUser}
        className="flex items-center justify-center gap-2 bg-lilac py-3 text-xl font-bold text-white transition-colors hover:bg-light-lilac"
      >
        Create account
      </button>
      <p className="-mt-3 text-xs">
        <span className="font-semibold text-lilac">SaveMyTasks</span> collects
        your username, password and name only to create your account and allow
        you to save your tasks. This data will not be used for any other
        purpose.
      </p>
    </form>
  );
};

export default CreateUserForm;
