import { type Request, type Response } from "express";
import { z } from "zod";
import { getAllTableItems, getItem, insertItem } from "../../helpers/database";
import hashPassword from "../../helpers/hash-password";
import { generateToken } from "../../helpers/jwt";
import {
  email,
  full_name,
  getPasswordValidation,
  username,
} from "../../validations";

const bodySchema = z.object({
  username,
  password: getPasswordValidation(),
  email,
  full_name,
});

const createUser = async (req: Request, res: Response) => {
  const dataValidation = bodySchema.safeParse(req.body);

  if (!dataValidation.success) {
    return res.status(400).json({
      message: dataValidation.error.issues
        .map((issue) => issue.message)
        .join(", "),
    });
  }

  const { username, password, email, full_name } = dataValidation.data;

  const allTableUsers = await getAllTableItems("user");

  const existingUser = allTableUsers.some((user) => user.username === username);

  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const existingEmail = allTableUsers.some((user) => user.email === email);

  if (existingEmail) {
    return res.status(409).json({ message: "Email already registered" });
  }

  try {
    const hashedPassword = await hashPassword(password);

    const result = await insertItem("user", {
      username,
      password: hashedPassword,
      email,
      full_name,
    });

    const user = await getItem("user", {
      key: "id",
      value: Number(result.insertId),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password: userPassword, ...userDataWithoutPassword } = user;

    const token = generateToken(user.id.toString());

    return res.status(201).json({
      token,
      user: userDataWithoutPassword,
      message: "User successfully created!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create User",
    });
  }
};

export default createUser;
