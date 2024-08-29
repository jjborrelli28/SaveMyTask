import { NextFunction, Response } from "express";
import { verifyToken } from "../helpers/jwt";
import { AuthenticatedRequest } from "../types";

export const authentication = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = verifyToken(token);
    req.userId = parseInt(decoded.id, 10);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
