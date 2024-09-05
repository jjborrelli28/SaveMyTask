import formatLabel from '@helpers/format-label';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { LuAsterisk } from 'react-icons/lu';
import { User } from '../../../../types';
import ModalForm from './components/modal-form';
import Button from '@components/button';

export type FieldKeys = Exclude<keyof User, 'id' | 'created_at'>;

export const UserData = ({ user }: { user: User }) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    key: FieldKeys | null;
  }>({
    isOpen: false,
    key: null
  });

  const userDataToShow = {
    username: user.username,
    password: (
      <span className="flex items-center">
        {Array(8).fill(<LuAsterisk size={16} />)}
      </span>
    ),
    email: user.email,
    full_name: user.full_name
  };

  const handleOpenModal = (key: FieldKeys) => {
    setModalState({ isOpen: true, key });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      key: null
    });
  };

  return (
    <div className="relative flex flex-col gap-10 pb-10 lg:order-1 lg:px-10">
      <h2 className="text-2xl font-semibold">My information</h2>
      <div className="flex flex-col gap-5 border-2 border-gray p-5 lg:p-10">
        {Object.entries(userDataToShow).map(([key, value]) => (
          <div className="flex items-center gap-3" key={key}>
            <p className="flex gap-2 text-xl">
              <span className="font-semibold capitalize">
                {formatLabel(key)}:
              </span>
              {value}
            </p>
            <button onClick={() => handleOpenModal(key as FieldKeys)}>
              <FaEdit
                size={22}
                className="text-black transition-colors duration-300 hover:text-lilac"
              />
            </button>
          </div>
        ))}
        <div className="flex justify-end pt-5">
          <Button
            onClick={() => setModalState({ isOpen: true, key: null })}
            containerClassName="!border-red"
            className="!bg-red"
            textClassName="group-hover:!text-red"
          >
            Delete User
          </Button>
        </div>
        <ModalForm
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          fieldKey={modalState.key}
        />
      </div>
    </div>
  );
};

export default UserData;
