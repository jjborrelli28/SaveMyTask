import { MdCircle } from 'react-icons/md';

const Skeleton = () => {
  return (
    <div className="flex animate-blink-background-gray items-center gap-3 p-3 shadow-md">
      <MdCircle
        size={20}
        className="rounded-full border-2 border-dark-gray text-dark-gray shadow-md"
      />
      <input
        type="text"
        className="bg-transparent text-xl placeholder:text-dark-gray"
        placeholder="Loading..."
        disabled
      />
    </div>
  );
};

export default Skeleton;
