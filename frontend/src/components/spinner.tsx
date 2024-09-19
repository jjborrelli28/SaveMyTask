import clsx from 'clsx';

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          'h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-500 !border-t-transparent',
          className
        )}
      ></div>
    </div>
  );
};

export default Spinner;
