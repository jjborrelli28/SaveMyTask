import { MdCircle } from 'react-icons/md';

const Skeleton = () => {
  return (
    <div className="flex animate-blink-background-gray items-center gap-3 p-3 shadow-md">
      <MdCircle
        size={20}
        className="border-gray-300 text-gray-300 rounded-full border-2 shadow-md"
      />
      <p className="text-gray-300 text-xl">Loading...</p>
    </div>
  );
};

export default Skeleton;
