import { FieldApi, Validator } from '@tanstack/react-form';
import clsx from 'clsx';
import { HTMLInputTypeAttribute, useState } from 'react';
import { ZodType, ZodTypeDef } from 'zod';
import ErrorMessage from './components/error-message';
import EyeButton from './components/eye-button';
import Label from './components/label';
import { colors } from './constants';

export type InputStates =
  | 'initialState'
  | 'isHighlighted'
  | 'notValid'
  | 'isValid';

export type Fields<T extends string> = {
  name: T;
  type?: HTMLInputTypeAttribute;
}[];

export type CreateUserFieldNames = 'username' | 'password' | 'email' | 'full_name';

type CreateUserFields = {
  username: string;
  password: string;
  email: string;
  full_name: string;
};

export type LoginFieldNames = 'username' | 'password';

type LoginFields = {
  username: string;
  password: string;
};

type FieldProps = {
  type?: HTMLInputTypeAttribute;
  data:
    | FieldApi<
        CreateUserFields,
        CreateUserFieldNames,
        Validator<unknown, ZodType<any, ZodTypeDef, any>>,
        Validator<CreateUserFields>,
        string
      >
    | FieldApi<
        LoginFields,
        LoginFieldNames,
        Validator<unknown, ZodType<any, ZodTypeDef, any>>,
        Validator<LoginFields>,
        string
      >;
  requerid?: boolean;
};

const Field = ({ type = 'text', data, requerid }: FieldProps) => {
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
          required={requerid}
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
