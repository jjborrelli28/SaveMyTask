import Button from '@/components/button';
import Field, { type Fields } from '@/components/field';
import SubmitMessage from '@/components/submit-message';
import { useAuthentication } from '@/context/authentication';
import useMutationUser from '@/hooks/use-mutation-user';
import { createUserSchema } from '@/validations/user';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
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
  const { setIsAuthenticated } = useAuthentication();

  const { userCreation } = useMutationUser({
    creation: {
      onSuccess: data => {
        data?.message && setSubmitMessage(data.message);
        setTimeout(() => {
          setIsAuthenticated(true);
          reset();
        }, 4000);
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

  const { isPending, isSuccess, isError, reset } = userCreation;

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
              <div className="flex flex-col gap-2">
                <Button
                  isSendeable={isSendeable}
                  isLoading={isPending}
                  isSuccess={isSuccess}
                >
                  {isSuccess ? 'You got it!' : 'Create user'}
                </Button>
                <SubmitMessage
                  type={isSuccess ? 'Success' : isError ? 'Error' : undefined}
                >
                  {submitMessage}
                </SubmitMessage>
              </div>
            );
          }}
        />
      </form>

      {isSuccess && <Confetti className="absolute left-0 top-0" />}
    </>
  );
};

export default SignUpForm;
