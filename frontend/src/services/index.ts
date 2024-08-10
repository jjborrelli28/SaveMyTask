import {
  Queries,
  Task,
  TaskCreationBody,
  TaskListData,
  TaskUpdatingBody
} from '../types';

const baseURL = import.meta.env.VITE_TODO_APP_TASK_API;

export const getTaskList = async ({ search, page, limit }: Queries) => {
  const url = `${baseURL}?${search && `${`search=${search}`}`}${page && limit && `${`&page=${page}&limit=${limit}`}`}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${errorData.message || 'An unknown error occurred'}`
      );
    }

    const data = (await response.json()) as TaskListData;

    if (import.meta.env.VITE_ENV === 'development')
      console.log('Tasks obtanied successfully:', data);

    return data;
  } catch (error) {
    console.error('Error obtaning tasks:', error);
    return { list: [] } as { list: Task[] };
  }
};

export const createTask = async ({
  body,
  queries
}: {
  body: TaskCreationBody;
  queries: Queries;
}) => {
  const { search, page, limit } = queries;
  const url = `${baseURL}?${search && `${`search=${search}`}`}${page && limit && `${`&page=${page}&limit=${limit}`}`}`;

  try {
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...body, state: 'To do' })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${errorData.message || 'An unknown error occurred'}`
      );
    }

    const data = await response.json();

    if (import.meta.env.VITE_ENV === 'development')
      console.log('Task created successfully:', data);

    return data;
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

export const updateTask = async ({
  body,
  queries
}: {
  body: TaskUpdatingBody;
  queries: Queries;
}) => {
  const { search, page, limit } = queries;
  const { id, ...update } = body;
  const url = `${baseURL}/${id}?${search && `${`search=${search}`}`}${page && limit && `${`&page=${page}&limit=${limit}`}`}`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(update)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${errorData.message || 'An unknown error occurred'}`
      );
    }

    const data = await response.json();

    if (import.meta.env.VITE_ENV === 'development')
      console.log('Task updated successfully:', data);

    return data;
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

export const deleteTask = async ({
  id,
  queries
}: {
  id: number;
  queries: Queries;
}) => {
  const { search, page, limit } = queries;
  const url = `${baseURL}/${id}?${search && `${`search=${search}`}`}${page && limit && `${`&page=${page}&limit=${limit}`}`}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${errorData.message || 'An unknown error occurred'}`
      );
    }

    const data = await response.json();

    if (import.meta.env.VITE_ENV === 'development')
      console.log('Task deleted successfully:', data);

    return data;
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
