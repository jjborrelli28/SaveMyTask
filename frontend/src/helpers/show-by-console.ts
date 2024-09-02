export const showByConsole = (message: any) => {
  if (import.meta.env.VITE_ENV === 'development') console.log(message);
};
