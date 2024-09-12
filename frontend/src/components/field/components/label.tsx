import clsx from 'clsx';
import { type InputStates } from '..';
import { colors } from '../constants';

type LabelProps = {
  children: string;
  onFocus: boolean;
  value: string;
  inputState: InputStates;
};

const Label = ({ children, onFocus, value, inputState }: LabelProps) => {
  return (
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
  );
};

export default Label;
