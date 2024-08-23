export const showByConsole = (message: string | object | any[]) => {
  if (import.meta.env.VITE_ENV === 'development') console.log(message);
};
