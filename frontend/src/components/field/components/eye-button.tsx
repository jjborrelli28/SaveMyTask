import clsx from 'clsx';
import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FieldEyeButton } from '../../../types';
import { colors } from '../constants';

const EyeButton = React.memo(
  ({ inputState, passwordIsVisible, setPasswordIsVisible }: FieldEyeButton) => {
    const handleClick = () => {
      setPasswordIsVisible(prevState => !prevState);
    };

    return (
      <button
        type="button"
        tabIndex={-1}
        onClick={handleClick}
        className="z-10 cursor-pointer"
      >
        {passwordIsVisible ? (
          <FaEye
            size={20}
            className={clsx(
              'pointer absolute right-0 top-1/2 -translate-y-1/2',
              colors.texts[inputState]
            )}
          />
        ) : (
          <FaEyeSlash
            size={20}
            className={clsx(
              'pointer absolute right-0 top-1/2 -translate-y-1/2',
              colors.texts[inputState]
            )}
          />
        )}
      </button>
    );
  }
);

export default EyeButton;
