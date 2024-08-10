import { Task, TaskCreationBody, TaskUpdateBody } from '../types';

const baseURL = import.meta.env.VITE_TODO_APP_TASK_API;

export const getTasks = async (url?: string) => {
  try {
    const response = await fetch(url || baseURL);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        `Error: ${errorData.message || 'An unknown error occurred'}`
      );
    }

    const data = (await response.json()) as Task[];

    if (import.meta.env.VITE_ENV === 'development')
      console.log('Tasks obtanied successfully:', data);

    return data;
  } catch (error) {
    console.error('Error obtaning tasks:', error);
  }
};

export const createTask = async (body: TaskCreationBody) => {
  try {
    const response = await fetch(`${baseURL}`, {
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

export const updateTask = async (id: number, body: TaskUpdateBody) => {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
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

export const deleteTask = async (id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_TODO_APP_TASK_API}/${id}`,
      {
        method: 'DELETE'
      }
    );

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
