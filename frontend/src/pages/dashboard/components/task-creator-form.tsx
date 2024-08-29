import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { createTask } from '@services/task';

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

  return (
    <div className="order-0 relative flex flex-col pb-10 lg:order-1 lg:px-10 lg:pt-10">
      <form
        onSubmit={handleSubmit}
        className="top-1/2 flex flex-col gap-5 py-6 transition-transform duration-300 ease-in-out lg:sticky lg:-translate-y-1/2"
      >
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="What is your new task to save?"
          className="overflow-hidden text-ellipsis border-b-2 border-lilac bg-transparent bg-white px-1 text-2xl outline-none placeholder:text-dark-gray focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-lilac py-3 text-xl font-bold text-white transition-colors hover:bg-light-lilac"
        >
          <FaPlus />
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskCreatorForm;
