import { type Response } from "express";
import { deleteItem, getItem } from "../../helpers/database";
import { type RequestProps } from "../../middleware/authentication";

const deleteUser = async (req: RequestProps, res: Response) => {
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

    await deleteItem("user", userId);

    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    });

    return res.status(200).json({
      message: "User successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete User",
    });
  }
};

export default deleteUser;
