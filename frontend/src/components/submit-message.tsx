import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

const SubmitMessage = ({
  type,
  children,
  className
}: PropsWithChildren<{
  type?: 'Success' | 'Error';
  className?: string;
}>) => {
  return (
    <div
      className={clsx(
        'grid-rows-auto grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300',
        children && 'grid-rows-[1fr] opacity-100',
        className
      )}
    >
      <div className="flex flex-col gap-2 overflow-hidden">
        <p
          className={clsx(
            'm-0',
            type === 'Success'
              ? 'text-center text-xl font-semibold text-green'
              : 'text-end text-xs text-red'
          )}
        >
          {children}
        </p>
      </div>
    </div>
  );
};

export default SubmitMessage;
