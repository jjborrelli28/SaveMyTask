import Field from '@components/field';
import SubmitButton from '@components/submit-button';
import SubmitMessage from '@components/submit-message';
import { NewUserCreated } from '@context/new-user-created';
import { createUser } from '@services/user';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { createUserSchema } from '@validations/user';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultValues = {
  username: '',
  password: '',
  email: '',
  full_name: ''
};

const fields = [
  { name: 'username', type: 'text' },
  { name: 'password', type: 'password' },
  { name: 'email', type: 'email' },
  { name: 'full_name', type: 'text' }
] as const;

const CreateUserForm = () => {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const { setNewUserCreated } = useContext(NewUserCreated);

  const queryClient = useQueryClient();
  const mutationCreateUser = useMutation({
    mutationFn: createUser,
    onSuccess: data => {
      data?.message && setSubmitMessage(data.message);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: error => {
      setSubmitMessage(error.message);
    }
  });

  const form = useForm({
    defaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      mutationCreateUser.mutate(value);
    }
  });

  const navigate = useNavigate();

  const { isSuccess, isError, isPending, reset } = mutationCreateUser;

  if (isError) reset();

  if (isSuccess) {
    setNewUserCreated(true);
    setTimeout(() => {
      navigate('/dashboard');
      setNewUserCreated(false);
    }, 5000);
  }

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
              return <Field type={field.type} data={data} />;
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
              {isPending
                ? 'Creating user...'
                : isSuccess
                  ? 'You got it'
                  : 'Create user'}
            </SubmitButton>
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

export default CreateUserForm;
