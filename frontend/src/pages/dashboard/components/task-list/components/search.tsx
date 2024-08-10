import debounce from 'lodash/debounce';
import { ChangeEvent, useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import useGetTaskList from '../../../../../hooks/use-get-task-list';
import { getTasks } from '../../../../../services';

const baseURL = import.meta.env.VITE_TODO_APP_TASK_API;

const Search = () => {
  const [value, setValue] = useState('');
  const { setIsLoading, setTaskList } = useGetTaskList();

  const getTaskListFiltered = useCallback(
    debounce(async (searchValue: string) => {
      setIsLoading(true);

      try {
        const tasks =
          (
            await getTasks(
              `${baseURL}?search=${encodeURIComponent(searchValue)}`
            )
          )?.reverse() || null;
        setTaskList(tasks);
      } catch (error) {
        if (import.meta.env.VITE_ENV === 'development')
          console.error('Error getting task list:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    getTaskListFiltered(newValue);
  };

  return (
    <form className="flex w-1/2 items-center border-b-2 border-lilac px-1">
      <input
        type="text"
        value={value}
        onChange={handleSearchOnChange}
        placeholder="Search for a task"
        className="w-[calc(100%_-_20px)] bg-transparent pr-1 text-xl placeholder:text-dark-gray focus:outline-none"
      />
      <FaSearch className="text-lilac" size={20} />
    </form>
  );
};

export default Search;
