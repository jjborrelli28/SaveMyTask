import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { InputStates } from '..';
import { colors } from '../constants';

type EyeButtonProps = {
  inputState: InputStates;
  passwordIsVisible: boolean;
  setPasswordIsVisible: Dispatch<SetStateAction<boolean>>;
};

const EyeButton = ({
  inputState,
  passwordIsVisible,
  setPasswordIsVisible
}: EyeButtonProps) => {
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
};

export default EyeButton;
