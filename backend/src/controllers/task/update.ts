import { type Response } from "express";
import { z } from "zod";
import { getItem, updateItem } from "../../helpers/database";
import { type RequestProps } from "../../middleware/authentication";
import { idParamSchema, title } from "../../validations";

const bodySchema = z
  .object({
    title: title.optional(),
    state: z.enum(["To do", "In progress", "Done"]).optional(),
  })
  .refine((data) => data.title || data.state, {
    message: "At least one of 'Title' or 'State' is required",
    path: ["title", "state"],
  });

const updateTask = async (req: RequestProps, res: Response) => {
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
  const { data } = dataValidation;

  try {
    const result = await updateItem("task", id, {
      ...data,
      updated_at: new Date(),
    });

    if (result[0].numUpdatedRows === BigInt(0)) {
      return res.status(404).json({ error: "Task not found" });
    }

    const item = await getItem("task", { key: "id", value: id });

    return res.json({
      item,
      message: "Task successfully updated!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update task",
    });
  }
};

export default updateTask;
