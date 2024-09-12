import { type Request, type Response } from "express";
import { getItem } from "../../helpers/database";
import { idParamSchema } from "../../validations";

const getUser = async (req: Request, res: Response) => {
  const idValidation = idParamSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      message: idValidation.error.issues
        .map((issue) => issue.message)
        .join(", "),
    });
  }

  const { id } = idValidation.data;

  try {
    const user = await getItem("user", { key: "id", value: id });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { password, ...userDataWithoutPassword } = user;

    return res.json({
      user: userDataWithoutPassword,
      message: "User successfully obtained!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to obtain User",
    });
  }
};

export default getUser;
