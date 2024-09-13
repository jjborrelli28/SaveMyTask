import clsx from 'clsx';
import { type MouseEventHandler, type PropsWithChildren } from 'react';
import Spinner from './spinner';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isSendeable?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  containerClassName?: string;
  className?: string;
  textClassName?: string;
  spinnerClassName?: string;
};

const Button = ({
  children,
  type,
  onClick,
  isSendeable = true,
  isLoading,
  isSuccess,
  isError,
  containerClassName,
  className,
  textClassName,
  spinnerClassName
}: PropsWithChildren<ButtonProps>) => {
  const buttonProps = { type, onClick, disabled: !isSendeable };

  return (
    <button
      {...buttonProps}
      className={clsx(
        'group relative overflow-hidden border-2 bg-white px-5 py-3 text-white',
        isSendeable
          ? [
              'text-white',
              isSuccess
                ? 'border-green'
                : isError
                  ? 'border-red'
                  : 'border-lilac'
            ]
          : 'border-dark-gray',
        containerClassName
      )}
    >
      <span
        className={clsx(
          'absolute inset-0 translate-x-0 transform transition-transform duration-300',
          isSendeable
            ? [
                isSuccess
                  ? 'bg-green'
                  : isError
                    ? 'bg-red'
                    : 'bg-lilac group-hover:translate-x-full'
              ]
            : 'bg-dark-gray',
          isLoading && 'translate-x-full',
          className
        )}
      />
      <span
        className={clsx(
          'relative z-10 flex items-center justify-center gap-2 text-lg font-semibold',
          isSendeable
            ? [
                isSuccess
                  ? 'group-hover:text-white'
                  : isError
                    ? 'group-hover:text-white'
                    : 'group-hover:text-lilac'
              ]
            : '',
          textClassName
        )}
      >
        {isLoading ? (
          <Spinner className={clsx('h-[27px] w-[27px]', spinnerClassName)} />
        ) : (
          children
        )}
      </span>
    </button>
  );
};

export default Button;
