import Button from '@components/button';
import Field, { Fields } from '@components/field';
import SubmitMessage from '@components/submit-message';
import { useAuthentication } from '@context/authentication';
import { loginUser } from '@services/user';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { loginSchema } from '@validations/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type LoginFieldNames = 'username' | 'password';

const fields: Fields<LoginFieldNames> = [
  { name: 'username' },
  { name: 'password', type: 'password' }
];

const defaultValues = {
  username: '',
  password: ''
};

const SignInForm = () => {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const { login } = useAuthentication();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutationCreateUser = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      data?.message && setSubmitMessage(data.message);
      data?.token && login(data.token);
      setTimeout(() => {
        navigate('/dashboard');
        reset();
      }, 1000);
      queryClient.invalidateQueries({ queryKey: ['logged-user'] });
    },
    onError: error => {
      setSubmitMessage(error.message);
      reset();
    }
  });

  const form = useForm({
    defaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      mutationCreateUser.mutate(value);
    }
  });

  const { isSuccess, isError, isPending, reset } = mutationCreateUser;

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
              onChange: loginSchema.shape[field.name],
              onChangeAsyncDebounceMs: 300
            }}
            children={data => {
              return <Field type={field?.type} data={data} requerid />;
            }}
          />
        ))}
        <form.Subscribe
          selector={state => state}
          children={state => (
            <Button
              isSendeable={
                state.isValid &&
                !!state.values.username.length &&
                !!state.values.password.length
              }
              isLoading={isPending}
            >
              Sign in
            </Button>
          )}
        />
      </form>
      <SubmitMessage
        type={isSuccess ? 'Success' : isError ? 'Error' : undefined}
      >
        {submitMessage}
      </SubmitMessage>
    </>
  );
};

export default SignInForm;
