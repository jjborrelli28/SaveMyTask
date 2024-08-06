import clsx from 'clsx';
import moment from 'moment';
import { taskStates } from '..';
import { AccordionStates, Task } from '../../../../../types';

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
            <p className={clsx('font-bold italic', taskStates[data.state])}>
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

export default Accordion;
