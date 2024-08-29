import clsx from 'clsx';

const Spinner = ({ className }: { className?: string }) => (
  <div className="flex items-center justify-center">
    <div
      className={clsx(
        'h-12 w-12 animate-spin rounded-full border-4 border-solid border-lilac !border-t-transparent',
        className
      )}
    ></div>
  </div>
);

export default Spinner;
