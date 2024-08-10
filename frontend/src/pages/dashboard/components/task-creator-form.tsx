import { FormEvent, useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { createTask } from '../../../services';
import TaskContext from '../../../context/task';

const user_id = 1; // TODO: Modify when we have authentication and user accounts

const TaskCreatorForm = () => {
  const [value, setValue] = useState('');
  const { task } = useContext(TaskContext);

  const { search, page, limit } = task;

  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault();
    createTask({
      body: { description: value, user_id },
      queries: { search, page, limit }
    });
    setValue('');
  };

  return (
    <div className="order-0 flex flex-col pb-10 lg:order-1 lg:px-10 lg:pt-10">
      <form
        onSubmit={handleCreateTask}
        className="flex flex-1 flex-col gap-5 py-6"
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
          onClick={handleCreateTask}
          className="flex items-center justify-center gap-2 bg-lilac py-3 text-xl font-bold text-black transition-colors hover:bg-light-lilac"
        >
          <FaPlus />
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskCreatorForm;
