import { NewUser } from '../types';

const baseURL = import.meta.env.VITE_TODO_APP_USER_API;

export const createUser = async (body: NewUser) => {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An unknown error occurred');
    }

    if (import.meta.env.VITE_ENV === 'development')
      console.log('User created successfully:', data);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating user:', error.message);
      throw error;
    } else {
      console.error('An unexpected error occurred');
      throw new Error('An unexpected error occurred');
    }
  }
};
