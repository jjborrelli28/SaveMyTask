import { type Request, type Response, type NextFunction } from "express";

const delay = (
  req: Request,
  res: Response,
  next: NextFunction,
  time: number
) => {
  setTimeout(() => {
    next();
  }, time);
};

export default delay;
