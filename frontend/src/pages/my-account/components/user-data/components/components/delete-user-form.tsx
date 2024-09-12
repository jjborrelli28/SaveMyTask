import Button from '@components/button';
import Field from '@components/field';
import SubmitMessage from '@components/submit-message';
import { useAuthentication } from '@context/authentication';
import { deleteUser } from '@services/user';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { updateUserSchema } from '@validations/user';
import clsx from 'clsx';
import { useState } from 'react';

type DeleteUserForm = {
  onClose: () => void;
};

export type DeleteUserField = { password: string };

const DeleteUserForm = ({ onClose }: DeleteUserForm) => {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const { logout } = useAuthentication();

  const queryClient = useQueryClient();
  const mutationDeleteUser = useMutation({
    mutationFn: deleteUser,
    onSuccess: data => {
      data?.message && setSubmitMessage(data.message);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setTimeout(() => {
        setSubmitMessage(null);
        reset();
        logout();
        onClose();
      }, 2500);
    },
    onError: error => {
      setSubmitMessage(error.message);
    }
  });
  const { isSuccess, isError, isPending, reset } = mutationDeleteUser;

  const defaultValues = {
    password: ''
  };

  const form = useForm({
    defaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      console.log(value);
      mutationDeleteUser.mutate(value);
    }
  });

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
        <form.Field
          key="password"
          name="password"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: updateUserSchema.shape.confirmationPassword,
            onChangeAsyncDebounceMs: 300
          }}
          children={data => {
            return (
              <div>
                <label className="text-lg font-semibold">
                  Confirm with your password
                </label>
                <Field type="password" data={data} requerid hasLabel={false} />
              </div>
            );
          }}
        />

        <form.Subscribe
          selector={state => state}
          children={state => {
            const isSendeable = state.isValid && !!state.values.password;

            return (
              <Button
                isSendeable={isSendeable}
                isLoading={isPending}
                containerClassName={clsx(isSendeable && 'border-red')}
                className={clsx(isSendeable && 'bg-red')}
                textClassName={clsx(isSendeable && 'group-hover:!text-red')}
                spinnerClassName={clsx(isSendeable && 'border-red')}
              >
                {isSuccess ? 'Done' : `Delete User `}
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
    </>
  );
};

export default DeleteUserForm;
