import { Task, TaskStates } from '../types';

const baseURL = import.meta.env.VITE_TODO_APP_TASK_API;

export const getAllTasks = async () => {
  try {
    const response = await fetch(baseURL);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        `Error: ${errorData.message || 'An unknown error occurred'}`
      );
    }

    const data = (await response.json()) as Task[];

    console.log('Tasks obtanied successfully:', data);

    return data;
  } catch (error) {
    console.error('Error obtaning tasks:', error);
  }
};

export const updateTask = async (
  id: number,
  body: { description?: string; state?: TaskStates }
) => {
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

    console.log('Task deleted successfully:', data);

    return data;
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
