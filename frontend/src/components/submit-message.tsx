import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

const SubmitMessage = React.memo(
  ({
    type,
    children
  }: PropsWithChildren<{
    type?: 'Success' | 'Error';
  }>) => (
    <div
      className={clsx(
        'grid-rows-auto mb-2 grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity]',
        children && 'grid-rows-[1fr] opacity-100'
      )}
    >
      <div className="flex flex-col gap-2 overflow-hidden">
        <p
          className={clsx(
            '',
            type === 'Success'
              ? 'text-center text-xl font-semibold text-green'
              : 'text-end text-xs text-red'
          )}
        >
          {children}
        </p>
      </div>
    </div>
  )
);

export default SubmitMessage;
