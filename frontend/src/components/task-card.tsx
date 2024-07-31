import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  FaEdit,
  FaTrashAlt
} from 'react-icons/fa';
import { MdCircle } from 'react-icons/md';
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

  useEffect(() => {
    if (
      !refInputDisabled.current &&
      refInputDisabled.current !== input.disabled
    ) {
      alert('Execute service to update task');
    }

    refInputDisabled.current = input.disabled;
  }, [input.disabled]);

  const states = {
    'To do': 'text-orange',
    'In progress': 'text-yellow',
    Done: 'text-green'
  };

  return (
    <li
      className={clsx(
        'hover:bg-light-gray relative flex items-center justify-between gap-3 bg-gray p-3 shadow-md transition-[background,transform] hover:scale-[1.01]',
        !input.disabled && 'animate-blink-background-gray'
      )}
    >
      <div className="flex flex-1 items-center gap-3">
        <MdCircle size={20} className={clsx(states[data.state])} />
        <form className="text-overflow-ellipsis flex flex-1 gap-3">
          <input
            type="text"
            className="flex-1 overflow-hidden text-ellipsis bg-transparent text-xl outline-none focus:outline-none focus:ring-0"
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
            onClick={e => {
              e.preventDefault();
              setInput(previousInput => ({
                ...previousInput,
                disabled: !previousInput.disabled
              }));
            }}
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
        onClick={e => {
          e.preventDefault();
          alert('Execute service to delete task');
        }}
        className="transition-[transform] hover:scale-110"
      >
        <FaTrashAlt size={20} className="text-black" />
      </button>
    </li>
  );
};

export default TaskCard;
