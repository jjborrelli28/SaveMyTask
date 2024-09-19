import { createUser, deleteUser, updateUser } from '@/services/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  type CreateUserResponse,
  type DeleteUserResponse,
  type UpdateUserResponse
} from '@/types';

type ResponseFunctions<T> = {
  onSuccess?: (response: T) => void;
  onError?: (error: Error) => void;
};

type UseMutationTask = {
  creation?: ResponseFunctions<CreateUserResponse>;
  update?: ResponseFunctions<UpdateUserResponse>;
  deletion?: ResponseFunctions<DeleteUserResponse>;
};

const useMutationUser = ({
  creation,
  update,
  deletion
}: Partial<UseMutationTask> = {}) => {
  const queryClient = useQueryClient();

  const userCreation = useMutation({
    mutationFn: createUser,
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      creation?.onSuccess?.(response);
    },
    onError: error => {
      creation?.onError?.(error);
    }
  });

  const userUpdate = useMutation({
    mutationFn: updateUser,
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      update?.onSuccess?.(response);
    },
    onError: error => {
      update?.onError?.(error);
    }
  });

  const userDeletion = useMutation({
    mutationFn: deleteUser,
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      deletion?.onSuccess?.(response);
    },
    onError: error => {
      deletion?.onError?.(error);
    }
  });

  return { userCreation, userUpdate, userDeletion };
};

export default useMutationUser;
