import { type Response } from "express";
import { getItem } from "../../helpers/database";
import { type RequestProps } from "../../middleware/authentication";

const getUser = async (req: RequestProps, res: Response) => {
  const { userId } = req;

  if (typeof userId === "undefined") {
    return res.status(400).json({
      message: "User ID is required",
    });
  }

  try {
    const user = await getItem("user", { key: "id", value: userId });

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
