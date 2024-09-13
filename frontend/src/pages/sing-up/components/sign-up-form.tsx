import Button from '@components/button';
import Field, { type Fields } from '@components/field';
import SubmitMessage from '@components/submit-message';
import { useAuthentication } from '@context/authentication';
import useMutationUser from '@hooks/use-mutation-user';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { createUserSchema } from '@validations/user';
import { useState } from 'react';
import Confetti from 'react-confetti';

export type CreateUserFieldNames =
  | 'username'
  | 'password'
  | 'email'
  | 'full_name';

const fields: Fields<CreateUserFieldNames> = [
  { name: 'username' },
  { name: 'password', type: 'password' },
  { name: 'email', type: 'email' },
  { name: 'full_name' }
];

const defaultValues = {
  username: '',
  password: '',
  email: '',
  full_name: ''
};

const SignUpForm = () => {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const { login } = useAuthentication();

  const { userCreation } = useMutationUser({
    creation: {
      onSuccess: data => {
        data?.message && setSubmitMessage(data.message);
        setTimeout(() => {
          data?.token && login(data.token);
          reset();
        }, 5000);
      },
      onError: error => {
        setSubmitMessage(error.message);
        reset();
      }
    }
  });

  const form = useForm({
    defaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      userCreation.mutate(value);
    }
  });

  const { isSuccess, isError, isPending, reset } = userCreation;

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-6"
      >
        {fields.map(field => (
          <form.Field
            key={field.name}
            name={field.name}
            validatorAdapter={zodValidator()}
            validators={{
              onChange: createUserSchema.shape[field.name],
              onChangeAsyncDebounceMs: 300
            }}
            children={data => {
              return <Field type={field?.type} data={data} requerid />;
            }}
          />
        ))}
        <form.Subscribe
          selector={state => state}
          children={state => {
            const isSendeable =
              state.isValid &&
              !!state.values.username.length &&
              !!state.values.password.length &&
              !!state.values.email &&
              !!state.values.full_name;

            return (
              <Button isSendeable={isSendeable} isLoading={isPending}>
                {isSuccess ? 'You got it!' : 'Create user'}
              </Button>
            );
          }}
        />
      </form>
      <SubmitMessage
        type={isSuccess ? 'Success' : isError ? 'Error' : undefined}
      >
        {submitMessage}
      </SubmitMessage>
      {isSuccess && <Confetti className="absolute left-0 top-0" />}
    </>
  );
};

export default SignUpForm;
