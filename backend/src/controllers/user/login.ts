import bcrypt from "bcrypt";
import { type Request, type Response } from "express";
import { z } from "zod";
import { getItem } from "../../helpers/database";
import { generateToken } from "../../helpers/jwt";
import { getPasswordValidation, username } from "../../validations";

const bodySchema = z.object({
  username,
  password: getPasswordValidation(),
});

const login = async (req: Request, res: Response) => {
  const dataValidation = bodySchema.safeParse(req.body);

  if (!dataValidation.success) {
    return res.status(400).json({
      message: dataValidation.error.issues
        .map((issue) => issue.message)
        .join(", "),
    });
  }

  const { username, password: confirmationPassword } = dataValidation.data;

  try {
    const user = await getItem("user", { key: "username", value: username });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }

    const { password, ...userDataWithoutPassword } = user;

    const passwordIsValid = bcrypt.compareSync(confirmationPassword, password);

    if (!passwordIsValid) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }

    const token = generateToken(user.id.toString());

    return res.json({
      token,
      user: userDataWithoutPassword,
      message: "Successfully logged in!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to login",
    });
  }
};

export default login;
