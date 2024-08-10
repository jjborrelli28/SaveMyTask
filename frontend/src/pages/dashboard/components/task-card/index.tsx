import clsx from 'clsx';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { MdCircle } from 'react-icons/md';
import { deleteTask, updateTask } from '../../../../services';
import { AccordionStates, Task, TaskStates } from '../../../../types';
import Accordion from './components/accordion';
import TaskContext from '../../../../context/task';

export const taskStates = {
  'To do': 'text-orange',
  'In progress': 'text-yellow',
  Done: 'text-green'
};

const switchTaskState = (state: TaskStates): TaskStates => {
  const stateMap: Record<TaskStates, TaskStates> = {
    'To do': 'In progress',
    'In progress': 'Done',
    Done: 'To do'
  };

  return stateMap[state];
};

const TaskCard = ({ data }: { data: Task }) => {
  const [input, setInput] = useState<{
    value: string;
    isEditing: boolean;
  }>({
    value: data.description,
    isEditing: false
  });
  const [accordionState, setAccordionState] =
    useState<AccordionStates>('Closed');
  const { task } = useContext(TaskContext);

  useEffect(() => {
    setInput(previousState => ({ ...previousState, value: data.description }));
  }, [data]);

  const { search, page, limit } = task;

  const handleUpdateTask = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const action = e.currentTarget.getAttribute('data-action');

    if (action === 'update-state') {
      const newState = switchTaskState(data.state);
      updateTask({
        body: { id: data.id, state: newState },
        queries: { search, page, limit }
      });
    } else if (action === 'update-description') {
      setInput(previousInput => ({
        ...previousInput,
        isEditing: !previousInput.isEditing
      }));

      if (!input.isEditing) return;

      updateTask({
        body: { id: data.id, description: input.value },
        queries: { search, page, limit }
      });
    }
  };

  const handleDeleteTask = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    deleteTask({ id: data.id, queries: { search, page, limit } });
  };

  return (
    <li
      className={clsx(
        'flex flex-col bg-gray p-3 shadow-md transition-[background,transform] hover:scale-[1.01] hover:bg-light-gray',
        input.isEditing && 'animate-blink-background-gray'
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
                'w-[calc(100%_-_42px)] flex-1 overflow-hidden text-ellipsis bg-transparent text-xl outline-none focus:outline-none',
                data.state === 'Done' && 'line-through',
                input.isEditing && 'border-b-2 border-dark-gray'
              )}
              value={input.value}
              onChange={e =>
                setInput(previousInput => ({
                  ...previousInput,
                  value: e.target.value
                }))
              }
              disabled={!input.isEditing}
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
                  input.isEditing ? 'animate-blink-text-black' : 'text-black'
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
