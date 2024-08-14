import { NewUser } from '../types';

const baseURL = import.meta.env.VITE_TODO_APP_USER_API;

export const createUser = async (body: NewUser) => {
  try {
    const response = await fetch(`${baseURL}`, {
      method: 'POST',
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
      console.log('User created successfully:', data);

    return data;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
