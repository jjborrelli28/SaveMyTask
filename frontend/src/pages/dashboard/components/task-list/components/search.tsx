import debounce from 'lodash/debounce';
import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { TaskQueriesContext } from '@context/task-queries';

const Search = () => {
  const { taskQueries, setTaskQueries } = useContext(TaskQueriesContext);
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

  return (
    <form className="flex w-full items-center rounded-full border-2 border-b-2 border-lilac px-3 py-1 sm:w-1/2">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search for a task"
        className="w-[calc(100%_-_20px)] bg-transparent pr-3 text-lg placeholder:text-dark-gray focus:outline-none"
      />
      <FaSearch className="text-lilac" size={18} />
    </form>
  );
};

export default Search;
