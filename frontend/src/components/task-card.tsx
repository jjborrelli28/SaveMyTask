import clsx from 'clsx';
import moment from 'moment';
import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { MdCircle } from 'react-icons/md';
import { Tasks } from '../contexts/tasks';
import { AccordionStates, Task, TaskStates } from '../types';

const states = {
  'To do': 'text-orange',
  'In progress': 'text-yellow',
  Done: 'text-green'
};

const TaskCard = ({ data }: { data: Task }) => {
  const [input, setInput] = useState<{
    value: string;
    disabled: boolean;
  }>({
    value: data.description,
    disabled: true
  });
  const [accordionState, setAccordionState] =
    useState<AccordionStates>('Closed');
  const refInputDisabled = useRef(input.disabled);
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

    const taskState = data.state;
    let newState: TaskStates | undefined;

    if (taskState === 'To do') {
      newState = 'In progress';
    } else if (taskState === 'In progress') {
      newState = 'Done';
    } else if (taskState === 'Done') {
      newState = 'To do';
    }

    updateTask && updateTask(data.id, { state: newState });
  };

  const handleDeleteTask = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    removeTask && removeTask(data.id);
  };

  return (
    <li
      className={clsx(
        'flex flex-col bg-gray p-3 shadow-md transition-[background,transform] hover:scale-[1.01] hover:bg-light-gray',
        !input.disabled && 'animate-blink-background-gray'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          <button type="button" onClick={e => handleUpdateTaskState(e)}>
            <MdCircle
              size={20}
              className={clsx(
                states[data.state],
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
                !input.disabled && 'border-b-2 border-dark-gray'
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

const Accordion = ({ data, state }: { data: Task; state: AccordionStates }) => {
  const createdAtDate = data.created_at;
  const updatedAtDate = data.updated_at;

  const formattedCreatedAtDate = moment(createdAtDate).format(
    'DD MMMM YYYY, HH:mm:ss'
  );
  const formattedUpdatedAtDate = moment(updatedAtDate).format(
    'DD MMMM YYYY, HH:mm:ss'
  );

  return (
    <div
      className={clsx(
        'grid transition-[grid-template-rows,opacity,margin-top] duration-300',
        state === 'Closed'
          ? 'pointer-events-none grid-rows-[0fr] opacity-0'
          : 'pointer-events-auto mt-3 grid-rows-[1fr] opacity-100'
      )}
    >
      <div className="overflow-hidden">
        <div className="flex justify-between bg-light-gray p-3">
          <div className="flex items-center justify-center">
            <p className={clsx('font-bold italic', states[data.state])}>
              {data.state}
            </p>
          </div>
          <ul className="border-l-2 border-gray px-3">
            <li>
              <p className="text-xs">Created at: {formattedCreatedAtDate}</p>
            </li>
            <li>
              <p className="text-xs font-semibold">
                Updated at: {formattedUpdatedAtDate}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
