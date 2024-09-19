import { createTask, deleteTask, updateTask } from '@/services/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  type CreateTaskResponse,
  type DeleteTaskResponse,
  type UpdateTaskParams,
  type UpdateTaskResponse
} from '@/types';

type ResponseFunctions<T> = {
  onSuccess?: (response: T) => void;
  onError?: (error: Error) => void;
};

type UseMutationTask = {
  creation?: ResponseFunctions<CreateTaskResponse>;
  update?: ResponseFunctions<UpdateTaskResponse>;
  deletion?: ResponseFunctions<DeleteTaskResponse>;
};

const useMutationTask = ({
  creation,
  update,
  deletion
}: Partial<UseMutationTask> = {}) => {
  const queryClient = useQueryClient();

  const taskCreation = useMutation({
    mutationFn: createTask,
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['task'] });
      creation?.onSuccess?.(response);
    },
    onError: error => {
      creation?.onError?.(error);
    }
  });

  const taskUpdate = useMutation({
    mutationFn: (params: UpdateTaskParams) =>
      updateTask({
        id: params.id,
        taskData: params.taskData
      }),
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['task'] });
      update?.onSuccess?.(response);
    },
    onError: error => {
      update?.onError?.(error);
    }
  });

  const taskDeletion = useMutation({
    mutationFn: deleteTask,
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['task'] });
      deletion?.onSuccess?.(response);
    },
    onError: error => {
      deletion?.onError?.(error);
    }
  });

  return { taskCreation, taskUpdate, taskDeletion };
};

export default useMutationTask;
