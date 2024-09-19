import { type NextFunction, type Request, type Response } from "express";
import { type ParsedQs } from "qs";
import { verifyToken } from "../helpers/jwt";
import verifyUser from "../helpers/verify-user";

interface RequestQuery extends ParsedQs {
  search?: string;
}

export interface RequestProps extends Request {
  userId?: number;
  query: RequestQuery;
}

const authentication = async (
  req: RequestProps,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized, token not provided or malformed" });
  }

  try {
    const decoded = verifyToken(token);
    const userId = parseInt(decoded.id, 10);

    const userIsValid = await verifyUser(userId);
    if (!userIsValid) {
      return res.status(403).json({ message: "Forbidden, invalid user ID" });
    }

    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, invalid or expired token" });
  }
};

export default authentication;
