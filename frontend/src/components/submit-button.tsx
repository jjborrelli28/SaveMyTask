import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

const SubmitButton = React.memo(
  ({ children, isSendeable }: PropsWithChildren<{ isSendeable: boolean }>) => (
    <button
      type="submit"
      disabled={!isSendeable}
      className={clsx(
        'flex items-center justify-center gap-2 py-3 text-xl font-bold transition-[background-color,color,padding,height] duration-300',
        isSendeable
          ? 'bg-lilac text-white hover:bg-light-lilac'
          : 'bg-dark-gray text-white'
      )}
    >
      {children}
    </button>
  )
);
export default SubmitButton;
