import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET || "";

export const generateToken = (userId: string): string => {
  const token = jwt.sign({ id: userId }, secret, { expiresIn: "30d" });
  return token;
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
