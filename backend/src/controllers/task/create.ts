import { type Response } from "express";
import { z } from "zod";
import {
  getItem,
  getTotalFilteredItemsByUser,
  insertItem,
} from "../../helpers/database";
import { type RequestProps } from "../../middleware/authentication";
import { title } from "../../validations";

const bodySchema = z.object({
  title,
});

const createTask = async (req: RequestProps, res: Response) => {
  const dataValidation = bodySchema.safeParse(req.body);

  if (!dataValidation.success) {
    return res.status(400).json({
      message: dataValidation.error.issues
        .map((issue) => issue.message)
        .join(", "),
    });
  }

  const { title } = dataValidation.data;
  const userId = req.userId!;

  const totalItems = await getTotalFilteredItemsByUser("task", userId, {
    value: "",
  });

  const existingTask = totalItems.some((item) => item.title === title);

  if (existingTask) {
    return res.status(409).json({ message: "Task already exists" });
  }

  try {
    const result = await insertItem("task", {
      title,
      state: "To do",
      user_id: userId,
    });

    const item = await getItem("task", {
      key: "id",
      value: Number(result.insertId),
    });

    return res.status(201).json({
      item,
      message: "Task successfully created!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create Task",
    });
  }
};

export default createTask;
