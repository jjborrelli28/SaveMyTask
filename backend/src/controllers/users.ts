import { Request, Response } from "express";
import db from "../database/db";
import { User } from "../types";

export const createUser = async (req: Request, res: Response) => {
  const { username, password, name } = req.body as User;

  if (!username || !password || !name) {
    return res
      .status(400)
      .json({ message: "Username, password, and name are required" });
  }

  try {
    const existingUser = await db
      .selectFrom("user")
      .selectAll()
      .where("username", "=", username)
      .executeTakeFirst();

    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    res.status(201).json({ message: "User successfully created!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
};
