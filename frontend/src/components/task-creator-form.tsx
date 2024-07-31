import { FormEvent, useContext, useState } from 'react';
import { Tasks } from '../contexts/tasks';

const TaskCreatorForm = () => {
  const [value, setValue] = useState('');
  const { createTask } = useContext(Tasks);

  const user_id = 1; // TODO: Modify when we have authentication and user accounts

  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault();

    createTask && createTask({ description: value, user_id });
  };

  return (
    <form
      onSubmit={handleCreateTask}
      className="flex flex-1 flex-col justify-center gap-5 p-5"
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
        className="hover:bg-light-lilac bg-lilac py-3 font-bold text-black transition-colors"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskCreatorForm;
