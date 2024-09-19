import { useTaskQueryParams } from '@/context/task-query-params';
import debounce from 'lodash/debounce';
import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useState
} from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const { queryParams, setQueryParams } = useTaskQueryParams();
  const [value, setValue] = useState(queryParams.search);

  const debouncedSetTaskQueries = useCallback(
    debounce((newValue: string) => {
      setQueryParams(prevState => ({
        ...prevState,
        search: newValue,
        page: 1
      }));
    }, 300),
    [setQueryParams]
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
    <form className="flex w-full items-center rounded-full border-2 border-b-2 border-blue-500 px-3 py-1 sm:w-1/2">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a task"
        className="placeholder:text-gray-500 w-[calc(100%_-_20px)] bg-transparent pr-3 text-lg focus:outline-none"
      />
      <FaSearch className="text-blue-500" size={18} />
    </form>
  );
};

export default Search;
