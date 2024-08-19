export const runInDev = (anything: Function) => {
  if (process.env.NODE_ENV === "development") anything;
};
