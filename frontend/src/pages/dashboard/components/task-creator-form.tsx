import { FormEvent, useState } from 'react';
import { createTask } from '../../../services';

const TaskCreatorForm = () => {
  const [value, setValue] = useState('');

  const user_id = 1; // TODO: Modify when we have authentication and user accounts

  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault();
    createTask({ description: value, user_id });
    setValue('');
  };

  return (
    <div className="flex flex-col py-10 lg:px-10">
      <form
        onSubmit={handleCreateTask}
        className="flex flex-1 flex-col gap-5 py-6"
      >
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="What is your new task to save?"
          className="overflow-hidden text-ellipsis border-b-2 border-gray bg-transparent bg-white text-2xl outline-none focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          onClick={e => handleCreateTask(e)}
          className="bg-lilac py-3 font-bold text-black transition-colors hover:bg-light-lilac"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskCreatorForm;
