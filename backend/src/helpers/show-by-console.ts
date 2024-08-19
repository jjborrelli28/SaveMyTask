export const showByConsole = (message: string | object | any[]) => {
  if (process.env.NODE_ENV === "development") console.log(message);
};
