import Spinner from '@/components/spinner';
import SubmitMessage from '@/components/submit-message';
import { useTaskQueryParams } from '@/context/task-query-params';
import { getTasks } from '@/services/task';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';
import { FaListUl } from 'react-icons/fa';
import TaskCard from '../task-card';
import Search from './components/search';
import Skeleton from './components/skeleton';

const TaskList = () => {
  const { queryParams } = useTaskQueryParams();

  const { search, page, limit } = queryParams;

  const {
    data,
    error,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['task', search],
    initialPageParam: page,
    queryFn: ctx =>
      getTasks({
        search: ctx.queryKey[1],
        page: ctx.pageParam,
        limit
      }),
    getNextPageParam: lastGroup => {
      const nextPage = lastGroup?.hasNextPage ? lastGroup.page + 1 : undefined;
      return nextPage;
    },
    retry: 10
  });

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  const items = data ? data.pages.flatMap(page => page?.items) : [];

  const virtualizer = useWindowVirtualizer({
    count: items.length,
    estimateSize: () => 74,
    gap: 20,
    overscan: 5,
    enabled: true
  });

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (
      hasNextPage &&
      lastItem.index >= items.length - 1 &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [virtualizer.getVirtualItems(), hasNextPage, isFetchingNextPage]);

  const containerRef = useRef(null);

  return (
    <div className="lg:order-0 lg:border-gray-200 order-1 flex flex-1 flex-col gap-5 pb-5 lg:border-r-2 lg:px-10 lg:pb-10">
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
      ) : items.length ? (
        <>
          <div ref={containerRef}>
            <ul
              key={queryParams.search}
              className="relative flex w-full flex-col gap-5"
              style={{
                height: `${virtualizer.getTotalSize()}px`
              }}
            >
              {virtualizer.getVirtualItems().map(virtualItem => {
                const virtulItemData = items[virtualItem.index];

                if (!virtulItemData) return null;

                return (
                  <li
                    ref={virtualizer.measureElement}
                    key={virtualItem.key}
                    data-index={virtualItem.index}
                    className="absolute top-0 w-full"
                    style={{
                      transform: `translateY(${virtualItem.start}px)`
                    }}
                  >
                    <TaskCard data={virtulItemData} />
                  </li>
                );
              })}
            </ul>
          </div>
          {isFetchingNextPage && <Skeleton />}
        </>
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
