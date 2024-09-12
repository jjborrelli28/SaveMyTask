import bcrypt from "bcrypt";
import { type Request, type Response } from "express";
import { z } from "zod";
import { getAllTableItems, getItem, updateItem } from "../../helpers/database";
import hashPassword from "../../helpers/hash-password";
import {
    email,
    full_name,
    getPasswordValidation,
    idParamSchema,
    username,
} from "../../validations";

const bodySchema = z.object({
  username: username.optional(),
  password: getPasswordValidation().optional(),
  email: email.optional(),
  full_name: full_name.optional(),
  confirmationPassword: getPasswordValidation("Confirmation Password"),
});

const updateUser = async (req: Request, res: Response) => {
  const idValidation = idParamSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      message: idValidation.error.issues
        .map((issue) => issue.message)
        .join(", "),
    });
  }

  const dataValidation = bodySchema.safeParse(req.body);

  if (!dataValidation.success) {
    return res.status(400).json({
      message: dataValidation.error.issues
        .map((issue) => issue.message)
        .join(", "),
    });
  }

  const { id } = idValidation.data;
  const { confirmationPassword, ...newUserData } = dataValidation.data;
  const {
    username: newUserName,
    password: newPassword,
    email: newEmail,
    full_name: newFullName,
  } = newUserData;

  try {
    const user = await getItem("user", { key: "id", value: id });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { username, password, email, full_name } = user;

    const allTableUsers = await getAllTableItems("user");

    if (newUserName) {
      if (newUserName === username) {
        return res.status(400).json({
          message: "Username is the same as the current one",
        });
      }

      const existingUsername = allTableUsers.some(
        (user) => user.username === newUserName
      );

      if (existingUsername) {
        return res.status(400).json({
          message: "Username already exists",
        });
      }
    }

    if (newPassword) {
      const existingPassword = await bcrypt.compare(newPassword, password);

      if (existingPassword) {
        return res.status(400).json({
          message: "Password is the same as the current one",
        });
      }
    }

    if (email) {
      if (newEmail === email) {
        return res.status(400).json({
          message: "Email is the same as the current one",
        });
      }

      const existingEmail = allTableUsers.some(
        (user) => user.email === newEmail
      );

      if (existingEmail) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }
    }

    if (newFullName) {
      if (newFullName === full_name) {
        return res.status(400).json({
          message: "Full Name is the same as the current one",
        });
      }
    }

    const passwordIsValid = await bcrypt.compare(
      confirmationPassword,
      password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const result = await updateItem(
      "user",
      id,
      newPassword ? { password: await hashPassword(newPassword) } : newUserData
    );

    if (result[0].numUpdatedRows === BigInt(0)) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await getItem("user", { key: "id", value: id });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password: updatedUserPassword, ...userDataUpdatedWithoutPassword } =
      updatedUser;

    return res.status(201).json({
      user: userDataUpdatedWithoutPassword,
      message: "User successfully updated!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update User",
    });
  }
};

export default updateUser;
