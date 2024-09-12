const showByConsole = (message: string | object | Error[]) => {
  if (process.env.NODE_ENV === "development") {
    return console.log(message);
  }
};

export default showByConsole;
