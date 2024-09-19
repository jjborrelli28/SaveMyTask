import { type Response } from "express";
import { type RequestProps } from "../../middleware/authentication";

const logout = (req: RequestProps, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    });

    return res.status(200).json({ message: "Successfully logged out!" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to logout",
    });
  }
};

export default logout;
