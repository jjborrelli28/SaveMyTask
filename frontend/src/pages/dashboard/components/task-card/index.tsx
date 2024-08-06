import clsx from 'clsx';
import { MouseEvent, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { MdCircle } from 'react-icons/md';
import { deleteTask, updateTask } from '../../../../services';
import { AccordionStates, Task, TaskStates } from '../../../../types';
import Accordion from './components/accordion';

export const taskStates = {
  'To do': 'text-orange',
  'In progress': 'text-yellow',
  Done: 'text-green'
};

const TaskCard = ({ data }: { data: Task }) => {
  const [input, setInput] = useState<{
    value: string;
    state: boolean;
  }>({
    value: data.description,
    state: true
  });
  const [accordionState, setAccordionState] =
    useState<AccordionStates>('Closed');

  const handleUpdateTask = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const action = e.currentTarget.getAttribute('data-action');

    if (action === 'update-state') {
      const taskState = data.state;
      let newState: TaskStates | undefined;

      if (taskState === 'To do') {
        newState = 'In progress';
      } else if (taskState === 'In progress') {
        newState = 'Done';
      } else if (taskState === 'Done') {
        newState = 'To do';
      }

      updateTask(data.id, { state: newState });
    } else if (action === 'update-description') {
      setInput(previousInput => ({
        ...previousInput,
        state: !previousInput.state
      }));
      updateTask(data.id, { description: input.value });
    }
  };

  const handleDeleteTask = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    deleteTask(data.id);
  };

  return (
    <li
      className={clsx(
        'flex flex-col bg-gray p-3 shadow-md transition-[background,transform] hover:scale-[1.01] hover:bg-light-gray',
        !input.state && 'animate-blink-background-gray'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          <button
            type="button"
            data-action="update-state"
            onClick={e => handleUpdateTask(e)}
          >
            <MdCircle
              size={20}
              className={clsx(
                taskStates[data.state],
                'rounded-full border-2 shadow-md'
              )}
            />
          </button>
          <form className="text-overflow-ellipsis flex flex-1 gap-3">
            <input
              type="text"
              className={clsx(
                'flex-1 overflow-hidden text-ellipsis bg-transparent text-xl outline-none focus:outline-none',
                data.state === 'Done' && 'line-through',
                !input.state && 'border-b-2 border-dark-gray'
              )}
              value={input.value}
              onChange={e =>
                setInput(previousInput => ({
                  ...previousInput,
                  value: e.target.value
                }))
              }
              disabled={input.state}
            />
            <button
              type="submit"
              data-action="update-description"
              onClick={e => handleUpdateTask(e)}
              className="transition-[transform] hover:scale-110"
            >
              <FaEdit
                size={22}
                className={clsx(
                  !input.state ? 'animate-blink-text-black' : 'text-black'
                )}
              />
            </button>
          </form>
        </div>
        <button
          type="button"
          onClick={() =>
            setAccordionState(previousAccordionState =>
              previousAccordionState === 'Closed' ? 'Opened' : 'Closed'
            )
          }
          className="transition-[transform] hover:scale-110"
        >
          <IoIosArrowDropdownCircle
            type="button"
            size={22}
            className={clsx(
              'text-black duration-300',
              accordionState === 'Opened' && 'rotate-180'
            )}
          />
        </button>
        <button
          type="button"
          onClick={e => handleDeleteTask(e)}
          className="transition-[transform] hover:scale-110"
        >
          <FaTrashAlt size={20} className="text-black" />
        </button>
      </div>
      <Accordion data={data} state={accordionState} />
    </li>
  );
};

export default TaskCard;
