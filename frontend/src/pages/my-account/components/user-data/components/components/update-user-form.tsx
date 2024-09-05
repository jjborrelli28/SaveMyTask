import Button from '@components/button';
import Field, { Fields } from '@components/field';
import SubmitMessage from '@components/submit-message';
import formatLabel from '@helpers/format-label';
import { updateUser } from '@services/user';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { updateUserSchema } from '@validations/user';
import clsx from 'clsx';
import { useState } from 'react';
import { FieldKeys } from '../..';
import { UpdateUserFieldNames } from '../modal-form';

type UpdateUserFormProps = {
  fieldKey: FieldKeys;
  onClose: () => void;
};

const UpdateUserForm = ({ fieldKey, onClose }: UpdateUserFormProps) => {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const mutationUpdateUser = useMutation({
    mutationFn: updateUser,
    onSuccess: data => {
      data?.message && setSubmitMessage(data.message);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setTimeout(() => {
        setSubmitMessage(null);
        reset();
        onClose();
      }, 2500);
    },
    onError: error => {
      setSubmitMessage(error.message);
    }
  });
  const { isSuccess, isError, isPending, reset } = mutationUpdateUser;

  const defaultValues = {
    [fieldKey]: '',
    currentPassword: ''
  } as Record<FieldKeys, string> & {
    currentPassword: string;
  };

  const form = useForm({
    defaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      mutationUpdateUser.mutate(value);
    }
  });

  const fields: Fields<UpdateUserFieldNames> = [
    {
      name: fieldKey,
      type:
        fieldKey === 'password'
          ? 'password'
          : fieldKey === 'email'
            ? 'email'
            : 'text'
    },
    { name: 'currentPassword', type: 'password' }
  ];

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
              onChange: updateUserSchema.shape[field.name],
              onChangeAsyncDebounceMs: 300
            }}
            children={data => {
              return (
                <div>
                  <label className="text-lg font-semibold">
                    {data.name === 'currentPassword'
                      ? 'Your Password'
                      : `New ${formatLabel(data.name)}`}
                    :
                  </label>
                  <Field
                    type={field.type}
                    data={data}
                    requerid
                    hasLabel={false}
                  />
                </div>
              );
            }}
          />
        ))}

        <form.Subscribe
          selector={state => state}
          children={state => (
            <Button
              isSendeable={
                state.isValid &&
                !!state.values[fieldKey] &&
                !!state.values.currentPassword
              }
              isLoading={isPending}
            >
              {isSuccess ? 'In good time' : `Update ${formatLabel(fieldKey)}`}
            </Button>
          )}
        />
      </form>
      <SubmitMessage
        type={isSuccess ? 'Success' : isError ? 'Error' : undefined}
        className={clsx(isSuccess && 'mt-3')}
      >
        {submitMessage}
      </SubmitMessage>
    </>
  );
};

export default UpdateUserForm;
