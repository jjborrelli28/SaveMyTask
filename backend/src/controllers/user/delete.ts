import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";
import { deleteItem, getItem } from "../../helpers/database";
import { getPasswordValidation, idParamSchema } from "../../validations";

const bodySchema = z.object({
  password: getPasswordValidation(),
});

const deleteUser = async (req: Request, res: Response) => {
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
  const { password: confirmationPassword } = dataValidation.data;

  const user = await getItem("user", { key: "id", value: id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { password } = user;

  const passwordIsValid = await bcrypt.compare(confirmationPassword, password);

  if (!passwordIsValid) {
    return res.status(401).json({
      message: "Incorrect password",
    });
  }

  try {
    const result = await deleteItem("user", id);

    if (result[0].numDeletedRows === BigInt(0)) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete User",
    });
  }
};

export default deleteUser;
