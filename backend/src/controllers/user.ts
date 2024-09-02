import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { getItem, insertItem } from "../helpers/database";
import hashPassword from "../helpers/hash-password";
import { generateToken } from "../helpers/jwt";
import {
  createUserSchema,
  loginSchema,
  paramsSchema,
} from "../validations/user";

export const createUser = async (req: Request, res: Response) => {
  const createUserValidation = createUserSchema.safeParse(req.body);

  if (!createUserValidation.success) {
    return res.status(400).json({
      message: `${createUserValidation.error.issues.map((issue) => issue.message).join(", ")}`,
    });
  }

  const { username, password, email, full_name } = createUserValidation.data;

  try {
    const hashedPassword = await hashPassword(password);

    const existingUser = await getItem("user", "username", username);
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const existingEmail = await getItem("user", "email", email);
    if (existingEmail) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const result = await insertItem("user", {
      username,
      password: hashedPassword,
      email,
      full_name,
    });

    const newUser = await getItem("user", "id", Number(result.insertId));

    const token = newUser && generateToken(newUser.id.toString());

    return res
      .status(201)
      .json({ token, newUser, message: "User created successfully!" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create user",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const loginValidation = loginSchema.safeParse(req.body);

  if (!loginValidation.success) {
    return res.status(400).json({
      message: `${loginValidation.error.issues.map((issue) => issue.message).join(", ")}`,
    });
  }

  const { username, password } = loginValidation.data;

  try {
    const user = await getItem("user", "username", username);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }

    const token = generateToken(user.id.toString());

    return res.json({
      token,
      message: "Successfully logged in",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to login",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const idValidation = paramsSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      error: idValidation.error.issues.map((issue) => issue.message).join(", "),
    });
  }

  const { id } = idValidation.data;

  try {
    const user = await getItem("user", "id", id);

    return res.json({
      user,
      message: "User successfully obtained",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failure to obtain tasks",
    });
  }
};
