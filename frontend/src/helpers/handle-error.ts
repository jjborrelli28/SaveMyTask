import { AxiosError } from 'axios';
import { showByConsole } from './show-by-console';

export const handleError = (error: unknown) => {
  const unexpectedErrorMessage = 'An unexpected error occurred';

  if (error instanceof AxiosError) {
    const errorMessage: string =
      error.response?.data?.message || unexpectedErrorMessage;

    showByConsole(errorMessage);

    throw new Error(errorMessage);
  } else if (error instanceof Error) {
    showByConsole(error.message);

    throw new Error(error.message);
  } else {
    showByConsole(unexpectedErrorMessage);

    throw new Error(unexpectedErrorMessage);
  }
};
