import { useTaskQueries } from '@context/task-queries';
import debounce from 'lodash/debounce';
import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const { taskQueries, setTaskQueries } = useTaskQueries();
  const [value, setValue] = useState(taskQueries.search);

  const debouncedSetTaskQueries = useCallback(
    debounce((newValue: string) => {
      setTaskQueries(prevState => ({
        ...prevState,
        search: newValue,
        page: 1
      }));
    }, 300),
    [setTaskQueries]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      debouncedSetTaskQueries(newValue);
    },
    [debouncedSetTaskQueries]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <form className="flex w-full items-center rounded-full border-2 border-b-2 border-lilac px-3 py-1 sm:w-1/2">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a task"
        className="w-[calc(100%_-_20px)] bg-transparent pr-3 text-lg placeholder:text-dark-gray focus:outline-none"
      />
      <FaSearch className="text-lilac" size={18} />
    </form>
  );
};

export default Search;
