import clsx from 'clsx';
import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { MdCircle } from 'react-icons/md';
import { Tasks } from '../contexts/tasks';
import { Task } from '../types';

const TaskCard = ({ data }: { data: Task }) => {
  const [input, setInput] = useState<{
    value: string;
    disabled: boolean;
  }>({
    value: data.description,
    disabled: true
  });
  const refInputDisabled = useRef(input.disabled);
  const refTaskState = useRef(data.state);
  const { removeTask, updateTask } = useContext(Tasks);

  useEffect(() => {
    if (
      !refInputDisabled.current &&
      refInputDisabled.current !== input.disabled
    ) {
      updateTask && updateTask(data.id, { description: input.value });
    }
    refInputDisabled.current = input.disabled;
  }, [input.disabled]);

  const handleUpdateTask = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setInput(previousInput => ({
      ...previousInput,
      disabled: !previousInput.disabled
    }));
  };

  const handleUpdateTaskState = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (refTaskState.current === 'To do') {
      refTaskState.current = 'In progress';
    } else if (refTaskState.current === 'In progress') {
      refTaskState.current = 'Done';
    } else if (refTaskState.current === 'Done') {
      refTaskState.current = 'To do';
    }

    updateTask && updateTask(data.id, { state: refTaskState.current });
  };

  const handleDeleteTask = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    removeTask && removeTask(data.id);
  };

  const states = {
    'To do': 'text-orange',
    'In progress': 'text-yellow',
    Done: 'text-green'
  };

  return (
    <li
      className={clsx(
        'relative flex items-center justify-between gap-3 bg-gray p-3 shadow-md transition-[background,transform] hover:scale-[1.01] hover:bg-light-gray',
        !input.disabled && 'animate-blink-background-gray'
      )}
    >
      <div className="flex flex-1 items-center gap-3">
        <button type="button" onClick={e => handleUpdateTaskState(e)}>
          <MdCircle size={20} className={clsx(states[data.state])} />
        </button>
        <form className="text-overflow-ellipsis flex flex-1 gap-3">
          <input
            type="text"
            className={clsx(
              'flex-1 overflow-hidden text-ellipsis bg-transparent text-xl outline-none focus:outline-none focus:ring-0',
              data.state === 'Done' && 'line-through'
            )}
            value={input.value}
            onChange={e =>
              setInput(previousInput => ({
                ...previousInput,
                value: e.target.value
              }))
            }
            disabled={input.disabled}
          />
          <button
            type="submit"
            onClick={e => handleUpdateTask(e)}
            className="transition-[transform] hover:scale-110"
          >
            <FaEdit
              size={22}
              className={clsx(
                !input.disabled ? 'animate-blink-text-black' : 'text-black'
              )}
            />
          </button>
        </form>
      </div>
      <button
        type="button"
        onClick={e => handleDeleteTask(e)}
        className="transition-[transform] hover:scale-110"
      >
        <FaTrashAlt size={20} className="text-black" />
      </button>
    </li>
  );
};

export default TaskCard;
