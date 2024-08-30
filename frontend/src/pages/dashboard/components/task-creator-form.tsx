import Button from '@components/button';
import { createTask } from '@services/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

const TaskCreatorForm = () => {
  const [value, setValue] = useState('');
  const queryClient = useQueryClient();
  const mutationCreateTask = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task'] });
    }
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    mutationCreateTask.mutate({ title: value });
    setValue('');
  };

  const { isPending } = mutationCreateTask;

  return (
    <div className="order-0 relative flex flex-col pb-10 lg:order-1 lg:px-10 lg:pt-10">
      <form
        onSubmit={handleSubmit}
        className="top-1/2 flex flex-col gap-5 py-6 transition-transform duration-300 lg:sticky lg:-translate-y-1/2"
      >
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="What is your new task to save?"
          className="overflow-hidden text-ellipsis border-b-2 border-lilac bg-transparent bg-white px-1 text-2xl outline-none placeholder:text-dark-gray focus:outline-none focus:ring-0"
        />
        <Button type="submit" onClick={handleSubmit} isLoading={isPending}>
          Create task
        </Button>
      </form>
    </div>
  );
};

export default TaskCreatorForm;
