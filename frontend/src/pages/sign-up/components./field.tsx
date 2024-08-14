import clsx from 'clsx';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import NewUserContext from '../../../context/new-user';
import { NewUserField } from '../../../types';

const Field = ({ content }: { content: NewUserField }) => {
  const [input, setInput] = useState({
    value: '',
    isOnFocus: false,
    isValid: undefined as boolean | undefined,
    showPassword: false
  });
  const { setNewUser } = useContext(NewUserContext);

  const { value, isOnFocus, isValid, showPassword } = input;

  const { label, type, validate, validationRequirements } = content;

  useEffect(() => {
    if (isValid) {
      setNewUser(prevState => ({ ...prevState, [label.toLowerCase()]: value }));
    } else {
      setNewUser(prevState => ({
        ...prevState,
        [label.toLowerCase()]: undefined
      }));
    }
  }, [isValid]);

  const validateWhileTyping = () => {
    const isValid = validate(value);
    setInput(prevState => ({
      ...prevState,
      isValid
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(prevState => ({
      ...prevState,
      value: e.target.value
    }));

    validateWhileTyping();
  };

  const handleFocus = () => {
    setInput(prevState => ({
      ...prevState,
      isOnFocus: true
    }));
  };

  const handleBlur = () => {
    if (value === '')
      return setInput(prevState => ({
        ...prevState,
        isOnFocus: false,
        isValid: undefined
      }));
  };

  return (
    <div className="relative flex flex-col">
      <label
        className={clsx(
          'absolute left-0 transform font-semibold transition-all duration-200 ease-in-out',
          isOnFocus || value
            ? '-translate-y-5 text-sm'
            : 'translate-y-0 text-lg',
          isValid === undefined && isOnFocus
            ? 'text-lilac'
            : isValid === undefined && !isOnFocus
              ? 'text-black'
              : isValid === true
                ? 'text-green'
                : 'text-red'
        )}
      >
        {label}
      </label>
      <div className="relative flex">
        <input
          type={showPassword ? 'text' : type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={clsx(
            'z-10 flex-1 border-b-2 bg-transparent pb-0.5 text-lg outline-none focus:ring-0',
            isValid === undefined && isOnFocus
              ? 'border-lilac'
              : isValid === undefined && !isOnFocus
                ? 'border-black'
                : isValid === true
                  ? 'border-green'
                  : 'border-red'
          )}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() =>
              setInput(prevState => ({
                ...prevState,
                showPassword: !prevState.showPassword
              }))
            }
            className="z-10 cursor-pointer"
          >
            {input.showPassword ? (
              <FaEye
                size={20}
                className={clsx(
                  'pointer absolute right-0 top-1/2 -translate-y-1/2',
                  isValid === undefined && isOnFocus
                    ? 'text-lilac'
                    : isValid === undefined && !isOnFocus
                      ? 'text-black'
                      : isValid === true
                        ? 'text-green'
                        : 'text-red'
                )}
              />
            ) : (
              <FaEyeSlash
                size={20}
                className={clsx(
                  'pointer absolute right-0 top-1/2 -translate-y-1/2',
                  isValid === undefined && isOnFocus
                    ? 'text-lilac'
                    : isValid === undefined && !isOnFocus
                      ? 'text-black'
                      : isValid === true
                        ? 'text-green'
                        : 'text-red'
                )}
              />
            )}
          </button>
        )}
      </div>
      <ErrorMessage
        label={label}
        isValid={isValid}
        validationRequirements={validationRequirements}
      />
    </div>
  );
};

export default Field;

const ErrorMessage = ({
  label,
  isValid,
  validationRequirements
}: {
  label: string;
  isValid: boolean | undefined;
  validationRequirements: string[];
}) => (
  <div
    className={clsx(
      'grid-rows-auto grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity]',
      isValid === false && 'grid-rows-[1fr] opacity-100'
    )}
  >
    <div className="flex flex-col gap-2 overflow-hidden">
      <p className="text-end text-xs text-red">Invalid {label.toLowerCase()}</p>
      <ul className="flex list-inside list-disc flex-col gap-1 bg-gray p-2 text-xs">
        {validationRequirements.map((validationRequirement, i) => (
          <li key={i}>
            <span className="-m-2">{validationRequirement}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
