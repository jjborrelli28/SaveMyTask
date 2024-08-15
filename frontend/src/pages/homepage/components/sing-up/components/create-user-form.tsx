import clsx from 'clsx';
import { FormEvent, useCallback, useContext } from 'react';
import { MdOutlineCheck, MdOutlineErrorOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import NewUserContext, {
  initialNewUserState
} from '../../../../../context/new-user';
import { createUser } from '../../../../../services/users';
import { NewUser } from '../../../../../types';
import { fields } from '../constants';
import Field from './field';

const CreateUserForm = () => {
  const { newUser, setNewUser } = useContext(NewUserContext);
  const navigate = useNavigate();

  const { username, password, name, formState, messageToShow } = newUser;
  const isSendable = formState === 'Idle' && !!username && !!password && !!name;

  const handleCreateUser = useCallback(
    async (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (username && password && name) {
        setNewUser(prevState => ({ ...prevState, formState: 'IsSending' }));

        const body = { username, password, name } as NewUser;

        try {
          const res = await createUser(body);

          setNewUser(prevState => ({
            ...prevState,
            formState: 'Successful',
            messageToShow: res.message
          }));

          setTimeout(() => {
            navigate('/dashboard');
            setNewUser(initialNewUserState);
          }, 5000);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setNewUser(prevState => ({
              ...prevState,
              formState: 'Error',
              messageToShow: error.message
            }));
          } else {
            setNewUser(prevState => ({
              ...prevState,
              formState: 'Error',
              messageToShow: 'An unexpected error occurred'
            }));
          }

          setTimeout(() => {
            setNewUser(prevState => ({
              ...prevState,
              formState: 'Idle',
              messageToShow: undefined
            }));
          }, 5000);
        }
      }
    },
    [username, password, name]
  );

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleCreateUser} className="flex flex-col gap-6">
        {fields.map((field, i) => (
          <Field key={i} content={field} />
        ))}
        <div
          className={clsx(
            'grid transition-[grid-template-rows,opacity]',
            messageToShow
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div className="overflow-hidden">
            <p
              className={clsx(
                'flex items-center justify-center gap-1 text-xl font-semibold',
                formState === 'Successful'
                  ? 'text-green'
                  : formState === 'Error'
                    ? 'text-red'
                    : 'text-transparent'
              )}
            >
              {messageToShow}{' '}
              {formState === 'Successful' ? (
                <MdOutlineCheck size={24} />
              ) : (
                <MdOutlineErrorOutline size={24} />
              )}
            </p>
          </div>
        </div>
        <button
          type="submit"
          onSubmit={handleCreateUser}
          disabled={!isSendable}
          className={clsx(
            'flex items-center justify-center gap-2 py-3 text-xl font-bold transition-[background-color,color,padding,height] transition-colors duration-500',
            isSendable
              ? 'bg-lilac text-white hover:bg-light-lilac'
              : 'bg-dark-gray text-white'
          )}
        >
          {'Create account'}
        </button>
      </form>
      <p className="text-xs">
        <span className="font-semibold text-lilac">SaveMyTasks</span> collects
        your username, password and name only to create your account and allow
        you to save your tasks. This data will not be used for any other
        purpose.
      </p>
    </div>
  );
};

export default CreateUserForm;
