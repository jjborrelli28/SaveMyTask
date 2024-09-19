import Button from '@/components/button';
import SubmitMessage from '@/components/submit-message';
import useMutationTask from '@/hooks/use-mutation-task';
import { type ChangeEvent, type FormEvent, useState } from 'react';

const TaskCreatorForm = () => {
  const [value, setValue] = useState('');
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const { taskCreation } = useMutationTask({
    creation: {
      onError: error => {
        error?.message && setSubmitMessage(error.message);
        setTimeout(() => {
          setSubmitMessage(null);
        }, 5000);
      }
    }
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    taskCreation.mutate({ title: value });
    setValue('');
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const { isPending } = taskCreation;

  return (
    <div className="order-0 relative flex flex-col pb-10 lg:order-1 lg:px-10 lg:pt-10">
      <form
        onSubmit={handleSubmit}
        className="top-1/2 flex flex-col gap-5 py-6 transition-transform duration-300 lg:sticky lg:-translate-y-1/2"
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="What is your new task to save?"
          className="placeholder:text-gray-500 overflow-hidden text-ellipsis border-b-2 border-blue-500 bg-transparent bg-white px-1 text-2xl outline-none focus:outline-none focus:ring-0"
        />
        <Button type="submit" isLoading={isPending}>
          Create task
        </Button>
        <SubmitMessage type="Error" className="-mt-2">
          {submitMessage}
        </SubmitMessage>
      </form>
    </div>
  );
};

export default TaskCreatorForm;
