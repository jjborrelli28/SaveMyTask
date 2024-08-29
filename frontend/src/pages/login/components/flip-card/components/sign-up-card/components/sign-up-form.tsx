import Field from '@components/field';
import Spinner from '@components/spinner';
import SubmitButton from '@components/submit-button';
import SubmitMessage from '@components/submit-message';
import { useAuthentication } from '@context/authentication';
import { createUser } from '@services/user';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { createUserSchema } from '@validations/user';
import { useState } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { CreateUserFieldNames, Fields } from '../../../../../../../types';

const defaultValues = {
  username: '',
  password: '',
  email: '',
  full_name: ''
};

const fields: Fields<CreateUserFieldNames> = [
  { name: 'username' },
  { name: 'password', type: 'password' },
  { name: 'email', type: 'email' },
  { name: 'full_name' }
];

const SignUpForm = () => {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const { login } = useAuthentication();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutationCreateUser = useMutation({
    mutationFn: createUser,
    onSuccess: data => {
      data?.message && setSubmitMessage(data.message);
      data?.token && login(data.token);
      setTimeout(() => {
        navigate('/dashboard');
        reset();
      }, 5000);
      queryClient.invalidateQueries({ queryKey: ['user'] });
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
              onChange: createUserSchema[field.name],
              onChangeAsyncDebounceMs: 300
            }}
            children={data => {
              return <Field type={field?.type} data={data} />;
            }}
          />
        ))}
        <form.Subscribe
          selector={state => [
            state.isDirty,
            state.isFieldsValid,
            state.isSubmitting,
            state.isSubmitted
          ]}
          children={([isDirty, isFieldsValid, isSubmitting]) => (
            <SubmitButton
              isSendeable={
                isDirty &&
                isFieldsValid &&
                !isSubmitting &&
                !isSuccess &&
                !isError
              }
            >
              {isPending ? (
                <Spinner className="!border-3 h-[30px] w-[30px] !border-white" />
              ) : isSuccess ? (
                'You got it!'
              ) : (
                'Create user'
              )}
            </SubmitButton>
          )}
        />
      </form>
      <SubmitMessage
        type={isSuccess ? 'Success' : isError ? 'Error' : undefined}
      >
        {submitMessage}
      </SubmitMessage>
      {isSuccess && <Confetti className="l-0 t-0 absolute w-screen" />}
    </>
  );
};

export default SignUpForm;
