import { Request, Response } from "express";
import db from "../database/db";
import { User } from "../types";

export const createUser = async (req: Request, res: Response) => {
  const { username, password, name } = req.body as User;

  if (!username || !password || !name) {
    return res
      .status(400)
      .json({ error: "Username, password, and name are required" });
  }

  try {
    const result = await db
      .insertInto("user")
      .values({
        username,
        password,
        name,
      })
      .executeTakeFirstOrThrow();

    const newUser = await db
      .selectFrom("user")
      .selectAll()
      .where("id", "=", Number(result.insertId))
      .executeTakeFirstOrThrow();

    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create task", description: error });
  }
};
