import clsx from 'clsx';
import React, {
  forwardRef,
  LegacyRef,
  MouseEvent,
  useContext,
  useEffect,
  useState
} from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { MdCircle } from 'react-icons/md';
import TaskContext from '../../../../context/task';
import { deleteTask, updateTask } from '../../../../services/tasks';
import { Task, TaskCardAccordionStates, TaskStates } from '../../../../types';
import Accordion from './components/accordion';
import moment from 'moment';

const switchTaskState = (state: TaskStates): TaskStates => {
  const stateMap: Record<TaskStates, TaskStates> = {
    'To do': 'In progress',
    'In progress': 'Done',
    Done: 'To do'
  };

  return stateMap[state];
};

const taskStates = {
  'To do': 'text-orange',
  'In progress': 'text-yellow',
  Done: 'text-green'
};

export const getStateTask = (
  state: TaskStates,
  createdAtDate: Date,
  updatedAtDate: Date
) => {
  if (state === 'To do' && createdAtDate === updatedAtDate) {
    const today = moment();
    const formattedCreatedAt = moment(createdAtDate);
    const daysDiff = today.diff(formattedCreatedAt, 'days');

    if (daysDiff > 3) {
      return 'text-red';
    }
  }

  return taskStates[state];
};

const TaskCard = React.memo(
  forwardRef(
    ({ data }: { data: Task }, ref: LegacyRef<HTMLLIElement> | undefined) => {
      const [input, setInput] = useState<{
        value: string;
        isEditing: boolean;
      }>({
        value: data.description,
        isEditing: false
      });
      const [accordionState, setAccordionState] =
        useState<TaskCardAccordionStates>('Closed');
      const { task } = useContext(TaskContext);

      useEffect(() => {
        setInput(prevState => ({
          ...prevState,
          value: data.description
        }));
      }, [data]);

      const { id, state, created_at: createdAt, updated_at: updatedAt } = data;
      const { search, currentPage, tasksPerPage } = task;
      const { value, isEditing } = input;

      const handleUpdateTask = (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
      ) => {
        e.preventDefault();

        const action = e.currentTarget.getAttribute('data-action');

        if (action === 'update-state') {
          const newState = switchTaskState(state);
          updateTask({
            body: { id: id, state: newState },
            queries: { search, currentPage, tasksPerPage }
          });
        } else if (action === 'update-description') {
          setInput(prevInput => ({
            ...prevInput,
            isEditing: !prevInput.isEditing
          }));

          if (!isEditing) return;

          updateTask({
            body: { id, description: value },
            queries: { search, currentPage, tasksPerPage }
          });
        }
      };

      const handleDeleteTask = (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
      ) => {
        e.preventDefault();

        deleteTask({
          id,
          queries: { search, currentPage, tasksPerPage }
        });
      };

      return (
        <li
          ref={ref}
          className={clsx(
            'flex flex-col bg-gray p-3 shadow-md transition-[background,transform] hover:scale-[1.01] hover:bg-light-gray',
            isEditing && 'animate-blink-background-gray'
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-3">
              <button
                type="button"
                data-action="update-state"
                onClick={handleUpdateTask}
              >
                <MdCircle
                  size={20}
                  className={clsx(
                    getStateTask(state, createdAt, updatedAt),
                    'rounded-full border-2 shadow-md'
                  )}
                />
              </button>
              <form className="text-overflow-ellipsis flex flex-1 gap-3">
                <input
                  type="text"
                  className={clsx(
                    'w-[calc(100%_-_42px)] flex-1 overflow-hidden text-ellipsis bg-transparent text-xl outline-none focus:outline-none',
                    state === 'Done' && 'line-through',
                    isEditing && 'border-b-2 border-dark-gray'
                  )}
                  value={value}
                  onChange={e =>
                    setInput(prevInput => ({
                      ...prevInput,
                      value: e.target.value
                    }))
                  }
                  disabled={!isEditing}
                />
                <button
                  type="submit"
                  data-action="update-description"
                  onClick={handleUpdateTask}
                  className="transition-[transform] hover:scale-110"
                >
                  <FaEdit
                    size={22}
                    className={clsx(
                      isEditing ? 'animate-blink-text-black' : 'text-black'
                    )}
                  />
                </button>
              </form>
            </div>
            <button
              type="button"
              onClick={() =>
                setAccordionState(prevAccordionState =>
                  prevAccordionState === 'Closed' ? 'Opened' : 'Closed'
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
              onClick={handleDeleteTask}
              className="transition-[transform] hover:scale-110"
            >
              <FaTrashAlt size={20} className="text-black" />
            </button>
          </div>
          <Accordion data={data} state={accordionState} />
        </li>
      );
    }
  )
);

export default TaskCard;
