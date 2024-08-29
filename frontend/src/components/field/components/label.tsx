import clsx from 'clsx';
import React from 'react';
import { FieldLabel } from '../../../types';
import { colors } from '../constants';

const Label = React.memo(
  ({ children, onFocus, value, inputState }: FieldLabel) => (
    <label
      htmlFor={children}
      className={clsx(
        'absolute left-0 transform font-semibold capitalize transition-all duration-300',
        onFocus || value ? '-translate-y-5 text-sm' : 'translate-y-0 text-lg',
        colors.texts[inputState]
      )}
    >
      {children.replace('_', ' ')}
    </label>
  )
);

export default Label;
