import { Request, Response } from "express";
import { getItem, insertItem } from "../helpers/database";
import hashPassword from "../helpers/hash-password";
import { createUserSchema } from "../validations/user";

export const createUser = async (req: Request, res: Response) => {
  const createUserValidation = createUserSchema.safeParse(req.body);

  if (!createUserValidation.success) {
    return res.status(400).json({
      message: `${createUserValidation.error.issues.map((issue) => issue.message)}`,
    });
  }

  const { username, password, email, full_name } = createUserValidation.data;

  try {
    const hashedPassword = await hashPassword(password);

    const existingUser = await getItem("user", "username", username);

    if (existingUser)
      res.status(409).json({ message: "Username already exists" });

    const existingEmail = await getItem("user", "email", email);

    if (existingEmail)
      res.status(409).json({ message: "Email already registered" });

    const result = await insertItem("user", {
      username,
      password: hashedPassword,
      email,
      full_name,
    });

    const newUser = await getItem("user", "id", Number(result.insertId));

    res.status(201).json({ message: "User created successfully!", newUser });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
    });
  }
};
