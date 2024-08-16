import { Request, Response } from "express";
import db from "../database/database";
import userSchema from "../validations/user";
import hashPassword from "../helpers/hash-password";

export const createUser = async (req: Request, res: Response) => {
  const bodyValidation = userSchema.safeParse(req.body);

  if (!bodyValidation.success) {
    return res.status(400).json({
      message: "Field validation failed",
      error: bodyValidation.error.issues.map((issue) => issue.message),
    });
  }

  const { username, password, email, full_name } = bodyValidation.data;

  try {
    const hashedPassword = await hashPassword(password);

    const existingUser = await db
      .selectFrom("user")
      .selectAll()
      .where("username", "=", username)
      .executeTakeFirst();

    if (existingUser)
      res.status(409).json({ message: "Username already exists" });

    const result = await db
      .insertInto("user")
      .values({
        username,
        password: hashedPassword,
        email,
        full_name,
      })
      .executeTakeFirstOrThrow();

    const newUser = await db
      .selectFrom("user")
      .selectAll()
      .where("id", "=", Number(result.insertId))
      .executeTakeFirstOrThrow();

    res.status(201).json({ message: "User created successfully!", newUser });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
