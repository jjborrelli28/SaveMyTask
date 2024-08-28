import clsx from 'clsx';
import { FieldErrorMessage } from '../../../types';
import React from 'react';

const ErrorMessage = React.memo(({ name, errors }: FieldErrorMessage) => (
  <div
    className={clsx(
      'grid-rows-auto mb-2 grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity]',
      errors.length && 'grid-rows-[1fr] opacity-100'
    )}
  >
    <div className="flex flex-col gap-2 overflow-hidden">
      <p className="text-end text-xs text-red">
        Invalid {name.toLowerCase().replace('_', ' ')}
      </p>
      <ul className="flex list-inside list-disc flex-col gap-1 bg-gray p-2 text-xs italic">
        {errors.map((error, i) => (
          <li key={i}>
            <span className="-m-2">{error}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
));

export default ErrorMessage;
