import clsx from 'clsx';
import { FormEvent, useCallback, useContext } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NewUserContext, { initialNewUserState } from '../../../context/new-user';
import { createUser } from '../../../services/users';
import { NewUser } from '../../../types';
import { fields } from './constants';
import Field from './field';

const CreateUserForm = () => {
  const { newUser, setNewUser } = useContext(NewUserContext);
  const navigate = useNavigate();

  const { username, password, name, formState } = newUser;

  const isSendable = !!username && !!password && !!name;

  const handleCreateUser = useCallback(
    async (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (username && password && name) {
        setNewUser(prevState => ({ ...prevState, formState: 'Is sending' }));

        const body = { username, password, name } as NewUser;

        const res = await createUser(body);

        if (typeof res.id === 'number') {
          setNewUser(prevState => ({ ...prevState, formState: 'Successful' }));
        } else {
          setNewUser(prevState => ({ ...prevState, formState: 'Error' }));
        }

        setTimeout(() => {
          navigate('/dashboard');
          setNewUser(initialNewUserState);
        }, 5000);
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
        disabled={
          formState === 'Successful' || formState === 'Error' || !isSendable
        }
        className={clsx(
          'flex items-center justify-center gap-2 py-3 text-xl font-bold transition-[background-color,color,padding,height] transition-colors duration-500',
          formState === 'Successful'
            ? 'bg-white text-green'
            : formState === 'Error'
              ? 'bg-white pb-5 text-red'
              : isSendable
                ? 'bg-lilac text-white hover:bg-light-lilac'
                : 'bg-dark-gray text-white'
        )}
      >
        {formState === 'Successful' ? (
          <span className="flex items-center gap-2">
            User successfully created!{' '}
            <FaCheck size={20} className="text-green" />
          </span>
        ) : formState === 'Error' ? (
          <span>
            Something went wrong, <br />
            try again later...
          </span>
        ) : (
          'Create account'
        )}
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
