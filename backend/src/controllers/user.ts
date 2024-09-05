import bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
  deleteItem,
  getItem,
  insertItem,
  updateItem,
} from "../helpers/database";
import hashPassword from "../helpers/hash-password";
import { generateToken } from "../helpers/jwt";
import {
  createUserSchema,
  deleteUserSchema,
  loginSchema,
  paramsSchema,
  updateUserSchema,
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

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { password, ...userWithoutPassword } = user;

    return res.json({
      user: userWithoutPassword,
      message: "User successfully obtained",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failure to obtain tasks",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const idValidation = paramsSchema.safeParse(req.params);
  const updateUserValidation = updateUserSchema.safeParse(req.body);

  if (!idValidation.success) {
    return res.status(400).json({
      error: idValidation.error.issues.map((issue) => issue.message).join(", "),
    });
  }

  if (!updateUserValidation.success) {
    return res.status(400).json({
      message: `${updateUserValidation.error.issues.map((issue) => issue.message).join(", ")}`,
    });
  }

  const { id } = idValidation.data;

  const { currentPassword, ...updateUserData } = updateUserValidation.data;

  const { username, password, email, full_name } = updateUserData;

  try {
    const user = await getItem("user", "id", id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (username) {
      if (username === user.username) {
        return res.status(400).json({
          message: "The new username cannot be the same as the current one",
        });
      }

      const existingUsername = await getItem("user", "username", username);

      if (existingUsername) {
        return res.status(400).json({
          message: "Username already exists",
        });
      }
    }

    if (password) {
      const isTheSamePassword = await bcrypt.compare(password, user.password);

      if (isTheSamePassword) {
        return res.status(400).json({
          message: "The new password cannot be the same as the current one",
        });
      }
    }

    if (email) {
      if (email === user.email) {
        return res.status(400).json({
          message: "The new email cannot be the same as the current one",
        });
      }

      const existingEmail = await getItem("user", "email", email);

      if (existingEmail) {
        return res.status(400).json({
          message: "Username already exists",
        });
      }
    }

    if (full_name) {
      if (full_name === user.full_name) {
        return res.status(400).json({
          message: "The new full name cannot be the same as the current one",
        });
      }
    }

    const passwordIsValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "The changes could not be saved, password is incorrect",
      });
    }
    const result = await updateItem(
      "user",
      id,
      password ? { password } : updateUserData
    );

    if (result[0].numUpdatedRows === BigInt(0)) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await getItem("user", "id", id);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password: newPassword, ...updatedUserWithoutPassword } =
      updatedUser;

    return res.status(201).json({
      updatedUser: updatedUserWithoutPassword,
      message: "User updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failure to update user",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const idValidation = paramsSchema.safeParse(req.params);
  const deleteUserValidation = deleteUserSchema.safeParse(req.body);

  if (!idValidation.success) {
    return res.status(400).json({
      error: idValidation.error.issues.map((issue) => issue.message).join(", "),
    });
  }

  if (!deleteUserValidation.success) {
    return res.status(400).json({
      message: `${deleteUserValidation.error.issues.map((issue) => issue.message).join(", ")}`,
    });
  }

  const { id } = idValidation.data;
  const { password } = deleteUserValidation.data;

  try {
    const deletedUser = await getItem("user", "id", id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password: userPassword, ...deletedUserWithoutPassword } =
      deletedUser;

    const passwordIsValid = await bcrypt.compare(password, userPassword);

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "The user could not be deleted, password is incorrect",
      });
    }

    const result = await deleteItem("user", id);

    if (result[0].numDeletedRows === BigInt(0)) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      deletedUser: deletedUserWithoutPassword,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete User",
    });
  }
};
