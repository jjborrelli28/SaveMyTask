import Spinner from '@components/spinner';
import SubmitMessage from '@components/submit-message';
import { useTaskQueryParams } from '@context/task-query-params';
import { getTasks } from '@services/task';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';
import { FaListUl } from 'react-icons/fa';
import TaskCard from '../task-card';
import Search from './components/search';

const TaskList = () => {
  const { queryParams } = useTaskQueryParams();
  const listRef = useRef<HTMLDivElement>(null);

  const {
    data,
    error,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['task', queryParams.search],
    initialPageParam: queryParams.page,
    queryFn: ctx =>
      getTasks({
        search: ctx.queryKey[1],
        page: ctx.pageParam,
        limit: queryParams.limit
      }),
    getNextPageParam: lastGroup => {
      const nextPage = lastGroup?.hasNextPage
        ? lastGroup.currentPage + 1
        : undefined;
      return nextPage;
    },
    retry: 10
  });

  const taskList = data ? data.pages.flatMap(page => page?.tasks) : [];

  const virtualizer = useWindowVirtualizer({
    count: taskList.length,
    estimateSize: () => 74,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0
  });

  useEffect(() => {
    refetch();
  }, [queryParams.search, refetch]);

  useEffect(() => {
    const lastItem = virtualizer.getVirtualItems().slice(-1)[0];

    if (!lastItem) return;

    if (
      lastItem.index >= taskList.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [virtualizer.getVirtualItems(), hasNextPage, isFetchingNextPage]);

  return (
    <div className="lg:order-0 order-1 flex flex-1 flex-col gap-5 pb-5 lg:border-r-2 lg:border-gray lg:px-10 lg:pb-10">
      <div className="mb-2.5 flex items-center justify-between gap-5 lg:mb-5">
        <h2 className="flex items-center gap-2 text-nowrap text-2xl font-semibold">
          <FaListUl className="hidden sm:block" />
          Task list
        </h2>
        <Search />
      </div>
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center py-16">
          <Spinner />
        </div>
      ) : isError ? (
        <SubmitMessage className="px-3">{error.message}</SubmitMessage>
      ) : taskList.length ? (
        <div ref={listRef}>
          <ul
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative'
            }}
            className="flex flex-col gap-5"
          >
            {virtualizer.getVirtualItems().map(item => (
              <div
                key={item.key}
                className={item.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${item.size}px`,
                  transform: `translateY(${
                    item.start - virtualizer.options.scrollMargin
                  }px)`
                }}
              >
                <TaskCard data={taskList[item.index]} />
              </div>
            ))}
          </ul>
          {isFetching && <Spinner className="!border-gray py-3" />}
        </div>
      ) : (
        <div className="flex flex-1 items-center py-10">
          <p className="text-xl font-semibold">
            You have no tasks on your list
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
