import clsx from 'clsx';
import { useState } from 'react';
import { Field as FieldProps } from '../../types';
import ErrorMessage from './components/error-message';
import EyeButton from './components/eye-button';
import Label from './components/label';
import { colors } from './constants';

const Field = ({ type = 'text', data }: FieldProps) => {
  const [onFocus, setOnFocus] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const name = data.name;
  const { value } = data.state;
  const { isDirty, isTouched, errors } = data.state.meta;
  const isValid = isTouched && !errors.length;
  const inputState =
    onFocus && !isTouched
      ? 'isHighlighted'
      : !isValid && isDirty
        ? 'notValid'
        : isValid
          ? 'isValid'
          : 'initialState';

  const handleFocus = () => {
    setOnFocus(prevState => !prevState);
  };

  const handleBlur = () => {
    data.handleBlur();
    setOnFocus(prevState => !prevState);
  };

  return (
    <fieldset className="relative flex flex-col">
      <Label {...{ onFocus, value, isValid, inputState }}>{name}</Label>
      <div className="relative flex">
        <input
          id={name}
          type={
            type === 'password' ? (passwordIsVisible ? 'text' : type) : type
          }
          name={name}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={e => data.handleChange(e.target.value)}
          className={clsx(
            'z-10 flex-1 border-b-2 bg-transparent pb-0.5 text-lg outline-none focus:ring-0',
            colors.borders[inputState]
          )}
        />
        {type === 'password' && (
          <EyeButton
            {...{ inputState, passwordIsVisible, setPasswordIsVisible }}
          />
        )}
      </div>
      <ErrorMessage {...{ name, errors }} />
    </fieldset>
  );
};

export default Field;
