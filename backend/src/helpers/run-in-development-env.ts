const runInDevelopmentEnv = (anything: Function) => {
  if (process.env.NODE_ENV === "development") {
    return anything;
  }
};

export default runInDevelopmentEnv;
