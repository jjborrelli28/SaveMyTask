import { getStateTask } from '@/helpers/task';
import clsx from 'clsx';
import moment from 'moment';
import { type TaskCardAccordionStates } from '..';
import { type Task } from '@/types';

type TaskCardAccordion = { data: Task; state: TaskCardAccordionStates };

const Accordion = ({ data, state }: TaskCardAccordion) => {
  const {
    state: taskState,
    created_at: createdAtDate,
    updated_at: updatedAtDate
  } = data;

  const [formattedCreatedAtDate, formattedUpdatedAtDate] = [
    createdAtDate,
    updatedAtDate
  ].map(date => moment(date).format('DD MMMM YYYY, HH:mm:ss'));

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
            <p
              className={clsx(
                'text-nowrap pl-3 pr-6 font-bold italic',
                getStateTask(taskState, createdAtDate, updatedAtDate)
              )}
            >
              {data.state}
            </p>
          </div>
          <ul className="flex flex-col gap-1.5 border-l-2 border-gray px-3">
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

export default Accordion;
